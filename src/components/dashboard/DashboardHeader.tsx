
import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown, { FilterOption } from '@/components/common/FilterDropdown';

interface DashboardHeaderProps {
  alertsEnabled: boolean;
  toggleAlerts: () => void;
  onSearch: (term: string) => void;
  onFiltersChange: (filters: any) => void;
  statusOptions: FilterOption[];
  paymentModeOptions: FilterOption[];
  channelOptions: FilterOption[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  alertsEnabled,
  toggleAlerts,
  onSearch,
  onFiltersChange,
  statusOptions,
  paymentModeOptions,
  channelOptions
}) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fraud Detection Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor and analyze fraud patterns in real-time</p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleAlerts}
          className={`${alertsEnabled ? 'text-status-high' : 'text-muted-foreground'}`}
          title={alertsEnabled ? "Disable real-time alerts" : "Enable real-time alerts"}
        >
          {alertsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </Button>
        <SearchBar
          onSearch={onSearch}
          placeholder="Search transactions..."
          className="w-full md:w-64"
        />
        <FilterDropdown
          onFiltersChange={onFiltersChange}
          statusOptions={statusOptions}
          paymentModeOptions={paymentModeOptions}
          channelOptions={channelOptions}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
