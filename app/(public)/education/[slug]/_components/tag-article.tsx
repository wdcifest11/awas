// components/ArticleTags.tsx
import React from "react";
import Badge from "@/components/ui/badge";

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => (
  <div className="flex items-center gap-2 mt-4">
    <p className="text-gray-600 font-medium">Tags:</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          text={tag}
          className="bg-blue-500 text-white px-2 py-1 rounded-full"
        />
      ))}
    </div>
  </div>
);

export default ArticleTags;
