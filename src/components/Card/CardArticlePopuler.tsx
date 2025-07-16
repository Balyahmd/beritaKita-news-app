import React from "react";
import { Link } from "react-router-dom";

type CardPopulerProps = {
  title: string;
  thumbnail: string;
  category: string;
  pubDate: string;
  link: string;
};

const CardPopuler: React.FC<CardPopulerProps> = ({
  title,
  thumbnail,
  category,
  pubDate,
  link,
}) => {
  return (
    <div>
      <Link
        to={`/${category}/detail/${link.split("/").pop()}`}
        className="flex items-start gap-3 pr-4 hover:opacity-90 transition">
        <img
          src={thumbnail}
          alt={title}
          className="w-28 h-24 rounded object-cover flex-shrink-0"
        />

        {/* Info */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span className="text-blue-600 font-medium">{category}</span>
            <span className="text-gray-400">•</span>
            <span>
              {new Date(pubDate).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardPopuler;
