"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Video {
  name: string;
  landscapeImage: string;
  portraitImage: string;
  bannerImage: string;
  genres: string[];
  rating: string;
  directors: string[];
  year: string;
  duration: string;
  description: string;
  long_description: string;
  isOriginal: boolean;
}

interface StandardCarouselProps {
  title: string;
  videos: Video[];
}

const StandardCarousel: React.FC<StandardCarouselProps> = ({
  title,
  videos,
}) => {
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

  return (
    <div
      className="relative bg-gray-900 p-8 pt-15 min-w-[98.9vw] overflow-hidden"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <div className="absolute top-0 right-10 text-white text-left pr-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      </div>
      <div
        className="relative flex items-center overflow-hidden space-x-5 w-full transition-transform duration-300 mt-10 "
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
                    : video.landscapeImage
                }
                alt={video.name}
                width={hoveredIndex === index ? 350 : 250}
                height={200}
                className="rounded-lg cursor-pointer object-cover max-h-[200px] transition-all duration-300"
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
      <div className="absolute top-3 left-1/6 flex space-x-2">
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

export default StandardCarousel;
