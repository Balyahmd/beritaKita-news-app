import React from "react";

type Comment = {
  id: number;
  user: {
    name: string;
    avatar: string;
    title?: string;
  };
  content: string;
  date: string;
  replies?: Comment[];
};

type RenderCommentsProps = {
  commentsList: Comment[];
  replyTo: number | null;
  commentText: string;
  handleReply: (id: number) => void;
  handleSend: () => void;
  setCommentText: (text: string) => void;
};

const RenderComments: React.FC<RenderCommentsProps> = ({
  commentsList,
  replyTo,
  commentText,
  handleReply,
  handleSend,
  setCommentText,
}) => {
  return (
    <>
      {commentsList.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3 my-6 ml-0">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-inter font-medium text-xs text-[#526071]">
                {comment.user.name}
              </span>
              {comment.user.title && (
                <span className="text-xs text-gray-400">
                  {comment.user.title}
                </span>
              )}
              <span className="text-gray-300">•</span>
              <span className="text-xs font-inter font-medium text-[#959EA9]">
                {comment.date}
              </span>
            </div>
            <div className="text-gray-700 mt-1 mb-2">{comment.content}</div>
            <button
              className="text-blue-600 text-xs font-medium hover:underline"
              onClick={() => handleReply(comment.id)}>
              Balas
            </button>

            {replyTo === comment.id && (
              <div className="mt-3">
                <textarea
                  className="w-full border border-gray-200 rounded-lg p-4 min-h-[50px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Tulis balasan anda..."
                  maxLength={500}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="bg-primary text-white px-4 py-1 rounded font-medium hover:to-blue-600 transition"
                    onClick={handleSend}>
                    Kirim
                  </button>
                  <span className="text-xs text-gray-400">
                    {commentText.length}/500
                  </span>
                </div>
              </div>
            )}
            {/* Render replies jika ada */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-8 mt-4 border-gray-100 pl-4">
                <RenderComments
                  commentsList={comment.replies}
                  replyTo={replyTo}
                  commentText={commentText}
                  handleReply={handleReply}
                  handleSend={handleSend}
                  setCommentText={setCommentText}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default RenderComments;
