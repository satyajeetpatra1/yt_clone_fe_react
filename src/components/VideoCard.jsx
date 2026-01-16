import { Link } from "react-router-dom";

function VideoCard({ video }) {
  const fallbackThumbnail = "https://placehold.co/1280x720?text=No+Thumbnail";

  const fallbackAvatar = "https://placehold.co/100x100?text=User";

  const formatViews = (views = 0) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M views";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K views";
    return views + " views";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  return (
    <Link
      to={`/watch/${video._id}`}
      className="group flex flex-col w-full cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden">
        <img
          src={video.thumbnailUrl || fallbackThumbnail}
          onError={(e) => (e.target.src = fallbackThumbnail)}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Info */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar */}
        <img
          src={video.channel?.avatar || fallbackAvatar}
          onError={(e) => (e.target.src = fallbackAvatar)}
          alt="channel"
          loading="lazy"
          className="w-9 h-9 rounded-full object-cover"
        />

        {/* Text */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {video.channel?.channelName}
          </p>

          <p className="text-xs text-gray-500">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
