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
    console.log("Touch Start:", touchStartXRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
    console.log("Touch Move:", touchEndXRef.current);
  };

  const handleTouchEnd = () => {
    console.log(
      "Touch End - Start:",
      touchStartXRef.current,
      "End:",
      touchEndXRef.current
    );
    if (touchStartXRef.current - touchEndXRef.current > touchThreshold) {
      // Swipe left
      setCurrentIndex((prevIndex) =>
        prevIndex === videos!.length - 1 ? 0 : prevIndex + 1
      );
    }

    if (touchEndXRef.current - touchStartXRef.current > touchThreshold) {
      // Swipe right
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
        style={{ backgroundImage: `url(${videos![currentIndex].bannerImage})` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-end p-20">
          <div className="text-right text-white">
            <h1 className="text-6xl font-bold mb-4">
              {videos![currentIndex].name}
            </h1>
            <div className="flex items-center justify-end">
              <p
                className="text-lg"
                style={{
                  direction: "ltr",
                }}
              >
                {videos![currentIndex].genres.join(" | ")}
              </p>{" "}
              <span className="ml-2 text-green-500"> | </span>{" "}
              <p> {videos![currentIndex].year} </p>
            </div>

            <p className="mb-8 max-w-lg text-lg">
              {videos![currentIndex].description}
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Watch Now
            </button>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 flex items-center p-4 space-x-4 z-10">
          {videos &&
            videos
              .slice(0, 6)
              .map((video, index) => (
                <Image
                  key={video.name}
                  src={video.portraitImage}
                  alt={video.name}
                  width={100}
                  height={150}
                  className={`cursor-pointer hover:opacity-75 ${
                    currentIndex === index ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
