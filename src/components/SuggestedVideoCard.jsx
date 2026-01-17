import { Link } from "react-router-dom";

// Fallback thumbnail URL
const fallbackThumb = "https://placehold.co/320x180?text=Video";

// Format views count
const formatViews = (views = 0) => {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M views";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K views";
  return `${views} views`;
};

// Format date to "DD MMM YY"
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

// Component to display a suggested video card
function SuggestedVideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`} className="flex gap-3 mb-3 group">
      {/* Thumbnail */}
      <div className="w-40 aspect-video bg-gray-200 dark:bg-zinc-800 rounded overflow-hidden shrink-0">
        <img
          src={video.thumbnailUrl || fallbackThumb}
          onError={(e) => (e.target.src = fallbackThumb)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition"
          alt={video.title}
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>

        <p className="text-xs text-gray-500 mt-1">
          {video.channel?.channelName}
        </p>

        <p className="text-xs text-gray-500">
          {formatViews(video.views)} • {formatDate(video.createdAt)}
        </p>
      </div>
    </Link>
  );
}

export default SuggestedVideoCard;
