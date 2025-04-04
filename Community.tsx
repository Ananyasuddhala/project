import React, { useState } from 'react';
import { Users, Lock, MessageSquare } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

const Community: React.FC = () => {
  const { communities, topArtists, userStats } = useMusicContext();
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; user: string; timestamp: Date }>>([]);

  const canJoinCommunity = (artistId: string) => {
    const artist = topArtists.find(a => a.id === artistId);
    const listens = userStats.artistListens[artistId] || 0;
    return userStats.isPremium || (artist && listens >= artist.threshold);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages(prev => [...prev, {
      text: message,
      user: 'You',
      timestamp: new Date()
    }]);
    setMessage('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Artist Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map(community => {
            const artist = topArtists.find(a => a.id === community.artistId);
            const canJoin = canJoinCommunity(community.artistId);
            const listens = userStats.artistListens[community.artistId] || 0;
            
            return (
              <div
                key={community.id}
                className={`bg-gray-800 rounded-lg p-6 ${
                  selectedCommunity === community.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{community.name}</h3>
                  {community.isExclusive && <Lock size={16} className="text-purple-500" />}
                </div>
                
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Users size={16} />
                  <span>{community.members} members</span>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400">Listening Progress</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min((listens / (artist?.threshold || 1)) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {listens}/{artist?.threshold} listens required
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCommunity(community.id)}
                  disabled={!canJoin}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                    canJoin
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-700 cursor-not-allowed'
                  }`}
                >
                  {canJoin ? (
                    <>
                      <MessageSquare size={16} />
                      Join Chat
                    </>
                  ) : (
                    'Keep Listening to Join'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCommunity && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Community Chat</h3>
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{msg.user}</span>
                  <span className="text-sm text-gray-400">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Community;

