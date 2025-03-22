
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  initialValue?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search transactions...',
  onSearch,
  initialValue = '',
  className
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'relative flex w-full max-w-sm items-center transition-all duration-300 group',
        className
      )}
    >
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-8 pl-10 h-10 rounded-full border border-input bg-white dark:bg-black/10 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full p-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
