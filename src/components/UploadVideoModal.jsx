import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { categories } from "../constants/categories";

// Component to upload a new video
function UploadVideoModal({ channelId, onClose, onUploaded }) {
  // State variables for video details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle category selection
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  function getYouTubeIframeLink(url) {
    if (typeof url !== "string") return "invalid";

    url = url.trim();

    // If already a valid YouTube iframe embed link
    const iframeRegex =
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]{11}(\?.*)?$/;
    if (iframeRegex.test(url)) {
      return url;
    }

    // Match different YouTube video URL formats
    const videoRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/live\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(videoRegex);

    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return "invalid";
  }

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let videoLink = getYouTubeIframeLink(videoUrl).trim();

    // Validation
    if (!title || !videoUrl) {
      return toast.error("Title and video URL required");
    }

    if (videoLink === "invalid") {
      return toast.error("Invalid video URL");
    }

    // At least one category must be selected
    if (selectedCategories.length === 0) {
      return toast.error("Select at least one category");
    }

    try {
      setLoading(true);

      // API call to upload the video
      const res = await API.post("/videos", {
        title,
        description,
        videoUrl: videoLink,
        thumbnailUrl,
        category: selectedCategories, // 🔥 ARRAY
        channel: channelId,
      });

      // Success feedback
      toast.success("Video uploaded");

      // Invoke uploaded callback with new video data
      onUploaded(res.data);
      // Close the modal
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-lg w-[95%] max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Upload Video</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <input
            placeholder="Title"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Video URL */}
          <input
            placeholder="YouTube iframe / video URL"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          {/* Thumbnail URL */}
          <input
            placeholder="Thumbnail URL"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />

          {/* -------- CATEGORIES -------- */}
          <div>
            <p className="text-sm font-medium mb-2">Categories</p>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm border transition
                    ${
                      selectedCategories.includes(cat)
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="cursor-pointer">
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideoModal;
