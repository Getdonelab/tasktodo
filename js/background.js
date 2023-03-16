let color = "#3aa757";

chrome.runtime.onInstalled.addListener((reason) => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: "index.html",
    });
  }
});
