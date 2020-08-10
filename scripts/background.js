chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set(
    { loadUrl: "https://sv.dhcnhn.vn/training/appregister" },
    function () {
      console.log(
        "Load Url is set to: https://sv.dhcnhn.vn/training/appregister"
      );
    }
  );
});

chrome.webRequest.onCompleted.addListener(
  function (headers) {
    if (parseInt(headers.statusCode) >= 300 || /error/i.test(headers.url)) {
      chrome.storage.local.get(["loadUrl"], function (result) {
        console.log(`Redirecting to ${result.loadUrl}`);
        setTimeout(() => {
          chrome.tabs.update(headers.tabId, { url: result.loadUrl });
        }, 3000);
      });
    } else {
      let successAudio = new Audio(
        chrome.runtime.getURL("assets/music/success.mp3")
      );
      successAudio.play();
    }
  },
  { urls: ["https://sv.dhcnhn.vn/*"] },
  ["responseHeaders"]
);
