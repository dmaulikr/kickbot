chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'bounds': {
      'width': 6,
      'height': 1136
    }
  });
});