import React, { useState } from 'react';
import { Library as LibraryIcon, Plus, MoreHorizontal, Play, Heart, Clock } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  addedDate: string;
  coverUrl: string;
  isFavorite: boolean;
}

const Library: React.FC = () => {
  const [view, setView] = useState<'songs' | 'albums' | 'artists'>('songs');
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'album' | 'date'>('title');
  const [searchQuery, setSearchQuery] = useState('');
  const { userStats } = useMusicContext();
  const [songs, setSongs] = useState<Song[]>([
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Eclipse',
      album: 'Nocturnal Journey',
      duration: '3:45',
      addedDate: '2025-02-01',
      coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Urban Lights',
      artist: 'City Pulse',
      album: 'Metropolitan',
      duration: '4:20',
      addedDate: '2025-01-28',
      coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=300&fit=crop',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Ocean Breeze',
      artist: 'Coastal Waves',
      album: 'Seaside Serenity',
      duration: '5:15',
      addedDate: '2025-01-25',
      coverUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=300&fit=crop',
      isFavorite: true
    }
  ]);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'album':
        return a.album.localeCompare(b.album);
      case 'date':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      default:
        return 0;
    }
  });

  const toggleFavorite = (songId: string) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Your Library</h1>
          <p className="text-gray-400">All your favorite music in one place</p>
        </div>
        <LibraryIcon className="w-10 h-10 text-purple-500 animate-float" />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView('songs')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              view === 'songs' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Songs
          </button>
          <button
            onClick={() => setView('albums')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              view === 'albums' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Albums
          </button>
          <button
            onClick={() => setView('artists')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              view === 'artists' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Artists
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search in your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Sort songs by"
          >
            <option value="title">Sort by Title</option>
            <option value="artist">Sort by Artist</option>
            <option value="album">Sort by Album</option>
            <option value="date">Sort by Date Added</option>
          </select>
          {userStats.isPremium && (
            <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Songs
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-12">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Artist</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Album</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-24">
                <Clock className="w-4 h-4" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedSongs.map((song, index) => (
              <tr
                key={song.id}
                className="hover:bg-gray-700 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <Play className="w-4 h-4 hidden group-hover:block" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover mr-3"
                    />
                    <span className="font-medium">{song.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {song.artist}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {song.album}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {new Date(song.addedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {song.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleFavorite(song.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={song.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        className={`w-5 h-5 ${song.isFavorite ? 'fill-current text-red-500' : ''}`}
                      />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;

