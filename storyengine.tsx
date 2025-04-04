import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, Download, Crown, Info, Heart, Share2, Loader2 } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

interface StoryScene {
  id: string;
  imageUrl: string;
  description: string;
  soundEffectUrl?: string;
  animationUrl?: string;
  mood: string;
  artistContext?: string;
  songContext?: string;
  themeContext?: string;
}

const StoryEngine: React.FC = () => {
  const { userStats } = useMusicContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // Enhanced story scenes with personalized context
  const storyScenes: StoryScene[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop',
      description: "As the melody begins, we find ourselves in a neon-lit city street, where Sarah Chen first found inspiration for this song during a late-night walk through Tokyo...",
      soundEffectUrl: '/effects/city-ambience.mp3',
      mood: 'energetic',
      artistContext: "Sarah Chen wrote this song during her transformative trip to Japan in 2024, where the bustling nightlife of Tokyo deeply influenced her sound.",
      songContext: "The song's opening synthesizer represents the neon lights of the city, while the steady beat mirrors the rhythm of urban life.",
      themeContext: "This piece explores themes of self-discovery and cultural connection, inspired by Sarah's experience as an artist bridging Eastern and Western musical traditions."
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=1920&h=1080&fit=crop',
      description: "The rhythm intensifies as we soar above the city, each beat synchronized with the pulsing lights below, reflecting the artist's growing connection to this vibrant metropolis...",
      animationUrl: '/animations/city-pulse.json',
      mood: 'energetic',
      artistContext: "This section showcases Sarah's signature blend of traditional Asian instruments with modern electronic elements.",
      songContext: "The ascending melody represents the feeling of liberation and wonder she experienced during her first night in the city.",
      themeContext: "The visual journey mirrors the song's themes of ascending beyond cultural boundaries and finding unity in diversity."
    }
  ];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await Promise.all(
          storyScenes.map((scene) => {
            return new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.src = scene.imageUrl;
              img.onload = () => {
                setLoadedImages(prev => new Set([...prev, scene.imageUrl]));
                resolve();
              };
              img.onerror = () => reject(new Error(`Failed to load image: ${scene.imageUrl}`));
            });
          })
        );
      } catch (err) {
        const errorMessage = 'Failed to load story visuals. Please try again.';
        setError(errorMessage);
        console.error('Image loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentScene(prev => 
        prev < storyScenes.length - 1 ? prev + 1 : prev
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlayback = () => {
    if (error) return;
    setIsPlaying(!isPlaying);
  };

  const handleDownload = async () => {
    if (!userStats.isPremium || isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Here you would typically handle the actual download logic
    } catch {
      setError('Failed to download story. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this story on Raagya',
          text: storyScenes[currentScene].description,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        // You would typically show a toast notification here
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 pb-32 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
          <p className="text-gray-400">Loading story experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 pb-32 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const toggleContext = () => {
    setShowContext(!showContext);
  };

  return (
    <div className="p-8 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold mb-2 gradient-text">Personalized Story Experience</h2>
          <p className="text-gray-400">
            Discover the deeper meaning behind the music through immersive storytelling
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-8 animate-slide-up">
          {loadedImages.has(storyScenes[currentScene].imageUrl) ? (
            <img
              src={storyScenes[currentScene].imageUrl}
              alt="Story Scene"
              className="w-full aspect-video object-cover transition-transform duration-700 ease-out transform scale-105"
            />
          ) : (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          )}
          
          {!userStats.isPremium && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center p-8 glass-effect rounded-xl">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse-soft" />
                <h3 className="text-xl font-bold mb-2">Premium Story Experience</h3>
                <p className="text-gray-400 mb-4 max-w-md">
                  Upgrade to Premium to unlock personalized music stories with artist insights, 
                  animated visuals, and exclusive behind-the-scenes content
                </p>
                <button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors transform hover:scale-105"
                  onClick={() => {
                    // Handle premium upgrade
                  }}
                >
                  Go Premium
                </button>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleContext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                disabled={!loadedImages.has(storyScenes[currentScene].imageUrl)}
              >
                <Info className="w-5 h-5" />
                {showContext ? 'Hide Context' : 'Show Context'}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  disabled={!loadedImages.has(storyScenes[currentScene].imageUrl)}
                  aria-label={isLiked ? "Unlike story" : "Like story"}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked ? 'text-red-500 fill-current' : ''
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  disabled={!loadedImages.has(storyScenes[currentScene].imageUrl)}
                  aria-label="Share story"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {showContext && (
              <div className="mb-4 space-y-3 animate-slide-up">
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-purple-400 font-medium mb-2">Artist Context</h4>
                  <p className="text-sm">{storyScenes[currentScene].artistContext}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-purple-400 font-medium mb-2">Song Story</h4>
                  <p className="text-sm">{storyScenes[currentScene].songContext}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-purple-400 font-medium mb-2">Themes & Meaning</h4>
                  <p className="text-sm">{storyScenes[currentScene].themeContext}</p>
                </div>
              </div>
            )}

            <p className="text-lg mb-4 font-medium">
              {storyScenes[currentScene].description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlayback}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors transform hover:scale-105 ${
                    error ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                  disabled={!!error || !loadedImages.has(storyScenes[currentScene].imageUrl)}
                  aria-label={isPlaying ? "Pause story" : "Play story"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={!loadedImages.has(storyScenes[currentScene].imageUrl)}
                  aria-label="Next scene"
                >
                  <SkipForward className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <div className="w-24 h-1 bg-gray-700 rounded-full">
                    <div className="w-3/4 h-full bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>

              {userStats.isPremium && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading || !loadedImages.has(storyScenes[currentScene].imageUrl)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Story
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 animate-slide-up">
          {storyScenes.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => setCurrentScene(index)}
              disabled={!loadedImages.has(scene.imageUrl)}
              className={`relative rounded-lg overflow-hidden aspect-video group transform transition-transform hover:scale-105 ${
                currentScene === index ? 'ring-2 ring-purple-500' : ''
              } ${!loadedImages.has(scene.imageUrl) ? 'animate-pulse bg-gray-800' : ''}`}
            >
              {loadedImages.has(scene.imageUrl) ? (
                <>
                  <img
                    src={scene.imageUrl}
                    alt={`Scene ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${
                    currentScene === index 
                      ? 'bg-purple-500/20' 
                      : 'bg-black/25 group-hover:bg-black/40'
                  } transition-colors`} />
                </>
              ) : (
                <Loader2 className="w-6 h-6 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryEngine;