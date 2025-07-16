import React from "react";
import { Link } from "react-router-dom";

type CardRecomeProps = {
  title: string;
  thumbnail: string;
  category: string;
  pubDate: string;
  link: string;
};

const CardArticleRecome: React.FC<CardRecomeProps> = ({
  title,
  thumbnail,
  category,
  pubDate,
  link,
}) => {
  return (
    <div className="bg-whip-4 w-full max-w-xs">
      <Link
        to={`/${category}/detail/${link.split("/").pop()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block">
        <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-base font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-blue-600 font-medium">{category}</span>
          <span className="text-gray-300">•</span>
          <span>
            {new Date(pubDate).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CardArticleRecome;
