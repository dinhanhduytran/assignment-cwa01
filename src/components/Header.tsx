import { ModeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 border-b-2 bg-rose-50 dark:bg-slate-900 w-full">
      {/* Left side: Name and ID */}
      <span className="rounded-md px-4 py-1 shadow-sm font-semibold bg-rose-500 hover:bg-rose-600 text-white">
        <span className="hidden md:inline">Noel Tran - 21654197</span>
        <span className="md:hidden">21654197</span>
      </span>

      {/* Middle: App Name */}
      <div className="hidden md:inline absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-3xl font-bold text-rose-500">Tab Generator</span>
      </div>

      {/* Right side: Theme Toggle */}
      <ModeToggle />
    </header>
  );
}
