import { Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

// Component to display a video card in a channel
function ChannelVideoCard({ video, isOwner, onDelete }) {
  // Fallback thumbnail if video thumbnail fails to load
  const fallbackThumbnail = "https://placehold.co/1280x720?text=No+Thumbnail";

  // Handler to delete the video
  const handleDelete = async () => {
    try {
      // Make API call to delete the video
      await API.delete(`/videos/${video._id}`);

      // Notify user of successful deletion
      toast.success("Video deleted");

      // Call onDelete callback to update parent component
      onDelete(video._id);
    } catch {
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="border rounded-lg p-2">
      <Link to={`/watch/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          onError={(e) => (e.target.src = fallbackThumbnail)}
          className="rounded-lg aspect-video object-cover"
          loading="lazy"
        />
        <h3 className="mt-2 text-sm font-semibold line-clamp-2">
          {video.title}
        </h3>
      </Link>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">{video.views} views</span>

        {/* OWNER ONLY */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-xs text-red-600 hover:underline cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ChannelVideoCard;
