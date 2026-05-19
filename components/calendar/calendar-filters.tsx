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
  <div className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118]">
    <div className="relative bg-[#141118] px-[22px] py-[18px]">

      {/* Wave SVG */}
      <svg
        className="absolute inset-0 h-full w-full opacity-45 pointer-events-none"
        viewBox="0 0 680 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="fg1" cx="80%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c00000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#141118" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="680" height="100" fill="#141118" />
        <rect width="680" height="100" fill="url(#fg1)" />
        <path d="M200 45 Q340 12 480 42 Q580 62 670 28" stroke="#c00000" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M160 65 Q310 35 460 58 Q570 74 660 50" stroke="#8b0000" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-[14px] sm:flex-row sm:items-end sm:gap-[14px]">

        {/* Search */}
        <div className="flex flex-1 flex-col gap-[6px]">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
            Search
          </label>
          <Input
            placeholder="Search by race name or circuit..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-[42px] rounded-[10px] border border-[#2a2530] bg-[#1e1a26] text-[13px] text-[#c8c2d4] placeholder:text-[#706a7a] shadow-none transition-colors hover:border-[#3d3648] hover:bg-[#242030] focus:border-[#e03535] focus:bg-[#1e1a26] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-[6px] sm:min-w-[160px]">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
            Status
          </label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="h-[42px] rounded-[10px] border border-[#2a2530] bg-[#1e1a26] text-[13px] text-[#c8c2d4] shadow-none transition-colors hover:border-[#3d3648] hover:bg-[#242030] focus:border-[#e03535] focus:ring-0 focus:ring-offset-0 [&>svg]:text-[#706a7a]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-[#2a2530] bg-[#1a1621] text-[#c8c2d4] backdrop-blur-xl">
              <SelectItem value="all" className="text-[13px] focus:bg-[#e03535] focus:text-white rounded-lg">All Races</SelectItem>
              <SelectItem value="upcoming" className="text-[13px] focus:bg-[#e03535] focus:text-white rounded-lg">Upcoming</SelectItem>
              <SelectItem value="finished" className="text-[13px] focus:bg-[#e03535] focus:text-white rounded-lg">Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  </div>
);
}