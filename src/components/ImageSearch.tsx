import { UnsplashImage } from "@/utils/customTypes";
import { useState } from "react";

interface ImageSearchProps {
  onSelectImage: (imageUrl: string) => void;
  images: UnsplashImage[] | [];
  setImages: React.Dispatch<React.SetStateAction<UnsplashImage[] | []>>;
  imageConfirm: string;
}
const ImageSearch: React.FC<ImageSearchProps> = ({
  onSelectImage,
  images,
  setImages,
  imageConfirm,
}) => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const imageAPI = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
  const imageHost = process.env.NEXT_PUBLIC_IMAGE_HOST;

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${imageHost}search/photos?query=${query}&per_page=10&client_id=${imageAPI}`
      );
      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      {imageConfirm.length ? (
        <p className="text-green-500 font-bold">{imageConfirm}</p>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-4">Choose an image</h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for images"
              className="border-2 border-pink-200 p-2 w-full"
            />
            <button
              className="mt-4 border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
              onClick={handleSearch}
              disabled={!query.trim()}
            >
              Search
            </button>
        </>
      )}

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description || "Unsplash description"}
            onClick={() => onSelectImage(image.urls.full)}
            className="cursor-pointer w-full h-auto transition-all border-2 border-white duration-500 hover:border-2 hover:border-pink-500"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
