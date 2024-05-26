import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

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

interface Data {
  title: string;
  type: string;
  orientation: string;
  videos: Video[];
}

const fetchVideos = async ({
  queryKey,
}: QueryFunctionContext): Promise<Video[]> => {
  const [, title] = queryKey;
  const response = await fetch("https://mangopulse.net/1001-data.json");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: Data[] = await response.json();
  console.log("Fetched data:", data);

  const targetObject = data.find(
    (item) =>
      item.title === title &&
      item.type === "hero" &&
      item.orientation === "custom"
  );

  if (!targetObject) {
    throw new Error("No matching object found");
  }

  return targetObject.videos;
};

export const useVideos = (title: string) => {
  return useQuery<Video[], Error>({
    queryKey: ["videos", title],
    queryFn: fetchVideos,
  });
};
