"use client";

import { Button } from "@/components/ui/button";
import { Plus, X, Copy, Check } from "lucide-react";
import { useTabManager } from "@/hooks/useTabManager";
import { useHtmlGenerator } from "@/hooks/useHtmlGenerator";
import { useClipboard } from "@/hooks/useClipboard";

export default function TabGenerator() {
  const {
    tabs,
    activeTab,
    currentTab,
    createNewTab,
    deleteTab,
    updateTabTitle,
    updateTabContent,
    switchActiveTab,
  } = useTabManager();

  const { generateHTML } = useHtmlGenerator();
  const { copied, copyToClipboard } = useClipboard();

  const handleCopyCode = () => {
    copyToClipboard(generateHTML(tabs));
  };

  return (
    <>
      {/* Tab Management */}
      <div className="flex justify-between items-center">
        {/* tab count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {tabs.length}/15 tabs
        </div>
        {/* Button to create new tab */}
        <Button
          onClick={createNewTab}
          //   className="bg-rose-500 hover:bg-rose-600 text-white"
          variant="default"
          disabled={tabs.length >= 15}
        >
          <Plus className="w-4 h-4" />
          Create New Tab
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-500">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex items-center flex-shrink-0">
              <button
                onClick={() => switchActiveTab(tab.id)}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-rose-500 text-white"
                    : "bg-rose-100 text-slate-700 hover:bg-rose-200 dark:bg-slate-700 dark:text-rose-50 dark:hover:bg-slate-600"
                }`}
              >
                {tab.title}
              </button>
              <button
                onClick={() => deleteTab(tab.id)}
                className="ml-1 p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete tab"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content Editor */}
      {tabs.length === 0 ? (
        <div className="border border-slate-500 rounded-lg p-8 text-center">
          <p className="text-slate-900 dark:text-slate-500">
            No tabs available. Create your first tab to start editing.
          </p>
        </div>
      ) : currentTab ? (
        <div className="space-y-4">
          <div>
            <label className="block text-2xl font-semibold mb-2">
              Tab Title
            </label>
            <input
              type="text"
              value={currentTab.title}
              onChange={(e) => updateTabTitle(currentTab.id, e.target.value)}
              className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
              placeholder="Enter tab title"
            />
          </div>

          <div>
            <label className="block text-2xl font-semibold mb-2">
              Tab Content
            </label>
            <textarea
              value={currentTab.content}
              onChange={(e) => updateTabContent(currentTab.id, e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:bg-slate-800 dark:text-white resize-vertical"
              placeholder="Enter tab content"
            />
          </div>
        </div>
      ) : null}

      {/* Preview and Code Sections */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Preview & Code</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-3">Preview</h3>
            {tabs.length === 0 ? (
              <div className="border border-slate-500 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                <p className="text-gray-500 dark:text-slate-500">
                  No tabs available. Create a tab to see the preview here.
                </p>
              </div>
            ) : (
              //    header with tabs
              <div className="border border-slate-500 rounded-lg overflow-hidden h-96 flex flex-col ">
                <div className=" bg-rose-200 dark:bg-gray-800 p-2 border-b border-slate-500 flex-shrink-0">
                  <div className="flex gap-2 overflow-x-auto">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => switchActiveTab(tab.id)}
                        className={`px-3 py-1 mb-2 text-sm rounded transition-colors whitespace-nowrap flex-shrink-0 ${
                          activeTab === tab.id
                            ? "bg-rose-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>
                {/* content */}
                <div className="p-2 overflow-y-auto">
                  <div>{currentTab?.content}</div>
                </div>
              </div>
            )}
          </div>

          {/* Code Display Section */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">Generated HTML Code</h3>
              <Button onClick={handleCopyCode} variant="default" size="sm">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="border border-slate-500 rounded-lg overflow-hidden h-96 flex flex-col">
              <div className="bg-rose-200 dark:bg-gray-800 px-4 py-2 border-b border-slate-500 flex-shrink-0 pb-4">
                <span className="text-sm font-medium text-slate-900 dark:text-gray-300">
                  HTML Code
                </span>
              </div>
              <div className=" p-4 overflow-y-auto">
                {tabs.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                    <p>
                      No tabs available. Create a tab to generate HTML code.
                    </p>
                  </div>
                ) : (
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    <code>{generateHTML(tabs)}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
