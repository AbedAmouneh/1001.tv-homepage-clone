"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

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

interface VideoContextProps {
  videos: Video[];
  fetchVideos: () => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("https://mangopulse.net/1001-data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setVideos(data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videos, fetchVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideos must be used within a VideoProvider");
  }
  return context;
};
