"use client";
import React, { useState, useEffect } from "react";
import { useVideos } from "../hooks/useVideos";
import Image from "next/image";

const MainBanner: React.FC = () => {
  const { data: videos, isLoading, error } = useVideos("Web Main slider");
  const [currentBanner, setCurrentBanner] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (videos && videos.length > 0) {
      setCurrentBanner(videos[0].bannerImage);
    }
  }, [videos]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleShowClick = (bannerImage: string) => {
    setCurrentBanner(bannerImage);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos!.length);
  };

  return (
    <div>
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${currentBanner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-end p-8">
          <div className="text-right text-white">
            <h1 className="text-4xl font-bold mb-4">
              {videos![currentIndex].name}
            </h1>
            <p className="mb-8">{videos![currentIndex].description}</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Watch Now
            </button>
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center mt-4 space-x-4 z-10">
          {videos &&
            videos.map((video) => (
              <Image
                key={video.name}
                src={video.portraitImage}
                alt={video.name}
                width={100}
                height={300}
                className="h-24 cursor-pointer hover:opacity-75"
                onClick={() => handleShowClick(video.bannerImage)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
