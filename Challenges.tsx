import React from 'react';
import { Trophy, Clock, Users, Star, ArrowRight } from 'lucide-react';

const Challenges: React.FC = () => {
  const challenges = [
    {
      id: '1',
      title: 'Weekly Cover Challenge',
      description: 'Record your version of "Bohemian Rhapsody"',
      participants: 234,
      timeLeft: '3 days',
      reward: '1000 points',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Beat Making Contest',
      description: 'Create a unique beat using provided samples',
      participants: 156,
      timeLeft: '5 days',
      reward: '2000 points',
      coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Songwriting Challenge',
      description: 'Write lyrics about your hometown',
      participants: 89,
      timeLeft: '7 days',
      reward: '1500 points',
      coverUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Music Video Challenge',
      description: 'Create a one-minute music video',
      participants: 167,
      timeLeft: '4 days',
      reward: '2500 points',
      coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="p-8 pb-32">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold">Challenges</h1>
        </div>
        <p className="text-gray-400">
          Complete music challenges to earn rewards and recognition
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer hover:bg-gray-750 transition-colors"
          >
            <div className="flex">
              <div className="w-1/3">
                <img
                  src={challenge.coverUrl}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{challenge.participants} joined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{challenge.timeLeft} left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{challenge.reward}</span>
                  </div>
                </div>

                <button 
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  aria-label={`Join ${challenge.title} challenge`}
                >
                  Join Challenge
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges; 