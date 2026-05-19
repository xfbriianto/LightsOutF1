"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalendarFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function CalendarFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: CalendarFiltersProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4 sm:flex sm:items-end sm:gap-4 sm:space-y-0">
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium text-foreground">Search</label>
        <Input
          placeholder="Search by race name or circuit..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-background"
        />
      </div>

      <div className="space-y-2 sm:min-w-40">
        <label className="text-sm font-medium text-foreground">Status</label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Races</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
