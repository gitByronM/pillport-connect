
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onClose?: () => void;
  compact?: boolean;
}

// Mock data for suggestions
const suggestions = [
  { id: 1, name: 'Aspirin', category: 'Pain Relief' },
  { id: 2, name: 'Paracetamol', category: 'Pain Relief' },
  { id: 3, name: 'Ibuprofen', category: 'Anti-inflammatory' },
  { id: 4, name: 'Amoxicillin', category: 'Antibiotics' },
  { id: 5, name: 'Loratadine', category: 'Allergy Relief' },
  { id: 6, name: 'Omeprazole', category: 'Digestive Health' },
];

const SearchBar: React.FC<SearchBarProps> = ({ onClose, compact = false }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Remove auto-focus when component mounts
  useEffect(() => {
    if (inputRef.current && !compact && false) { // Disable auto-focus
      inputRef.current.focus();
    }
  }, [compact]);
  
  useEffect(() => {
    if (query) {
      const filtered = suggestions.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [query]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className={`w-full ${!compact ? 'max-w-4xl mx-auto' : ''}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className={`absolute left-3 w-5 h-5 text-muted-foreground ${compact ? 'w-4 h-4' : ''}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            placeholder={compact ? "Search products..." : "Search for medications, symptoms, categories..."}
            className={`w-full ${
              compact 
                ? 'pl-9 pr-8 py-2 text-sm rounded-lg' 
                : 'pl-12 pr-10 py-3 rounded-full'
            } border border-gray-200 bg-gray-50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-pharma-300 focus:border-transparent outline-none`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={`absolute ${compact ? 'right-3' : 'right-4'} text-muted-foreground hover:text-foreground transition-colors`}
              aria-label="Clear search"
            >
              <X className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </button>
          )}
        </div>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-2 -right-2 rounded-full bg-pharma-100 text-pharma-600 p-1 hover:bg-pharma-200 transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {isFocused && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-[1000] animate-fade-in">
            <ul className="max-h-60 overflow-y-auto">
              {filteredSuggestions.map((item) => (
                <li 
                  key={item.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between"
                  onClick={() => handleSuggestionClick(item.name)}
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
