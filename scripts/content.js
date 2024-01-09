let text = "";
const allElements = document.querySelectorAll(
  "p, h1, h2, h3, h4, h5, h6, article, main, section"
);

allElements.forEach((el) => {
  text += el.textContent + " ";
});

if (text.trim() !== "") {
  chrome.runtime.sendMessage({ text: text.trim() }, function (response) {
    console.log(response);
  });
}
