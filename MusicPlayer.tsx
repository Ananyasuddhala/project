import React from 'react';
import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

const MusicPlayer: React.FC = () => {
  const { currentSong } = useMusicContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentSong && (
            <>
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-12 h-12 rounded-md"
              />
              <div>
                <h4 className="font-medium">{currentSong.title}</h4>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button 
            className="text-gray-400 hover:text-white"
            aria-label="Previous song"
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600"
            aria-label="Play/Pause"
          >
            <Play size={20} fill="white" />
          </button>
          <button 
            className="text-gray-400 hover:text-white"
            aria-label="Next song"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-gray-700 rounded-full">
            <div className="w-3/4 h-full bg-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;

