import React from "react";
import dateIcon from "../../assets/date-icon.png";
import { Link } from "react-router-dom";

type CardHeadlineProps = {
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
  category?: string;
};

const CardHeadline: React.FC<CardHeadlineProps> = ({
  title,
  description,
  image,
  date,
  link,
  category,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-start bg-white w-full overflow-hidden">
      <div className="flex flex-col max-w-xl justify-center md:pr-4">
        <div className="text-xs text-gray-400 mb-2">Headline</div>
        <h2 className="text-2xl font-semibold text-gray-900 leading-tight mb-2">
          {title}
        </h2>
        <p className="font-inte font-regular text-sm text-[#4F4F4F] mb-5 line-clamp-4 leading-6">
          {description}
        </p>
        <div className="items-center gap-4">
          <div className="flex gap-2 mb-3">
            <img src={dateIcon} alt="date icon" />
            <span className="flex items-center text-xs text-gray-500">
              {date}
            </span>
          </div>
          <Link
            to={`/${category}/detail/${link.split("/").pop()}`}
            className="text-blue-600 text-sm font-medium hover:underline flex items-center group"
            rel="noopener noreferrer">
            Baca Selengkapnya
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      {/* Right: Image */}
      <div className="w-full flex-shrink-0 flex items-center justify-center py-6 md:py-0">
        <img
          src={image}
          alt={title}
          className="w-[811px] h-[456px] object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default CardHeadline;
