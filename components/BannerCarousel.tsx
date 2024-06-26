"use client";
import React, { useState, useEffect, useRef } from "react";
import { useVideos } from "@/hooks/useVideos";
import Image from "next/image";

const BannerCarousel: React.FC = () => {
  const {
    data: videos,
    isLoading,
    error,
  } = useVideos("أعمال 1001 الأصلية - متوفرة الآن");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [controlsVisible, setControlsVisible] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (videos && videos.length > 0) {
      setCurrentIndex(0);
    }
  }, [videos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setTranslateX(deltaX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const width = containerRef.current?.clientWidth || 0;
    if (translateX > width / 4) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? videos!.length - 1 : prevIndex - 1
      );
    } else if (translateX < -width / 4) {
      setCurrentIndex((prevIndex) =>
        prevIndex === videos!.length - 1 ? 0 : prevIndex + 1
      );
    }
    setTranslateX(0);
  };

  const handlePaginationClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className="relative 
      bg-gradient-to-b
      from-black via-gray-800 to-gray-900 p-8 pt-15"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <div
        className="relative flex items-center overflow-hidden space-x-5 w-[80vw] transition-transform duration-300"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {videos &&
          videos.map((video, index) => (
            <div
              key={index}
              className={`flex-shrink-0 transition-transform duration-300 ${
                currentIndex === index ? "scale-105" : "scale-100"
              } relative`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onDragStart={(e) => e.preventDefault()}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={
                  hoveredIndex === index
                    ? video.bannerImage
                    : video.portraitImage
                }
                alt={video.name}
                width={hoveredIndex === index ? 400 : 150}
                height={250}
                className="rounded-lg cursor-pointer object-cover min-h-[250px] max-h-[250px] transition-all duration-300"
              />
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white p-4 rounded-lg transition-opacity duration-300">
                  <h3 className="text-lg font-bold mb-2">{video.name}</h3>
                  <p className="mb-4">{video.genres.join(" | ")}</p>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Play
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white text-right">
        <h2 className="text-2xl font-bold mb-4">أعمال 1001 الأصلية</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          تصفح الكل
        </button>
      </div>
      <div className="absolute top-2 left-1/6 flex space-x-2">
        {videos &&
          videos.map((_, index) => (
            <div
              key={index}
              onClick={() => handlePaginationClick(index)}
              className={`w-4 h-2 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-green-500" : "bg-gray-500"
              }`}
              style={{ opacity: controlsVisible ? 1 : 0 }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
