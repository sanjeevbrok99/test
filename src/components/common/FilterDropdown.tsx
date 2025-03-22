
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, ChevronDown, FilterIcon, X } from 'lucide-react';
import { format } from 'date-fns';

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selected, onChange }) => {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="space-y-1">
        {options.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={`filter-${option.id}`}
              checked={selected.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
            />
            <Label
              htmlFor={`filter-${option.id}`}
              className="text-sm cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DateRangePickerProps {
  dateRange: { from?: Date; to?: Date };
  onChange: (range: { from?: Date; to?: Date }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onChange }) => {
  const [isFromPickerOpen, setIsFromPickerOpen] = useState(false);
  const [isToPickerOpen, setIsToPickerOpen] = useState(false);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Date Range</h3>
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Popover open={isFromPickerOpen} onOpenChange={setIsFromPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-start text-left text-xs font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {dateRange.from ? format(dateRange.from, "PPP") : "From date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => {
                  onChange({ ...dateRange, from: date });
                  setIsFromPickerOpen(false);
                }}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          <Popover open={isToPickerOpen} onOpenChange={setIsToPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-start text-left text-xs font-normal",
                  !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {dateRange.to ? format(dateRange.to, "PPP") : "To date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => {
                  onChange({ ...dateRange, to: date });
                  setIsToPickerOpen(false);
                }}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {(dateRange.from || dateRange.to) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange({ from: undefined, to: undefined })}
            className="flex w-full items-center justify-center text-xs text-muted-foreground"
          >
            <X className="mr-1 h-3 w-3" />
            Clear dates
          </Button>
        )}
      </div>
    </div>
  );
};

interface FilterDropdownProps {
  onFiltersChange: (filters: any) => void;
  statusOptions: FilterOption[];
  paymentModeOptions: FilterOption[];
  channelOptions: FilterOption[];
  initialFilters?: any;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onFiltersChange,
  statusOptions,
  paymentModeOptions,
  channelOptions,
  initialFilters = {},
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: initialFilters.dateRange || { from: undefined, to: undefined },
    fraudStatus: initialFilters.fraudStatus || [],
    paymentMode: initialFilters.paymentMode || [],
    channel: initialFilters.channel || [],
    payerId: initialFilters.payerId || '',
    payeeId: initialFilters.payeeId || '',
  });
  
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  
  // Update filter count
  React.useEffect(() => {
    let count = 0;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.fraudStatus.length > 0) count++;
    if (filters.paymentMode.length > 0) count++;
    if (filters.channel.length > 0) count++;
    if (filters.payerId) count++;
    if (filters.payeeId) count++;
    setActiveFilterCount(count);
  }, [filters]);
  
  const applyFilters = () => {
    onFiltersChange(filters);
    setIsOpen(false);
  };
  
  const clearFilters = () => {
    const emptyFilters = {
      dateRange: { from: undefined, to: undefined },
      fraudStatus: [],
      paymentMode: [],
      channel: [],
      payerId: '',
      payeeId: '',
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("relative", className)}
        >
          <FilterIcon className="mr-2 h-3.5 w-3.5" />
          Filters
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 pointer-events-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Filter Transactions</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="h-8 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
          
          <DateRangePicker 
            dateRange={filters.dateRange} 
            onChange={(dateRange) => setFilters({ ...filters, dateRange })} 
          />
          
          <FilterSection 
            title="Fraud Status" 
            options={statusOptions} 
            selected={filters.fraudStatus} 
            onChange={(selected) => setFilters({ ...filters, fraudStatus: selected })} 
          />
          
          <FilterSection 
            title="Payment Mode" 
            options={paymentModeOptions} 
            selected={filters.paymentMode} 
            onChange={(selected) => setFilters({ ...filters, paymentMode: selected })} 
          />
          
          <FilterSection 
            title="Channel" 
            options={channelOptions} 
            selected={filters.channel} 
            onChange={(selected) => setFilters({ ...filters, channel: selected })} 
          />
          
          <div className="pt-2 flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDropdown;
