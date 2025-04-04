import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

interface SearchResult {
  id: string;
  type: 'song' | 'artist' | 'playlist';
  title: string;
  subtitle?: string;
  imageUrl: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { songs, topArtists, featuredPlaylists } = useMusicContext();

  const getSearchResults = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = searchQuery.toLowerCase();

    const songResults = songs.filter(song => 
      song.title.toLowerCase().includes(normalizedQuery) || 
      song.artist.toLowerCase().includes(normalizedQuery)
    ).map(song => ({
      id: song.id,
      type: 'song' as const,
      title: song.title,
      subtitle: song.artist,
      imageUrl: song.coverUrl
    }));

    const artistResults = topArtists.filter(artist =>
      artist.name.toLowerCase().includes(normalizedQuery) ||
      artist.genre.toLowerCase().includes(normalizedQuery)
    ).map(artist => ({
      id: artist.id,
      type: 'artist' as const,
      title: artist.name,
      subtitle: artist.genre,
      imageUrl: artist.imageUrl
    }));

    const playlistResults = featuredPlaylists.filter(playlist =>
      playlist.title.toLowerCase().includes(normalizedQuery) ||
      playlist.description.toLowerCase().includes(normalizedQuery)
    ).map(playlist => ({
      id: playlist.id,
      type: 'playlist' as const,
      title: playlist.title,
      subtitle: playlist.description,
      imageUrl: playlist.coverUrl
    }));

    return [...songResults, ...artistResults, ...playlistResults];
  };

  const results = getSearchResults(query);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsSearching(true);
          }}
          onBlur={() => setTimeout(() => setIsSearching(false), 200)}
          onFocus={() => setIsSearching(true)}
          placeholder="Search for songs, artists, or playlists..."
          className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {isSearching && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer"
            >
              <img
                src={result.imageUrl}
                alt={result.title}
                className={`w-12 h-12 object-cover ${result.type === 'artist' ? 'rounded-full' : 'rounded-md'}`}
              />
              <div>
                <h4 className="font-medium">{result.title}</h4>
                <p className="text-sm text-gray-400">
                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  {result.subtitle && ` • ${result.subtitle}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

