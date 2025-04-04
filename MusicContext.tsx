import React, { createContext, useContext, useState } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  mood: string;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
}

interface Artist {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  threshold: number;
}

interface Community {
  id: string;
  artistId: string;
  name: string;
  members: number;
  isExclusive: boolean;
}

interface UserStats {
  artistListens: { [key: string]: number };
  isPremium: boolean;
}

interface MusicContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  featuredPlaylists: Playlist[];
  topArtists: Artist[];
  songs: Song[];
  communities: Community[];
  userStats: UserStats;
  incrementArtistListens: (artistId: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const songs: Song[] = [
    {
      id: '1',
      title: 'Midnight City',
      artist: 'M83',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      mood: 'energetic'
    },
    {
      id: '2',
      title: 'Peaceful Mind',
      artist: 'Sarah Chen',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
      mood: 'relaxed'
    },
    {
      id: '3',
      title: 'Thunder Road',
      artist: 'The Waves',
      coverUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop',
      mood: 'angry'
    },
    {
      id: '4',
      title: 'Blue Rain',
      artist: 'Mike Rivers',
      coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      mood: 'sad'
    }
  ];

  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);

  const featuredPlaylists: Playlist[] = [
    {
      id: '1',
      title: 'Chill Vibes',
      description: 'Perfect for relaxation',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Workout Mix',
      description: 'High-energy beats',
      coverUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Focus Flow',
      description: 'Concentrate better',
      coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    },
    {
      id: '4',
      title: 'Party Time',
      description: 'Weekend favorites',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    },
  ];

  const topArtists: Artist[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      genre: 'Pop',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
      threshold: 50
    },
    {
      id: '2',
      name: 'The Waves',
      genre: 'Rock',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
      threshold: 30
    },
    {
      id: '3',
      name: 'Mike Rivers',
      genre: 'Jazz',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      threshold: 40
    },
    {
      id: '4',
      name: 'Luna',
      genre: 'Electronic',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      threshold: 35
    },
    {
      id: '5',
      name: 'The Rhythm',
      genre: 'Hip Hop',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
      threshold: 45
    },
    {
      id: '6',
      name: 'Emma Soul',
      genre: 'R&B',
      imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop',
      threshold: 25
    },
  ];

  const communities: Community[] = topArtists.map(artist => ({
    id: `community-${artist.id}`,
    artistId: artist.id,
    name: `${artist.name} Community`,
    members: Math.floor(Math.random() * 1000) + 500,
    isExclusive: true
  }));

  const [userStats, setUserStats] = useState<UserStats>({
    artistListens: {},
    isPremium: false
  });

  const incrementArtistListens = (artistId: string) => {
    setUserStats(prev => ({
      ...prev,
      artistListens: {
        ...prev.artistListens,
        [artistId]: (prev.artistListens[artistId] || 0) + 1
      }
    }));
  };

  return (
    <MusicContext.Provider value={{
      currentSong,
      setCurrentSong,
      featuredPlaylists,
      topArtists,
      songs,
      communities,
      userStats,
      incrementArtistListens
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

