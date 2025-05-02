import { Comment } from "../models/comment.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import { validateID } from "../utils/validateMongodbID.js";

// add comment
export const addComment = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, comment } = req.body;

  const findUser = await User.findById(_id);
  if (!findUser) {
    throw new Error("User not found");
  }

  const findProduct = await Product.findById(productId);
  if (!findProduct) {
    throw new Error("Product not found");
  }

  const newComment = await Comment.create({
    user: findUser._id,
    comment,
    product: productId,
  });

  findProduct.comments.push(newComment._id);
  await findProduct.save();

  res
    .status(200)
    .json(new ApiResponse(200, newComment, "Comment added successfully"));
});

//get all coments
export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "firstName lastName email avatar")
    .populate("product", "name image")
    .sort("-createdAt");
  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

//get comments
export const getComments = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const findProduct = await Product.findById(productId).populate({
    path: "comments",
    options: {
      sort: { createdAt: -1 },
    },
  });
  if (!findProduct) {
    throw new Error("Product not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        findProduct.comments,
        "Comments fetched successfully"
      )
    );
});

// delete comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { commentId } = req.params;
  validateID(commentId);

  const findUser = await User.findById(_id);
  if (!findUser) {
    throw new Error("User not found");
  }

  const findComment = await Comment.findById(commentId);
  if (!findComment) {
    throw new Error("Comment not found");
  }

  if (
    findComment.user.toString() === findUser._id.toString() ||
    findUser.role === "admin"
  ) {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    const product = await Product.findById(findComment.product);
    if (product) {
      product.comments = product.comments.filter(
        (id) => id.toString() !== commentId
      );
      await product.save();
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedComment, "Comment deleted successfully")
      );
  } else {
    throw new Error("You are not authorized to delete this comment");
  }
});

//edit comment
export const editComment = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { commentId } = req.params;
  const { comment } = req.body;
  validateID(commentId);

  const findUser = await User.findById(_id);
  if (!findUser) {
    throw new Error("User not found");
  }

  const findComment = await Comment.findById(commentId);
  if (!findComment) {
    throw new Error("Comment not found");
  }

  if (findComment.user.toString() !== findUser._id.toString()) {
    throw new Error("You are not authorized to edit this comment");
  }

  findComment.comment = comment;
  await findComment.save();

  res
    .status(200)
    .json(new ApiResponse(200, findComment, "Comment edited successfully"));
});

//get comment by id
export const getCommentById = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const findComment = await Comment.findById(commentId);
  if (!findComment) {
    throw new Error("Comment not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, findComment, "Comment fetched successfully"));
});

//reply
export const replyComment = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user; // Extract user ID
  const { commentId, reply } = req.body;

  // Find the user making the reply
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Authorization check
  if (user.role !== "admin") {
    throw new Error("You are not authorized to reply to this comment");
  }

  // Find the comment to reply to
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  // Add a structured reply
  const replyData = {
    user: userId,
    message: reply,
    createdAt: new Date(),
  };
  comment.reply.push(replyData);

  // Save the updated comment
  await comment.save();

  res.status(200).json({
    status: 200,
    data: comment,
    message: "Reply added successfully",
  });
});
