chrome.storage.local.get(["loadUrl"], function (result) {
  $("#url").val(result.loadUrl);
});
$("#change").click(() => {
  let loadUrl = $("#url").val();
  chrome.storage.local.set({ loadUrl: loadUrl }, function () {
    console.log(`Load Url is set to: ${loadUrl}`);
  });
});
