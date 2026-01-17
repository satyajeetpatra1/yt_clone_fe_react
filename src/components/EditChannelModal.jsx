import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function EditChannelModal({ channel, onClose, onUpdated }) {
  const [channelName, setChannelName] = useState(channel.channelName);
  const [description, setDescription] = useState(channel.description || "");
  const [avatar, setAvatar] = useState(channel.avatar || "");
  const [banner, setBanner] = useState(channel.banner || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.put(
        `/channels/${channel._id}`,
        { channelName, description, avatar, banner }
      );

      toast.success("Channel updated");
      onUpdated(res.data);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-lg w-[95%] max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Channel</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Avatar URL"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <input
            placeholder="Banner URL"
            className="w-full p-2 border rounded dark:bg-zinc-800"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="cursor-pointer">
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChannelModal;
