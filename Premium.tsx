import React from 'react';
import { Crown, Check, X } from 'lucide-react';

interface PremiumProps {
  isOpen: boolean;
  onClose: () => void;
}

const Premium: React.FC<PremiumProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Monthly',
      price: 9.99,
      period: 'month',
      features: [
        'Ad-free music streaming',
        'High-quality audio',
        'Offline listening',
        'Access to exclusive artist content',
        'Join premium communities'
      ]
    },
    {
      name: 'Annual',
      price: 99.99,
      period: 'year',
      features: [
        'All Monthly features',
        'Two months free',
        'Early access to new features',
        'Premium support',
        'Exclusive events access'
      ],
      popular: true
    }
  ];

  const handleSubscribe = (planName: string) => {
    // Handle subscription logic here
    console.log(`Subscribing to ${planName} plan`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          aria-label="Close premium modal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <Crown className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-audrey font-bold mb-2 tracking-wider">Upgrade to Premium</h2>
          <p className="text-gray-400">Unlock the full potential of your musical journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-700 rounded-lg p-6 relative ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-audrey font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-2">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-purple-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Premium;

