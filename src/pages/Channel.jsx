import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../services/api";
import toast from "react-hot-toast";
import VideoCard from "../components/VideoCard";
import { FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import EditChannelModal from "../components/EditChannelModal";
import UploadVideoModal from "../components/UploadVideoModal";

// Channel page displaying channel info and videos
function Channel({ channelId: propChannelId }) {
  // Fallback banner URL
  const fallbackBanner = "https://placehold.co/1200x300?text=Channel+Banner";

  // Get channelId from props or URL params
  const params = useParams();
  const channelId = propChannelId || params.channelId;

  // Get current user from Redux store
  const user = useSelector((store) => store.auth.user);

  // Component state
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const isOwner = user && channel?.owner?._id === user._id;

  // Fetch channel data and videos
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await API.get(`/channels/${channelId}`);
        setChannel(res.data.channel);
        setVideos(res.data.videos);
      } catch {
        toast.error("Failed to load channel");
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channelId]);

  // Handler to delete a video
  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      // API call to delete the video
      await API.delete(`/videos/${id}`);

      // Update videos state to remove deleted video
      setVideos((prev) => prev.filter((v) => v._id !== id));
      // Show success message
      toast.success("Video deleted");
    } catch {
      toast.error("Failed to delete video");
    }
  };

  if (loading) return null;

  return (
    <div className="pb-10 w-full">
      {/* Banner */}
      <div className="w-full h-40 sm:h-52 md:h-64 bg-gray-200 dark:bg-zinc-800 overflow-hidden mx-auto">
        <img
          src={channel?.banner}
          onError={(e) => (e.target.src = fallbackBanner)}
          className="w-full h-full object-cover"
          loading="lazy"
          alt="Channel banner"
        />
      </div>

      {/* Channel Info */}
      <div className="bg-gray-100 dark:bg-zinc-900 p-6 flex flex-col sm:flex-row gap-6 items-center">
        <img
          src={channel.avatar || "/fallback-avatar.png"}
          alt="channel"
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{channel.channelName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {channel.description || "No description"}
          </p>
        </div>

        {/* Edit and Upload Buttons if owner */}
        {isOwner && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowEdit(true)}
              className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded flex items-center gap-2 cursor-pointer"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2 cursor-pointer"
            >
              <FaUpload /> Upload
            </button>
          </div>
        )}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
        {videos.map((video) => (
          <div key={video._id} className="relative">
            <VideoCard video={video} />

            {isOwner && (
              <button
                onClick={() => handleDeleteVideo(video._id)}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded cursor-pointer"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>

      {!videos.length && (
        <p className="text-center text-gray-500 mt-10">No videos uploaded</p>
      )}

      {/* Edit and Upload Modals */}
      {showEdit && (
        <EditChannelModal
          channel={channel}
          onClose={() => setShowEdit(false)}
          onUpdated={(updated) => setChannel(updated)}
        />
      )}

      {showUpload && (
        <UploadVideoModal
          channelId={channel._id}
          onClose={() => setShowUpload(false)}
          onUploaded={(video) => setVideos((prev) => [video, ...prev])}
        />
      )}
    </div>
  );
}

export default Channel;
