chrome.runtime.sendMessage({ getSummary: true }, function (response) {
  if (response.summary) {
    document.getElementById("summary").textContent = response.summary;
  }
});
