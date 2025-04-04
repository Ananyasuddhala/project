import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Loader2 } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  status: 'sent' | 'error' | 'typing';
}

const MoodChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! How are you feeling today?", 
      isUser: false, 
      timestamp: new Date(),
      status: 'sent'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setCurrentSong, songs } = useMusicContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMoodBasedSong = (input: string): { song: typeof songs[0]; mood: string } | null => {
    const input_lower = input.toLowerCase();
    
    // Mood mapping patterns
    const moodPatterns = {
      energetic: ['happy', 'excited', 'energetic', 'great', 'amazing', 'fantastic', 'pumped', 'motivated'],
      relaxed: ['calm', 'peaceful', 'relaxed', 'chill', 'tranquil', 'zen', 'good'],
      sad: ['sad', 'down', 'depressed', 'unhappy', 'lonely', 'blue', 'bad'],
      angry: ['angry', 'frustrated', 'mad', 'annoyed', 'irritated', 'furious']
    };

    // Detect mood from input
    let detectedMood = 'neutral';
    for (const [mood, patterns] of Object.entries(moodPatterns)) {
      if (patterns.some(pattern => input_lower.includes(pattern))) {
        detectedMood = mood;
        break;
      }
    }

    // Find a song matching the mood
    const matchingSong = songs.find(song => song.mood === detectedMood);
    return matchingSong ? { song: matchingSong, mood: detectedMood } : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const moodResult = getMoodBasedSong(userMessage.text);
      
      let botResponse: Message;
      if (moodResult) {
        const { song, mood } = moodResult;
        botResponse = {
          text: `I can sense that you're feeling ${mood}. I think "${song.title}" by ${song.artist} would be perfect for your mood. Let me play it for you!`,
          isUser: false,
          timestamp: new Date(),
          status: 'sent'
        };
        setCurrentSong(song);
      } else {
        botResponse = {
          text: "I'm not quite sure how to match that mood, but let me play something uplifting for you!",
          isUser: false,
          timestamp: new Date(),
          status: 'sent'
        };
        const defaultSong = songs.find(song => song.mood === 'energetic') || songs[0];
        setCurrentSong(defaultSong);
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          text: "Sorry, I'm having trouble processing your request. Please try again.",
          isUser: false,
          timestamp: new Date(),
          status: 'error'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-24 bg-purple-500 p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          aria-label="Open mood assistant"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed right-6 bottom-24 w-80 bg-gray-800 rounded-lg shadow-xl animate-slide-up">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="font-semibold">Mood Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close mood assistant"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.status === 'error'
                      ? 'bg-red-500/10 text-red-500 border border-red-500/50'
                      : message.isUser
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {message.text}
                  <div className="text-xs mt-1 opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tell me how you're feeling..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isTyping}
              />
              {isTyping && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MoodChatbot;

