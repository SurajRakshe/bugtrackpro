import React, { useState } from "react";
import CommentForm from "./CommentForm";

const Comment = ({ comment, replies, onReply, onEdit, onDelete, currentUser }) => {
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="ml-4 my-3 border-l-2 border-gray-200 pl-4">
      <div className="bg-white p-3 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{comment.authorName}</span>
          <span className="text-xs text-gray-400">
            {new Date(comment.timestamp).toLocaleString()}
          </span>
        </div>

        {/* Content or Edit Mode */}
        {!isEditing ? (
          <p className="mt-1 text-gray-800">{comment.content}</p>
        ) : (
          <CommentForm
            initialValue={comment.content}
            onSubmit={(newContent) => {
              onEdit(comment.id, newContent);
              setIsEditing(false);
            }}
          />
        )}

        {/* Action Buttons */}
        <div className="text-sm mt-2 flex gap-3 text-blue-500">
          <button onClick={() => setShowReply(!showReply)}>
            {showReply ? "Cancel" : "Reply"}
          </button>

          {currentUser === comment.authorName && (
            <>
              <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReply && (
        <CommentForm
          parentId={comment.id}
          onSubmit={(content, parentId) => {
            onReply(content, parentId);
            setShowReply(false);
          }}
        />
      )}

      {/* Nested Replies */}
      <div className="mt-2">
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            replies={[]}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
