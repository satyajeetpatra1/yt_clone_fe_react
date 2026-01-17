import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function CreateChannelModal({ onClose, onSuccess }) {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName.trim()) {
      return toast.error("Channel name is required");
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/channels",
        {
          channelName,
          description,
          avatar,
          banner
        }
      );

      toast.success("Channel created successfully");
      onSuccess(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-lg w-[95%] max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          Create your channel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Channel Name */}
          <input
            type="text"
            placeholder="Channel name *"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Avatar URL */}
          <input
            type="text"
            placeholder="Avatar image URL (optional)"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          {/* Banner URL */}
          <input
            type="text"
            placeholder="Banner image URL (optional)"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
            >
              {loading ? "Creating..." : "Create Channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChannelModal;
