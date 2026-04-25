"use client";

import { Bell, Search, Menu, Heart, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,   
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_NAME } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // adjust path if needed

const supabase = createClient();

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // redirect to home or login page after sign out
  };

  const handleSettings = () => {
    router.push("/Settings");
  };

  return (
    <header className="h-16 border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 lg:px-6 gap-4 shadow-sm">
      {/* Mobile Logo + Menu */}
      <div className="flex items-center gap-3 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-500"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold text-slate-900">{APP_NAME}</span>
        </div>
      </div>

      {/* Page context */}
      <div className="hidden lg:flex items-center gap-2">
        <p className="text-sm text-slate-400">Recovery Dashboard</p>
        <span className="text-slate-300">/</span>
        <p className="text-sm font-semibold text-slate-700">Marcus Johnson</p>
      </div>

      {/* AI Insight Pill */}
      <div className="hidden xl:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100">
        <Sparkles className="w-3.5 h-3.5 text-sky-500" />
        <span className="text-xs font-medium text-sky-700">Pain down 62% since discharge</span>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <Button
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-2 text-slate-400 border-slate-200 hover:bg-slate-50 w-56"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="text-xs">Search anything...</span>
        <kbd className="ml-auto text-[10px] font-mono bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
          ⌘K
        </kbd>
      </Button>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger className="relative inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 hover:scale-110 active:scale-100">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            <Badge variant="secondary" className="text-xs">3 new</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { title: "Medication Due", desc: "Ibuprofen 600mg — due in 30 min", time: "30m", dot: "bg-amber-400" },
            { title: "Task Reminder", desc: "Evening walk not yet completed", time: "1h", dot: "bg-sky-400" },
            { title: "Follow-up Approaching", desc: "Dr. Chen appointment in 7 days", time: "2h", dot: "bg-purple-400" },
          ].map((n) => (
            <DropdownMenuItem key={n.title} className="flex items-start gap-3 py-3 cursor-pointer">
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
              <div>
                <p className="text-sm font-medium text-slate-800">{n.title}</p>
                <p className="text-xs text-slate-500">{n.desc}</p>
              </div>
              <span className="ml-auto text-[10px] text-slate-400 shrink-0">{n.time}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 h-9 px-2 rounded-md text-slate-600 hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shadow-md">
            MJ
          </div>
          <span className="hidden md:block text-sm font-medium">Marcus J.</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-y-0.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
  <DropdownMenuGroup>
    <DropdownMenuLabel className="font-normal">
      <p className="font-semibold text-sm">Marcus Johnson</p>
      <p className="text-xs text-slate-500">Day 7 of Recovery</p>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Care Team</DropdownMenuItem>
    <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
      Settings
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
    Sign out
  </DropdownMenuItem>
</DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}