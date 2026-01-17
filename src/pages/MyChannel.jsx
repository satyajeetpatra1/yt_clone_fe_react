import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services/api";
import Channel from "./Channel";
import CreateChannelModal from "../components/CreateChannelModal";
import YTLogo from "../assets/Youtube_logo.png";
import { useNavigate } from "react-router-dom";

// MyChannel page to view or create user's channel
function MyChannel() {
  const navigate = useNavigate();

  // Get current user from Redux store
  const user = useSelector((store) => store.auth.user);

  // Component state
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch user's channel data
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyChannel = async () => {
      try {
        // API call to get user's channel
        const res = await API.get("/channels/me");
        setChannelData(res.data.channel);
      } catch {
        setChannelData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMyChannel();
  }, [user]);

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Login to create your channel</p>
      </div>
    );
  }

  if (loading) return null;

  // If user has no channel, show create channel prompt
  if (!channelData) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-8 text-center border dark:border-zinc-800">
          <span className="font-bold text-lg flex gap-x-3 justify-center w-fit mx-auto mb-2">
            <img
              src={YTLogo}
              height={40}
              width={40}
              className="mx-auto my-auto"
              alt="YTlogo"
            />
            <span className="my-auto">YouTube</span>
          </span>

          <h2 className="text-2xl font-semibold mb-2">Create your channel</h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Start sharing videos and build your audience on YouTube
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition cursor-pointer"
          >
            Create Channel
          </button>
        </div>

        {showModal && (
          <CreateChannelModal
            onClose={() => setShowModal(false)}
            onSuccess={(channel) => {
              setShowModal(false);
              navigate(`/channel/${channel._id}`);
            }}
          />
        )}
      </div>
    );
  }

  // If user has a channel, show the channel page
  return <Channel channelId={channelData._id} />;
}

export default MyChannel;
