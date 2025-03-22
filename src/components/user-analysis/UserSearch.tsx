
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Activity, MapPin, ShieldAlert, Clock, UserRound } from 'lucide-react';
import { User } from '@/types/user-analysis';

interface UserSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredUsers: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  getRiskBadge: (status: string) => React.ReactNode;
  getRiskColor: (score: number) => string;
}

const UserSearch = ({
  searchQuery,
  setSearchQuery,
  filteredUsers,
  selectedUser,
  setSelectedUser,
  getRiskBadge,
  getRiskColor
}: UserSearchProps) => {
  return (
    <Card className="glass-card col-span-3 md:col-span-1 animate-in slide-up delay-100">
      <CardHeader>
        <CardTitle>User Search</CardTitle>
        <CardDescription>Search for users to analyze</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email or ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg border border-border/40 cursor-pointer transition-colors hover:bg-muted/40 ${
                    selectedUser?.id === user.id ? 'bg-muted/60 border-primary/50' : ''
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{user.name.split(' ').map(part => part[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    {getRiskBadge(user.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>{user.transactions} txns</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShieldAlert className="h-3 w-3" />
                      <span className={getRiskColor(user.riskScore)}>
                        {(user.riskScore * 100).toFixed(0)}% risk
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{user.lastActive}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <UserRound className="h-10 w-10 mx-auto text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">No users found</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSearch;
