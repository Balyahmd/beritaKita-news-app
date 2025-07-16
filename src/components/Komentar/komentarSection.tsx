import React, { useState } from "react";
import RenderComments from "./renderComments";
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

const initialComments: Comment[] = [
  {
    id: 1,
    user: {
      name: "LUANG YUSMEDI S.P., M.Agt.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "",
    },
    content:
      "Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh ? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya ?",
    date: "28 Mar 2024 11:15",
    replies: [
      {
        id: 2,
        user: {
          name: "DINA RIKA RIYAWANTI, S.Pd",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          title: "",
        },
        content: "saya mengunduh sertifikatnya kok juga belumbisa",
        date: "28 Mar 2024 11:15",
      },
    ],
  },
];

const KomentarSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);

  // Handler untuk mengirim komentar baru atau balasan
  const handleSend = () => {
    if (!commentText.trim()) return;

    if (replyTo === null) {
      // Komentar utama
      const newComment: Comment = {
        id: Date.now(),
        user: {
          name: "Anda",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        content: commentText,
        date: new Date().toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        replies: [],
      };
      setComments([newComment, ...comments]);
    } else {
      // Balasan
      const addReply = (commentsList: Comment[]): Comment[] =>
        commentsList.map((comment) => {
          if (comment.id === replyTo) {
            const reply: Comment = {
              id: Date.now(),
              user: {
                name: "Anda",
                avatar: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              content: commentText,
              date: new Date().toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            return {
              ...comment,
              replies: comment.replies ? [...comment.replies, reply] : [reply],
            };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: addReply(comment.replies),
            };
          }
          return comment;
        });

      setComments(addReply(comments));
    }

    setCommentText("");
    setReplyTo(null);
  };

  // Handler untuk membalas komentar tertentu
  const handleReply = (id: number) => {
    setReplyTo(id);
    setCommentText("");
  };

  return (
    <div className="bg-white py-10 my-12">
      <div className="flex items-center mb-8">
        <div className="border-l-4 border-blue-600 h-5 mr-2" />
        <h2 className="text-lg font-semibold">Komentar</h2>
      </div>
      {/* Form komentar utama */}
      <div className="flex items-start gap-3 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 mb-8">
          {/* Jika sedang membalas, sembunyikan form utama */}
          {replyTo === null && (
            <>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Apa yang ingin anda tanyakan?"
                maxLength={500}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2">
                <button
                  className="bg-primary text-white px-5 py-2 rounded font-medium hover:bg-blue-600 transition"
                  onClick={handleSend}>
                  Kirim
                </button>
                <span className="text-xs text-gray-300">
                  {commentText.length}/500
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="border-b border-gray-200 my-4" />
      <div>
        {comments.length === 0 ? (
          <div className="text-gray-400 text-center py-6">
            Belum ada komentar.
          </div>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment.id}>
                <RenderComments
                  commentsList={[comment]}
                  replyTo={replyTo}
                  commentText={commentText}
                  handleReply={handleReply}
                  handleSend={handleSend}
                  setCommentText={setCommentText}
                />
                <hr className="border-b border-gray-200 my-4" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KomentarSection;
