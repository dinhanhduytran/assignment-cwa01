import TabGenerator from "@/components/TabGenerator";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Tab Generator</h1>
        <p className="text-slate-600 dark:text-gray-400">
          Create, edit, and generate HTML tabs
        </p>
      </div>
      {/* Instructions */}
      <div className="bg-rose-200 dark:bg-blue-900/20 border border-rose-500 rounded-lg p-4">
        <h3 className="font-semibold text-rose-900 dark:text-blue-300 mb-2">
          How to Use:
        </h3>
        <ol className="text-rose-800 dark:text-blue-200 text-sm space-y-1 list-decimal list-inside">
          <li>
            Create new tabs using the "Create New Tab" button (max 15 tabs)
          </li>
          <li>Edit tab titles and content in the editor below</li>
          <li>Preview your tabs in the preview section</li>
          <li>Click "Copy" in the code section to get the complete HTML</li>
          <li>
            Paste the code into an index.html file and open it in a browser
          </li>
        </ol>
      </div>

      <TabGenerator />
    </div>
  );
}
