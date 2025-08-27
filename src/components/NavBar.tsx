"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Tabs" },
    { href: "/pre-lab-question", label: "Pre-lab Question" },
    { href: "/escape-room", label: "Escape Room" },
    { href: "/coding-races", label: "Coding Race" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="relative flex h-16 w-full items-center justify-between border-be px-4 shadow-sm ">
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden sm:flex justify-evenly w-full ">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-rose-500 bg-rose-100 dark:text-blue-300 dark:bg-slate-600"
                  : "hover:text-rose-400 hover:bg-rose-100 dark:hover:text-blue-200 dark:hover:bg-slate-600"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="sm:hidden justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 p-2 bg-rose-200 dark:bg-slate-900 border border-rose-300 dark:border-gray-700"
          >
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 block ${
                      isActive
                        ? "text-rose-500 bg-rose-100 dark:text-blue-300 dark:bg-slate-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-rose-400 hover:bg-rose-100 dark:hover:text-blue-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
