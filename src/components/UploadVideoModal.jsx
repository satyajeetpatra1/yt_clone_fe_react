import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function UploadVideoModal({ channelId, onClose, onUploaded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      return toast.error("Title and video URL required");
    }

    try {
      setLoading(true);
      const res = await API.post(
        "/videos",
        {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          channel: channelId,
        }
      );

      toast.success("Video uploaded");
      onUploaded(res.data);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-lg w-[95%] max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Video</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="YouTube iframe / video URL"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <input
            placeholder="Thumbnail URL"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideoModal;
