import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import toast from "react-hot-toast";
import { setVideos } from "../redux/slices/videoSlice";
import VideoCard from "../components/VideoCard";
import { categories } from "../constants/categories";

function Home() {
  // Redux dispatch and state
  const dispatch = useDispatch();
  const { videos } = useSelector((store) => store.video);

  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch videos on component mount and when activeCategory changes
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get(
          activeCategory === "All"
            ? "/videos"
            : `/videos?category=${activeCategory}`
        );
        dispatch(setVideos(res.data));
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load videos");
      }
    };

    fetchVideos();
  }, [dispatch, activeCategory]);

  return (
    <div className="p-4 pt-6 w-full min-h-[calc(100vh-56px)] bg-gray-100 dark:bg-zinc-900 overflow-hidden">
      {/* Category Bar */}
      <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition
              ${
                activeCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div
        className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4 w-full
      "
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
