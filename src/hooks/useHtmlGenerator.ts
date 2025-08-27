import { Tab } from "@/types/tab";

export const useHtmlGenerator = () => {
  const generateHTML = (tabs: Tab[]) => {
    const tabsHTML = tabs
      .map(
        (tab, index) => `
  <div class="bg-white border border-rose-500 rounded-b-lg p-2 overflow-y-auto min-h-[200px]" id="tab${
    index + 1
  }" style="display: ${index === 0 ? "block" : "none"};">
    <pre style="white-space: pre-wrap; margin: 0; font-family: inherit; font-size: inherit;">${
      tab.content
    }</pre>
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
<body class="bg-gradient-to-r from-rose-500 to-pink-400">
    <div class="text-center my-5">
        <h1 class="text-4xl font-bold mb-2 text-white">Custom Tab Collection</h1>
    </div>
    <div class="max-w-6xl mx-auto p-6">
        <div class="bg-rose-200 border border-rose-500 rounded-t-lg p-4">
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

  return { generateHTML };
};
