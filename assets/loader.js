(function () {
  document.body.classList.add('is-loading');
  var fill = document.getElementById('loader-fill'), pct = document.getElementById('loader-pct'),
      loader = document.getElementById('loader'), content = document.getElementById('page-content');
  var duration = 1400, start = null, done = false;

  function step(ts) {
    if (!start) start = ts;
    var e = ts - start, p = Math.min(100, Math.round(e / duration * 100));
    if (fill) fill.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
    if (e < duration) requestAnimationFrame(step); else finish();
  }
  function finish() {
    if (done) return; done = true;
    if (loader) loader.classList.add('hide');
    if (content) content.classList.add('show');
    document.body.classList.remove('is-loading');
  }
  requestAnimationFrame(step);
  window.addEventListener('load', function () { setTimeout(finish, duration + 400); });

  /* ---- light-blue glow that follows the mouse ---- */
  if (window.matchMedia('(hover:hover)').matches) {
    var g = document.createElement('div'); g.id = 'cursor-glow'; document.body.appendChild(g);
    document.addEventListener('mousemove', function (e) {
      g.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; g.classList.add('on');
    });
    document.addEventListener('mouseleave', function () { g.classList.remove('on'); });
  }

  /* ---- falling snow ---- */
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var c = document.createElement('canvas'); c.id = 'snow'; document.body.appendChild(c);
  var x = c.getContext('2d'), W, H, flakes = [];
  function size() { W = c.width = innerWidth; H = c.height = innerHeight; }
  size(); addEventListener('resize', size);
  var N = Math.min(140, Math.round(innerWidth / 9));
  for (var i = 0; i < N; i++) flakes.push({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    s: Math.random() < .3 ? 4 : (Math.random() < .6 ? 3 : 2),
    v: .4 + Math.random() * 1.1, d: Math.random() * 6.28, a: .45 + Math.random() * .5
  });
  function snow() {
    x.clearRect(0, 0, W, H);
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.y += f.v; f.d += .015; f.x += Math.sin(f.d) * .5;
      if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
      if (f.x > W + 5) f.x = -5; if (f.x < -5) f.x = W + 5;
      x.fillStyle = 'rgba(235,248,255,' + f.a + ')';
      x.fillRect(Math.round(f.x), Math.round(f.y), f.s, f.s);
    }
    requestAnimationFrame(snow);
  }
  snow();
})();
