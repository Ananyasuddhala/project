import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Music2, FileText, Info } from 'lucide-react';

interface UploadGuidelines {
  category: string;
  requirements: string[];
}

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const ArtistUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    songTitle: '',
    genre: '',
    description: '',
    file: null as File | null
  });

  const guidelines: UploadGuidelines[] = [
    {
      category: 'Audio Quality',
      requirements: [
        'Minimum bitrate: 320 kbps',
        'Accepted formats: WAV, FLAC, or high-quality MP3',
        'No audible clipping or distortion',
        'Proper mastering required'
      ]
    },
    {
      category: 'Content',
      requirements: [
        'Original content only',
        'No copyrighted material',
        'No explicit content without proper tagging',
        'Clear vocal recordings'
      ]
    },
    {
      category: 'Metadata',
      requirements: [
        'Accurate song title and artist name',
        'Complete album information',
        'Proper genre classification',
        'Correct BPM and key information'
      ]
    },
    {
      category: 'Legal',
      requirements: [
        'Must own or have rights to all content',
        'Signed content agreement required',
        'Tax information for revenue sharing',
        'Valid government ID for verification'
      ]
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: 'Basic',
      price: 9.99,
      features: [
        'Single song upload',
        'Basic analytics',
        '70% revenue share',
        'Standard support'
      ]
    },
    {
      name: 'Pro',
      price: 29.99,
      features: [
        'Up to 5 songs per month',
        'Advanced analytics',
        '80% revenue share',
        'Priority support',
        'Promotional features'
      ],
      recommended: true
    },
    {
      name: 'Label',
      price: 99.99,
      features: [
        'Unlimited songs',
        'Professional analytics',
        '85% revenue share',
        'Dedicated support',
        'Premium promotion',
        'Custom artist page'
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid audio file (MP3, WAV, or FLAC)');
      return;
    }

    setFormData(prev => ({ ...prev, file }));
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !formData.songTitle || !formData.genre) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Submitting:', formData);
    // Reset form
    setFormData({
      songTitle: '',
      genre: '',
      description: '',
      file: null
    });
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-purple-500" />
                Upload Guidelines
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {guidelines.map((section) => (
                  <div key={section.category} className="space-y-3">
                    <h4 className="font-medium text-purple-400">{section.category}</h4>
                    <ul className="space-y-2">
                      {section.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-lg font-medium transition-colors"
            >
              I Understand and Accept the Guidelines
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative bg-gray-800 p-6 rounded-lg border-2 transition-colors ${
                    selectedTier === tier.name
                      ? 'border-purple-500'
                      : 'border-transparent hover:border-gray-700'
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                        Recommended
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${tier.price}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedTier(tier.name)}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      selectedTier === tier.name
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
            {selectedTier && (
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-lg font-medium transition-colors"
              >
                Continue with {selectedTier} Plan
              </button>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="max-w-md mx-auto text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music2 className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Music</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Your files will be reviewed within 48 hours. Make sure they meet our quality guidelines.
                  </p>
                </div>

                {isUploading ? (
                  <div className="space-y-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block w-full py-12 border-2 border-dashed border-gray-600 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="audio/*"
                        onChange={handleFileUpload}
                      />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-400">
                        Drag and drop or click to upload
                      </span>
                    </label>
                    <p className="text-sm text-gray-500">
                      Supported formats: WAV, FLAC, MP3 (max 50MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Song Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    name="songTitle"
                    value={formData.songTitle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter song title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Genre *
                  </label>
                  <select 
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="Select music genre"
                    required
                  >
                    <option value="">Select genre</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="electronic">Electronic</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="Tell us about your song..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-500">What happens next?</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Our team will review your submission within 48 hours. You'll receive an email notification once the review is complete.
                    If approved, your song will be available on our platform and you can start earning based on listener engagement.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-lg font-medium transition-colors"
            >
              Submit for Review
            </button>
          </div>
        );
    }
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Upload Your Music</h1>
          <p className="text-gray-400">Share your music with the world and earn from your streams</p>
        </div>
        <Upload className="w-10 h-10 text-purple-500 animate-float" />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? 'bg-purple-500 text-white'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div
                  className={`w-24 h-1 mx-2 rounded ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-3xl mx-auto mt-2">
          <span className="text-sm text-gray-400">Guidelines</span>
          <span className="text-sm text-gray-400">Select Plan</span>
          <span className="text-sm text-gray-400">Upload</span>
        </div>
      </div>

      {renderStep()}
    </div>
  );
};

export default ArtistUpload;
