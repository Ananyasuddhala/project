import React from 'react';
import { Radio as RadioIcon, Play } from 'lucide-react';

const Radio: React.FC = () => {
  const stations = [
    {
      id: '1',
      name: 'Classical Radio',
      description: 'The best of classical music',
      currentTrack: 'Symphony No. 5 - Beethoven',
      listeners: '2.5k',
      coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Jazz Lounge',
      description: 'Smooth jazz all day',
      currentTrack: 'Take Five - Dave Brubeck',
      listeners: '1.8k',
      coverUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Electronic Beats',
      description: 'Non-stop electronic music',
      currentTrack: 'Strobe - Deadmau5',
      listeners: '3.2k',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      name: 'Rock Radio',
      description: 'Classic and modern rock',
      currentTrack: 'Stairway to Heaven - Led Zeppelin',
      listeners: '4.1k',
      coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="p-8 pb-32">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <RadioIcon className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold">Radio</h1>
        </div>
        <p className="text-gray-400">
          Listen to curated radio stations from around the world
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stations.map((station) => (
          <div
            key={station.id}
            className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
          >
            <div className="relative">
              <img
                src={station.coverUrl}
                alt={station.name}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  className="bg-purple-500 hover:bg-purple-600 p-3 rounded-full"
                  aria-label={`Play ${station.name}`}
                >
                  <Play className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">{station.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{station.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-400">Now Playing:</span>
                <span className="text-gray-400">{station.listeners} listening</span>
              </div>
              <p className="text-sm mt-1 truncate">{station.currentTrack}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio; 