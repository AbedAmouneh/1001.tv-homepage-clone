"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "./Header";
import { useVideos } from "@/hooks/useVideos";
import SearchItems from "./SearchItems";

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: titleWithVideos, isLoading, error } = useVideos();
  const [updatedVideosArray, setUpdatedVideosArray] = useState<any[]>([]);

  if (error) return <div>Error: {error.message}</div>;

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (titleWithVideos) {
      const allVideos = titleWithVideos.reduce((acc: any[], item: any) => {
        return acc.concat(item.videos);
      }, []);
      const updatedArray = allVideos.slice(0, 10);
      setUpdatedVideosArray(updatedArray);
    }
  }, [titleWithVideos]);

  return (
    <>
      <FaSearch
        className="text-white text-2xl cursor-pointer"
        onClick={toggleSearch}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-slate-900 z-40 m-0">
          <Header />
          <div className="relative w-full max-w-6xl mx-auto mt-16 p-4 flex items-center justify-center">
            <div className="flex items-center w-full">
              <div
                className="text-green-600 text-2xl cursor-pointer mr-4"
                onClick={toggleSearch}
              >
                <h2>الرجوع</h2>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full p-4 text-2xl rounded-xl outline-none bg-gray-800 text-white pr-12"
                  placeholder="...ابحث"
                  style={{ textAlign: "right" }}
                />
                <FaSearch className="text-white text-2xl cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          <div className="container">
            <SearchItems videos={updatedVideosArray} />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
