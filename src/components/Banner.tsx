import React, { useState, useEffect } from "react";
import bannerImg from "../assets/banner.png";

// Semua slide menggunakan gambar yang sama
const slides = [{ img: bannerImg }, { img: bannerImg }, { img: bannerImg }];

const Banner: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [current]);

  const slide = slides[current] ?? slides[0];

  return (
    <div className="relative mt-10 md:px-[72px]  flex flex-col items-center">
      <img
        src={slide?.img ?? bannerImg}
        alt="Banner"
        className="w-full rounded-lg object-cover"
      />
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 border-2 ${
              index === current
                ? "bg-primary border-primary"
                : "bg-gray border-gray"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
