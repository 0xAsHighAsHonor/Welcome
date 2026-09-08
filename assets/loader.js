(function () {
  document.body.classList.add('is-loading');

  var fill = document.getElementById('loader-fill');
  var pct = document.getElementById('loader-pct');
  var loader = document.getElementById('loader');
  var content = document.getElementById('page-content');

  var progress = 0;
  var duration = 1400; // ms
  var start = null;

  function step(ts) {
    if (!start) start = ts;
    var elapsed = ts - start;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    if (fill) fill.style.width = progress + '%';
    if (pct) pct.textContent = progress + '%';

    if (elapsed < duration) {
      requestAnimationFrame(step);
    } else {
      finish();
    }
  }

  function finish() {
    if (loader) loader.classList.add('hide');
    if (content) content.classList.add('show');
    document.body.classList.remove('is-loading');
  }

  requestAnimationFrame(step);

  // safety net in case rAF stalls (backgrounded tab, etc.)
  window.addEventListener('load', function () {
    setTimeout(finish, duration + 400);
  });
})();
