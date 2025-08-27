"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-8 text-center">
          Noel Tran - Student No: 21654197
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8">
          <video
            controls
            width="100%"
            height="400"
            className="rounded-lg shadow-lg"
          >
            <source src="/showcasevideo.mp4" type="video/mp4" />

          </video>
        </div>
      </div>
    </div>
  );
}
