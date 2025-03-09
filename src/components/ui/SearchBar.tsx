
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose?: () => void;
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

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
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
      console.log('Searching for:', query);
      // Here you would typically navigate to search results
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            placeholder="Search for medications, symptoms, categories..."
            className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-pharma-300 focus:border-transparent outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-premium overflow-hidden z-10 animate-fade-in">
            <ul className="max-h-60 overflow-y-auto">
              {filteredSuggestions.map((item) => (
                <li 
                  key={item.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between"
                  onClick={() => setQuery(item.name)}
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
