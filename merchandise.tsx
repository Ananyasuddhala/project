import React, { useState } from 'react';
import { ShoppingBag, Star, Filter, ChevronDown, Heart } from 'lucide-react';
import { useMusicContext } from '../Context/MusicContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  artistId: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

const Merchandise: React.FC = () => {
  const { topArtists } = useMusicContext();
  const [selectedArtist, setSelectedArtist] = useState<string | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const products: Product[] = [
    {
      id: '1',
      name: 'Limited Edition Vinyl',
      description: 'Exclusive signed vinyl with custom artwork',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=300&h=300&fit=crop',
      category: 'Music',
      artistId: '1',
      inStock: true,
      rating: 4.8,
      reviews: 124
    },
    {
      id: '2',
      name: 'Tour T-Shirt 2025',
      description: 'Official tour merchandise',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      category: 'Apparel',
      artistId: '1',
      inStock: true,
      rating: 4.9,
      reviews: 89
    },
  ];

  const categories = ['Apparel', 'Music', 'Accessories', 'Collectibles'];

  const filteredProducts = products.filter(product => {
    if (selectedArtist !== 'all' && product.artistId !== selectedArtist) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return -1;
      default:
        return b.rating - a.rating;
    }
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex items-center justify-between mb-12">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold mb-3 gradient-text">Artist Merchandise</h1>
          <p className="text-gray-400 text-lg">Support your favorite artists with exclusive merchandise</p>
        </div>
        <ShoppingBag className="w-10 h-10 text-purple-500 animate-float" />
      </div>

      <div className="flex flex-wrap gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {['artist', 'category', 'sort'].map((type, index) => (
          <div key={type} className="relative" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
            <select
              value={
                type === 'artist' ? selectedArtist :
                type === 'category' ? selectedCategory :
                sortBy
              }
              onChange={(e) => {
                if (type === 'artist') setSelectedArtist(e.target.value);
                else if (type === 'category') setSelectedCategory(e.target.value);
                else setSortBy(e.target.value as typeof sortBy);
              }}
              className="appearance-none bg-gray-800 text-white px-6 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gray-700 transition-colors gradient-border"
              aria-label={`Select ${type}`}
            >
              {type === 'artist' ? (
                <>
                  <option value="all">All Artists</option>
                  {topArtists.map(artist => (
                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                  ))}
                </>
              ) : type === 'category' ? (
                <>
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </>
              ) : (
                <>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </>
              )}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product, index) => {
          const artist = topArtists.find(a => a.id === product.artistId);
          const isFavorite = favorites.has(product.id);
          
          return (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover-card animate-slide-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="relative group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full aspect-square object-cover transform transition-transform group-hover:scale-110"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
                  aria-label={favorites.has(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-white'}`}
                  />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-purple-400">{artist?.name}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      product.inStock
                        ? 'bg-purple-500 hover:bg-purple-600 transform hover:scale-105'
                        : 'bg-gray-700 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Merchandise;

