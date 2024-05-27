"use client";

import React from "react";
import { useVideos } from "@/hooks/useVideos";
import StandardCarousel from "@/components/StandardCarousel";

const ParentComponent: React.FC = () => {
  const { data: titleWithVideos, isLoading, error } = useVideos();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container w-full">
      {titleWithVideos &&
        titleWithVideos.map((item, index) => (
          <div key={index}>
            <StandardCarousel title={item.title} videos={item.videos} />
          </div>
        ))}
    </div>
  );
};

export default ParentComponent;
