import React from 'react';
import { useMusicContext } from '../Context/MusicContext';
import Community from './Community';
import Library from './library';
import Searchbar from './Searchbar';
import Radio from './Radio';
import Challenges from './Challenges';

interface DashboardProps {
  currentView: string;
}

const Dashboard: React.FC<DashboardProps> = ({ currentView }) => {
  const { featuredPlaylists, topArtists } = useMusicContext();

  // Render different components based on currentView
  switch (currentView) {
    case 'community':
      return <Community />;
    case 'library':
      return <Library />;
    case 'radio':
      return <Radio />;
    case 'challenges':
      return <Challenges />;
    case 'search':
      return (
        <div className="p-8 pb-32">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search</h1>
            <p className="text-gray-400 mb-6">
              Find your favorite songs, artists, and playlists
            </p>
            <Searchbar />
          </header>
          {/* Search results will be shown here */}
        </div>
      );
    case 'discover':
    default:
      return (
        <div className="p-8 pb-32">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Discover</h1>
            <p className="text-gray-400 mb-6">
              Explore new music, join challenges, and connect with artists
            </p>
            <Searchbar />
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                >
                  <div className="relative">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.title}
                      className="w-full aspect-square object-cover rounded-md mb-4"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        className="bg-purple-500 hover:bg-purple-600 p-3 rounded-full"
                        aria-label={`Play ${playlist.title}`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">{playlist.title}</h3>
                  <p className="text-sm text-gray-400">{playlist.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Top Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {topArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full mb-3 group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  <h3 className="font-medium">{artist.name}</h3>
                  <p className="text-sm text-gray-400">{artist.genre}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
  }
};

export default Dashboard;

