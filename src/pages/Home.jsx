import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import toast from "react-hot-toast";
import { setVideos } from "../redux/slices/videoSlice";
import VideoCard from "../components/VideoCard";

function Home() {
  const dispatch = useDispatch();
  const { videos } = useSelector((store) => store.video);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        dispatch(setVideos(res.data));
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load videos");
      }
    };

    fetchVideos();
  }, [dispatch]);

  return (
    <div className="p-4 pt-6 w-full min-h-[calc(100vh-56px)] bg-gray-100 dark:bg-zinc-900">
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
