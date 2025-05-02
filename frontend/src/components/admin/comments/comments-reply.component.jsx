import { useDispatch, useSelector } from "react-redux";
import { selectComments } from "../../../redux/features/comments/comment.slice";
import { useEffect, useState } from "react";
import {
  getCommentById,
  replyComment,
} from "../../../redux/features/comments/comments.service";
import { useParams } from "react-router-dom";

import { Button, Input, Spin } from "antd";
import { FaComment, FaReply } from "react-icons/fa";
import { notify } from "../../../helpers";

export const CommentsReply = () => {
  const { id } = useParams();
  const { comment, isLoading } = useSelector(selectComments);
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    dispatch(getCommentById(id));
  }, [dispatch, id]);

  const handleReply = async () => {
    try {
      setIsReplying(true);
      await dispatch(replyComment({ commentId: id, reply }));
      notify("Reply added successfully");
      setReply("");
      dispatch(getCommentById(id));
    } catch (error) {
      console.log(error);
      notify("Failed to add reply", "error");
    } finally {
      setIsReplying(false); // Re-enable the button
    }
  };

  if (isLoading) return <Spin />;

  return (
    <>
      <div className="space-y-3 mb-4">
        <h3 className="font-semibold text-xl">Comment :</h3>

        <div className="bg-red-50 p-4 flex gap-3 items-center ">
          <FaComment />
          <p> {comment?.comment}</p>
        </div>
      </div>

      {comment?.reply?.map((reply) => (
        <div
          key={reply._id}
          className="flex gap-3 items-center bg-green-50 p-4 mb-4"
        >
          <FaReply />
          <p>{reply.message}</p>
        </div>
      ))}

      <div className="space-y-2">
        <Input.TextArea
          rows={4}
          placeholder="Enter your reply"
          className="!resize-none rounded-none"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          disabled={isReplying}
        />
        <Button type="primary" className="w-40 p-5" onClick={handleReply}>
          Reply
        </Button>
      </div>
    </>
  );
};
