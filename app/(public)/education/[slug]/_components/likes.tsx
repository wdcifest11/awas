// components/ArticleLikes.tsx
"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";

const ArticleLikes = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <button
      onClick={toggleLike}
      className={clsx(
        "absolute top-8 right-8 flex items-center gap-2 text-gray-600 hover:text-red-500 z-10",
        "transition-colors"
      )}
    >
      <Heart
        className={clsx("transition-transform", {
          "fill-red-500 text-red-500 scale-110": liked,
        })}
        size={24}
      />
      <span className="text-lg font-medium">{likeCount}</span>
    </button>
  );
};

export default ArticleLikes;
