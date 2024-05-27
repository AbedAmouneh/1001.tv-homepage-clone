"use client";
import React, { useState, useEffect, useRef } from "react";
import { useVideos } from "@/hooks/useVideos";
import Image from "next/image";

const MainBanner: React.FC = () => {
  const { data: videos, isLoading, error } = useVideos("Web Main slider");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const touchThreshold = 50;

  useEffect(() => {
    if (videos && videos.length > 0) {
      setCurrentIndex(0);
    }
  }, [videos]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current - touchEndXRef.current > touchThreshold) {
      setCurrentIndex((prevIndex) =>
        prevIndex === videos!.length - 1 ? 0 : prevIndex + 1
      );
    }

    if (touchEndXRef.current - touchStartXRef.current > touchThreshold) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? videos!.length - 1 : prevIndex - 1
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div
        className="relative h-[100vh] bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${videos![currentIndex]?.bannerImage})`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-end p-20 bg-gradient-to-t from-black to-transparent">
          <div className="text-right text-white">
            <h1 className="text-6xl font-bold mb-4">
              {videos![currentIndex]?.name}
            </h1>
            <div className="flex items-center justify-end mb-4 text-lg">
              <p>{videos![currentIndex]?.genres.join(" | ")}</p>
              <span className="ml-2 text-green-500">|</span>
              <p className="ml-2">{videos![currentIndex]?.year}</p>
            </div>
            <p className="mb-8 max-w-lg text-lg">
              {videos![currentIndex]?.description}
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Watch Now
            </button>
          </div>
        </div>

        <div
          className="absolute left-0 bottom-0 flex items-center p-4 space-x-4 z-10
          bg-gradient-to-t from-white/20 via-white/15 to-white/20 border border-white/20 my-4 mx-4 border-t-0 
          rounded-[10px] ml-[105px] mb-[40px]
        "
        >
          {videos &&
            videos.slice(0, 6).map((video, index) => (
              <Image
                key={index}
                src={video.portraitImage}
                alt={video.name}
                width={100}
                height={150}
                className={`cursor-pointer hover:opacity-75 rounded-lg ${
                  currentIndex === index
                    ? "opacity-100 w-[105px]"
                    : "opacity-50"
                }
                  `}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
