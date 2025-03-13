"use client";

import React, {useState} from "react";
import {Send} from "lucide-react";
import {Button} from "@/components/ui/button";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

// Mock data komentar
const mockComments: Comment[] = [
  {
    id: 1,
    name: "Budi",
    text: "Artikel yang sangat informatif!",
    date: "2025-03-08",
  },
  {
    id: 2,
    name: "Siti",
    text: "Terima kasih atas tipsnya.",
    date: "2025-03-07",
  },
];

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        name: "Pengguna Anonim",
        text: commentText,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className='mt-12'>
      <h3 className='text-lg lg:text-2xl font-semibold mb-6'>Komentar</h3>

      {/* Daftar komentar */}
      <div className='space-y-6'>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className='p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm'
          >
            <p className='text-sm text-gray-500'>{comment.date}</p>
            <p className='font-semibold'>{comment.name}</p>
            <p className='mt-1'>{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Input komentar */}
      <div className='flex flex-col md:flex-row w-full mt-6 gap-3'>
        <input
          type='text'
          className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500'
          placeholder='Tambahkan komentar...'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={addComment}
          className='p-3 flex items-center gap-2 justify-center md:block text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:bg-teal-600'
        >
          <p className='md:hidden'>Kirim</p>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Comments;
