import React from "react";
import Header from "@/components/Header";
import MainBanner from "@/components/MainBanner";
import BannerCarousel from "@/components/BannerCarousel";
import ParentComponent from "@/components/ParentComponent";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <MainBanner />
      <main>
        <BannerCarousel />
        <ParentComponent />
      </main>
    </div>
  );
};

export default Home;
