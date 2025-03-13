// components/ArticleShare.tsx
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ArticleShare = ({ url }: { url: string }) => {
  const shareOptions = [
    {
      icon: <FaFacebook className="text-blue-600" size={20} />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      icon: <FaTwitter className="text-blue-400" size={20} />,
      link: `https://twitter.com/intent/tweet?url=${url}`,
    },
    {
      icon: <FaWhatsapp className="text-green-500" size={20} />,
      link: `https://wa.me/?text=${url}`,
    },
  ];

  return (
    <div className="flex gap-2 items-center mb-8">
      <p className="flex items-center gap-2 text-gray-600">
        <FiShare2 size={20} /> Bagikan:
      </p>
      {shareOptions.map((option, index) => (
        <a
          key={index}
          href={option.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded-full hover:scale-110 transition-transform"
        >
          {option.icon}
        </a>
      ))}
    </div>
  );
};

export default ArticleShare;
