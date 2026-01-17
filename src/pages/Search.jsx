import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import VideoCard from "../components/VideoCard";
import toast from "react-hot-toast";

// Search page component
function Search() {
  // Get search query from URL params
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch search results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // API call to search videos
        const res = await API.get(`/videos/search?q=${query}`);
        setVideos(res.data);
      } catch {
        toast.error("Search failed");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return null;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Search results for "{query}"
      </h2>

      {videos.length === 0 ? (
        <p className="text-gray-500">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
