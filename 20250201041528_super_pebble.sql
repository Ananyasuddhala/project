/*
  # Initial Raagya Database Schema

  1. New Tables
    - users
      - Extended user profile data
    - songs
      - Music metadata and storage references
    - playlists
      - User-created and system playlists
    - playlist_songs
      - Junction table for playlist-song relationships
    - artists
      - Artist profiles and metadata
    - artist_followers
      - Track user-artist relationships
    - user_listening_history
      - Track user listening patterns
    - communities
      - Artist fan communities
    - community_messages
      - Community chat messages
    - themes
      - Available UI themes
    - user_preferences
      - User settings and preferences

  2. Security
    - RLS policies for all tables
    - Secure access patterns for user data
    - Protected artist and admin operations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users extended profile
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Songs table
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID NOT NULL,
  album TEXT,
  duration INTEGER NOT NULL,
  genre TEXT,
  mood TEXT,
  cover_url TEXT,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  genre TEXT,
  image_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Playlists table
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  user_id UUID REFERENCES users(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Playlist songs junction
CREATE TABLE playlist_songs (
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (playlist_id, song_id)
);

-- Artist followers
CREATE TABLE artist_followers (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, artist_id)
);

-- User listening history
CREATE TABLE user_listening_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  song_id UUID REFERENCES songs(id),
  listened_at TIMESTAMPTZ DEFAULT now(),
  duration_listened INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false
);

-- Communities
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id),
  name TEXT NOT NULL,
  description TEXT,
  is_exclusive BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Community messages
CREATE TABLE community_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Themes
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User preferences
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  theme_id UUID REFERENCES themes(id),
  autoplay BOOLEAN DEFAULT true,
  private_session BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_listening_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Anyone can read public playlists
CREATE POLICY "Anyone can read public playlists" ON playlists
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

-- Users can CRUD their own playlists
CREATE POLICY "Users can manage own playlists" ON playlists
  FOR ALL USING (auth.uid() = user_id);

-- Anyone can read songs
CREATE POLICY "Anyone can read songs" ON songs
  FOR SELECT USING (true);

-- Anyone can read artists
CREATE POLICY "Anyone can read artists" ON artists
  FOR SELECT USING (true);

-- Users can manage their follows
CREATE POLICY "Users can manage follows" ON artist_followers
  FOR ALL USING (auth.uid() = user_id);

-- Users can read their listening history
CREATE POLICY "Users can read own history" ON user_listening_history
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create listening history
CREATE POLICY "Users can create history" ON user_listening_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Community access policies
CREATE POLICY "Users can read communities" ON communities
  FOR SELECT USING (true);

-- Message policies
CREATE POLICY "Users can read community messages" ON community_messages
  FOR SELECT USING (true);

CREATE POLICY "Users can create messages" ON community_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Theme policies
CREATE POLICY "Anyone can read themes" ON themes
  FOR SELECT USING (true);

-- User preferences policies
CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_songs_artist ON songs(artist_id);
CREATE INDEX idx_playlist_songs_playlist ON playlist_songs(playlist_id);
CREATE INDEX idx_playlist_songs_song ON playlist_songs(song_id);
CREATE INDEX idx_user_history_user ON user_listening_history(user_id);
CREATE INDEX idx_user_history_song ON user_listening_history(song_id);
CREATE INDEX idx_community_messages_community ON community_messages(community_id);
CREATE INDEX idx_artist_followers_artist ON artist_followers(artist_id);

