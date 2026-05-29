"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ResultType = "race" | "sprint";

interface ResultTypeSelectorProps {
  value: ResultType;
  onChange: (value: ResultType) => void;
  hasSprint: boolean;
}

export function ResultTypeSelector({
  value,
  onChange,
  hasSprint,
}: ResultTypeSelectorProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118]">
      <div className="relative min-h-[90px] bg-[#141118] px-[22px] py-5">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          viewBox="0 0 680 110"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="rtg1" cx="75%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#c00000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#141118" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="680" height="110" fill="#141118" />
          <rect width="680" height="110" fill="url(#rtg1)" />
          <path
            d="M200 55 Q320 20 450 50 Q550 70 650 35"
            stroke="#c00000"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </svg>

        <div className="relative z-10 grid gap-3 md:grid-cols-[1fr_minmax(18rem,28rem)] md:items-end">
          <div className="space-y-1">
            <label className="text-[15px] font-bold text-white">
              Result Type
            </label>
            <p className="text-[13px] text-[#706a7a]">
              {hasSprint
                ? "Switch between race and sprint classification."
                : "This Grand Prix has no sprint session."}
            </p>
          </div>

          <Select
            value={value}
            onValueChange={(v) => onChange(v as ResultType)}
            disabled={!hasSprint}
          >
            <SelectTrigger className="h-11 w-full rounded-[10px] border border-[#2a2530] bg-[#1e1a26] text-[#c8c2d4] shadow-none transition-colors hover:border-[#3d3648] hover:bg-[#242030] focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="Choose result type..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-[#2a2530] bg-[#1a1621] text-[#c8c2d4] backdrop-blur-xl">
              <SelectItem
                value="race"
                className="rounded-lg text-[13px] text-[#c8c2d4] focus:bg-[#e03535] focus:text-white"
              >
                Race Results
              </SelectItem>
              <SelectItem
                value="sprint"
                disabled={!hasSprint}
                className="rounded-lg text-[13px] text-[#c8c2d4] focus:bg-[#e03535] focus:text-white"
              >
                Sprint Results
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
