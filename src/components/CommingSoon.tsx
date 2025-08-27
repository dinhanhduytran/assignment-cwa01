interface ComingSoonProps {
  title?: string;
  description?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you something amazing. Stay tuned!",
}: ComingSoonProps) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-rose-50 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          {description}
        </p>
      </div>
    </div>
  );
}
