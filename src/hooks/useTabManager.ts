import { useState, useEffect } from "react";
import { Tab } from "@/types/tab";

export const useTabManager = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [isLoadingFromStorage, setIsLoadingFromStorage] = useState(true);

  // Load data from localStorage after component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);

    const savedTabs = localStorage.getItem("tabGeneratorTabs");
    if (savedTabs) {
      const parsedTabs = JSON.parse(savedTabs);
      if (parsedTabs.length > 0) {
        setTabs(parsedTabs);
      }
    }

    const savedActiveTab = localStorage.getItem("tabGeneratorActiveTab");
    if (savedActiveTab) {
      setActiveTab(savedActiveTab);
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
  };

  const deleteTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);

    // If we deleted the last tab, set activeTab to empty
    if (newTabs.length === 0) {
      setTabs([]);
      setActiveTab("");
      saveTabsToStorage([], "");
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
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return {
    tabs,
    activeTab,
    currentTab,
    isClient,
    isLoadingFromStorage,
    createNewTab,
    deleteTab,
    updateTabTitle,
    updateTabContent,
    switchActiveTab,
  };
};
