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

interface SearchItemsProps {
  videos: Video[];
}

const SearchItems: React.FC<SearchItemsProps> = ({ videos }) => {
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
      className="relative bg-gray-900 p-8 pt-15 "
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <h1 className="text-4xl font-bold mb-4 flex justify-center ">
        أفلام حصرية
      </h1>

      <div className=" w-fit">
        <div
          className="relative grid grid-cols-5 grid-rows-2 gap-5 w-full transition-transform duration-300 ml-4"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {videos &&
            videos.slice(0, 10).map((video, index) => (
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
      </div>
    </div>
  );
};

export default SearchItems;
