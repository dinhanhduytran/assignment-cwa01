"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Copy, Check } from "lucide-react";
import Cookies from "js-cookie";

interface Tab {
  id: string;
  title: string;
  content: string;
}

export default function TabGenerator() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoadingFromStorage, setIsLoadingFromStorage] = useState(true);

  // Load data from localStorage and cookies after component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);

    const savedTabs = localStorage.getItem("tabGeneratorTabs");
    if (savedTabs) {
      const parsedTabs = JSON.parse(savedTabs);
      if (parsedTabs.length > 0) {
        setTabs(parsedTabs);

        // Try to load active tab from cookie first, then localStorage
        const cookieTabId = Cookies.get("activeTabId");
        console.log("Loading from cookie:", cookieTabId);
        if (
          cookieTabId &&
          parsedTabs.some((tab: Tab) => tab.id === cookieTabId)
        ) {
          console.log("Setting active tab from cookie:", cookieTabId);
          setActiveTab(cookieTabId);
        } else {
          const savedActiveTab = localStorage.getItem("tabGeneratorActiveTab");
          if (savedActiveTab) {
            setActiveTab(savedActiveTab);
          }
        }
      }
    }

    setIsLoadingFromStorage(false);
  }, []);

  // Function to save tabs to localStorage
  const saveTabsToStorage = (newTabs: Tab[], newActiveTab: string) => {
    if (isClient && !isLoadingFromStorage) {
      localStorage.setItem("tabGeneratorTabs", JSON.stringify(newTabs));
      localStorage.setItem("tabGeneratorActiveTab", newActiveTab);
    }
  };

  // Function to save active tab to cookie
  const saveActiveTabToCookie = (tabId: string) => {
    if (isClient && tabId) {
      console.log("Saving to cookie:", tabId);
      Cookies.set("activeTabId", tabId, {
        expires: 7,
        path: "/",
        sameSite: "lax",
      }); // Expires in 7 days
      console.log("Cookie saved. All cookies:", document.cookie);
    }
  };

  const createNewTab = () => {
    if (tabs.length >= 15) {
      alert("Maximum of 15 tabs allowed");
      return;
    }

    const newId = Date.now().toString();
    const newTab: Tab = {
      id: newId,
      title: `Tab ${tabs.length + 1}`,
      content: `Content for tab ${tabs.length + 1}`,
    };
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setActiveTab(newId);
    saveTabsToStorage(newTabs, newId);
    saveActiveTabToCookie(newId);
  };

  const deleteTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);

    // If we deleted the last tab, set activeTab to empty
    if (newTabs.length === 0) {
      setTabs([]);
      setActiveTab("");
      saveTabsToStorage([], "");
      Cookies.remove("activeTabId"); // Remove cookie when no tabs
      return;
    }

    // If we deleted the active tab, switch to the first available tab
    let newActiveTab = activeTab;
    if (activeTab === id) {
      newActiveTab = newTabs[0].id;
      setActiveTab(newActiveTab);
    }

    setTabs(newTabs);
    saveTabsToStorage(newTabs, newActiveTab);
    saveActiveTabToCookie(newActiveTab);
  };

  const updateTabTitle = (id: string, title: string) => {
    const newTabs = tabs.map((tab) =>
      tab.id === id ? { ...tab, title } : tab
    );
    setTabs(newTabs);
    saveTabsToStorage(newTabs, activeTab);
  };

  const updateTabContent = (id: string, content: string) => {
    const newTabs = tabs.map((tab) =>
      tab.id === id ? { ...tab, content } : tab
    );
    setTabs(newTabs);
    saveTabsToStorage(newTabs, activeTab);
  };

  const switchActiveTab = (id: string) => {
    setActiveTab(id);
    saveTabsToStorage(tabs, id);
    saveActiveTabToCookie(id);
  };

  const generateHTML = () => {
    const tabsHTML = tabs
      .map(
        (tab, index) => `
  <div class="bg-white border border-slate-500 border-t-0 rounded-b-lg p-2 overflow-y-auto min-h-[200px]" id="tab${
    index + 1
  }" style="display: ${index === 0 ? "block" : "none"};">
    <div>${tab.content}</div>
  </div>`
      )
      .join("");

    const buttonsHTML = tabs
      .map(
        (tab, index) => `
  <button class="tab-button px-3 py-1 mb-2 text-sm rounded transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer ${
    index === 0
      ? "bg-rose-500 text-white"
      : "bg-rose-200 text-slate-700 hover:bg-rose-300"
  }" onclick="showTab(${index + 1})">
    ${tab.title}
  </button>`
      )
      .join("");

    const javascript = `
<script>
function showTab(tabNumber) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('[id^="tab"]');
  tabContents.forEach(content => content.style.display = 'none');
  
  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.className = button.className.replace(/bg-rose-500 text-white/g, 'bg-rose-200 text-slate-700 hover:bg-rose-300');
  });
  
  // Show selected tab content
  document.getElementById('tab' + tabNumber).style.display = 'block';
  
  // Add active class to clicked button
  event.target.className = event.target.className.replace(/bg-rose-200 text-slate-700 hover:bg-rose-300/g, 'bg-rose-500 text-white');
}
</script>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Tabs</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="text-center my-5">
        <h1 class="text-4xl font-bold mb-2 text-rose-700">Tab Generator</h1>
    </div>
    <div class="max-w-6xl mx-auto p-6">
        <div class="bg-rose-200 p-2 border-b border-slate-500 rounded-t-lg">
            <div class="flex gap-2 overflow-x-auto pb-2">
${buttonsHTML}
            </div>
        </div>
${tabsHTML}
    </div>
${javascript}
</body>
</html>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

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
              <Button onClick={copyToClipboard} variant="default" size="sm">
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
                    <code>{generateHTML()}</code>
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
