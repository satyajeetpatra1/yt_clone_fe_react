import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services/api";
import Channel from "./Channel";
import CreateChannelModal from "../components/CreateChannelModal";

function MyChannel() {
  const user = useSelector((state) => state.auth.user);
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyChannel = async () => {
      try {
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

  if (!user) {
    return <p className="text-center mt-10">Login to create your channel</p>;
  }

  if (loading) return null;

  if (!channelData) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-xl font-semibold mb-4">Create your channel</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-red-600 text-white rounded"
        >
          Create Channel
        </button>

        {showModal && (
          <CreateChannelModal
            onClose={() => setShowModal(false)}
            onSuccess={(channel) => {
              setShowModal(false);
              window.location.href = `/channel/${channel._id}`;
            }}
          />
        )}
      </div>
    );
  }

  return <Channel channelId={channelData._id} />;
}

export default MyChannel;
