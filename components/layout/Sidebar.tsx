"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Pill,
  Activity,
  Trophy,
  FileText,
  Settings,
  Heart,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

const NAV_ITEMS = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Recovery Plan", href: "/recovery-plan", icon: ClipboardList },
  { title: "Medications", href: "/medications", icon: Pill, badge: 2 },
  { title: "Symptoms", href: "/symptoms", icon: Activity },
  { title: "Milestones", href: "/milestones", icon: Trophy },
  { title: "Documents", href: "/documents", icon: FileText },
];

const BOTTOM_ITEMS = [
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-900 text-slate-100 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg">
          <Heart className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-white">{APP_NAME}</span>
          <span className="text-[10px] font-medium leading-tight text-slate-400">
            {APP_TAGLINE}
          </span>
        </div>
      </div>

      {/* Recovery Status Banner */}
      <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400">Day 7 · On Track</span>
        </div>
        <div className="mt-1.5 w-full bg-slate-700 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
            style={{ width: "8.3%" }}
          />
        </div>
        <p className="mt-1 text-[10px] text-slate-400">8 of 84 days complete</p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-0.5">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-sky-500/15 text-sky-300 shadow-sm"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge className="h-4 min-w-4 px-1 text-[10px] bg-sky-500 hover:bg-sky-500 text-white border-0 rounded-full">
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <ChevronRight className="w-3 h-3 text-sky-400/60 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4 bg-slate-800" />

        <nav className="space-y-0.5">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-sky-500/15 text-sky-300"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                )}
              >
                <Icon className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-slate-300" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Patient Card */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            MJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Marcus Johnson</p>
            <p className="text-[10px] text-slate-500 truncate">Knee Replacement · Day 7</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
