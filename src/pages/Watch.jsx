import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import SuggestedVideoCard from "../components/SuggestedVideoCard";
import { closeSidebar } from "../redux/slices/uiSlice";

// Watch page component
function Watch() {
  // Fallback avatar for user
  const fallbackAvatar = "https://placehold.co/100x100?text=User";

  // Redux dispatch
  const dispatch = useDispatch();

  // Close sidebar on mount
  useEffect(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const { id } = useParams();

  // Get current user from Redux store
  const user = useSelector((store) => store.auth.user);

  // Component state
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // API call to get video details
        const res = await API.get(`/videos/${id}`);
        setVideo(res.data);
      } catch {
        toast.error("Failed to load video");
      }
    };

    fetchVideo();
  }, [id]);

  const [suggestedVideos, setSuggestedVideos] = useState([]);

  // Fetch suggested videos
  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        // API call to get all videos
        const res = await API.get("/videos");
        setSuggestedVideos(res.data.filter((v) => v._id !== id));
      } catch {
        // silent fail
      }
    };

    fetchSuggested();
  }, [id]);

  // Fetch comments for the video
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await API.get(`/comments/${id}`);
        setComments(res.data);
      } catch {
        toast.error("Failed to load comments");
      }
    };

    fetchComments();
  }, [id]);

  // LIKE / DISLIKE HANDLER

  const handleReaction = async (type) => {
    // User must be logged in
    if (!user) {
      toast.error("Login to like or dislike");
      return;
    }

    try {
      // API call to register reaction
      const res = await API.put(`/videos/${id}/${type}`);

      // backend should return updated video
      setVideo(res.data);
    } catch {
      toast.error("Action failed");
    }
  };

  // ADD COMMENT HANDLER
  const handleAddComment = async () => {
    // User must be logged in
    if (!user) {
      toast.error("Login to add a comment");
      return;
    }

    // Comment text must not be empty
    if (!newComment.trim()) return;

    try {
      // API call to add comment
      const res = await API.post(`/comments/${id}`, { text: newComment });

      setComments([{ ...res?.data, user: user }, ...comments]);
      setNewComment("");
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  if (!video) return null;

  const isLiked = user && video.likes?.includes(user._id);
  const isDisliked = user && video.dislikes?.includes(user._id);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 w-full min-h-[calc(100vh-56px)] bg-gray-100 dark:bg-zinc-900">
      <div className="w-full flex-1">
        {/* Video */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        {/* Title */}
        <h1 className="mt-4 text-lg font-semibold">{video.title}</h1>

        {/* Channel + Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-3">
          {/* Channel */}
          <Link
            to={`/channel/${video.channel._id}`}
            className="flex items-center gap-3"
          >
            <img
              src={video.channel?.avatar || fallbackAvatar}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{video.channel?.channelName}</p>
              <p className="text-xs text-gray-500">{video.views} views</p>
            </div>
          </Link>

          {/* Like / Dislike */}
          <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <button
              onClick={() => handleReaction("like")}
              className={`flex items-center gap-2 px-4 py-2 text-sm
                ${isLiked ? "text-blue-600" : ""}
              `}
            >
              <FaThumbsUp /> {video.likes?.length || 0}
            </button>

            <div className="w-px bg-gray-300 dark:bg-zinc-600" />

            <button
              onClick={() => handleReaction("dislike")}
              className={`flex items-center gap-2 px-4 py-2 text-sm
                ${isDisliked ? "text-blue-600" : ""}
              `}
            >
              <FaThumbsDown /> {video.dislikes?.length || 0}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 bg-gray-100 dark:bg-zinc-800 p-4 rounded">
          <p className="text-sm whitespace-pre-line">{video.description}</p>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h2 className="font-semibold mb-4">{comments.length} Comments</h2>

          {/* Add Comment if user is logged in */}
          {user ? (
            <div className="flex gap-3 mb-6">
              <img
                src={user.avatar || fallbackAvatar}
                className="w-9 h-9 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border-b bg-transparent focus:outline-none resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-1 bg-blue-600 text-white rounded"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-6">Login to add a comment</p>
          )}

          {/* Comment List */}
          <div className="space-y-5">
            {comments.map((c) => (
              <div key={c._id} className="flex gap-3">
                <img
                  src={c.user?.avatar || fallbackAvatar}
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{c.user?.username}</p>
                  <p className="text-sm">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* suggested videos */}
      <div className="w-full md:w-95 lg:w-105 space-y-3">
        {suggestedVideos.map((video) => (
          <SuggestedVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Watch;
