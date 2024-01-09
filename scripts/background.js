let summary = "";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const text = request.text;

  if (!text) {
    return;
  }

  const azureApiKey = "";

  const systemMessage =
    "You are a page summarizer. Summarize the text you receive into small paragraphs.";

  try {
    const messageWithSystem = [
      { role: "system", content: systemMessage },
      { role: "user", content: text },
    ];

    const resourceName = "openai-lkc-presc-grad";
    const deploymentId = "clinical-comm-gpt-35";
    const apiVersion = "2023-12-01-preview";

    fetch(
      `https://${resourceName}.openai.azure.com/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": azureApiKey,
        },
        body: JSON.stringify({
          messages: messageWithSystem,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        summary = data.choices[0].message.content;
        sendResponse({ summary: summary });
      })
      .catch((error) => {
        console.error(error);
      });

    // Indicate that response function will be called async
    return true;
  } catch (error) {
    console.error(error);
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getSummary) {
    sendResponse({ summary: summary });
  }
});
