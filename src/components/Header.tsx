import { ModeToggle } from "./ThemeToggle"
export default function Header() {
    return (
        <div className="flex-row flex justify-between items-center p-4 border-b-2  bg-rose-50 dark:bg-slate-900 ">
            {/* Left side: Name and ID */}
            <span className="border-2 rounded-md px-4 py-1 shadow-sm font-semibold">
                <span className="hidden sm:inline">Dinh Anh Duy Tran - 21654197</span>
                <span className="sm:hidden">21654197</span>
            </span>
            {/* Middle: App Name */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2">
                <span className=" text-3xl font-bold">Tab Generator</span>
            </div>
            {/* Right side: Theme Toggle */}
            <ModeToggle />
        </div>
    )
}
