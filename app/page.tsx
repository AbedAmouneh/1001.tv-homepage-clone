import React from "react";
import Header from "@/components/Header";
import MainBanner from "@/components/MainBanner";
import ContentSection from "@/components/ContentSection";

const Home: React.FC = () => {
  const mostWatchedItems = [
    { title: "Show 1", imageUrl: "/path/to/image1.jpg" },
    { title: "Show 2", imageUrl: "/path/to/image2.jpg" },
    // Add more items...
  ];

  const originalsItems = [
    { title: "Original 1", imageUrl: "/path/to/image1.jpg" },
    { title: "Original 2", imageUrl: "/path/to/image2.jpg" },
  ];

  return (
    <div>
      <Header />
      <MainBanner />
      <main className="p-4">
        <ContentSection title="Most Watched" items={mostWatchedItems} />
        <ContentSection title="1001 Originals" items={originalsItems} />
      </main>
    </div>
  );
};

export default Home;
