/* Mockup host for the FrontrowMD sticker.
   Test-bar controls: crop/extend fit option and the width readout. */
(function () {
  var params = new URLSearchParams(location.search);
  var fit = params.get('fit') === 'extend' ? 'extend' : 'crop';
  document.documentElement.setAttribute('data-fit', fit);

  // Keep the fit option when switching products.
  document.querySelectorAll('a[data-keep-fit]').forEach(function (a) {
    var url = new URL(a.getAttribute('href'), location.href);
    url.searchParams.set('fit', fit);
    a.setAttribute('href', url.pathname.split('/').pop() + url.search);
  });
  document.querySelectorAll('a[data-fit]').forEach(function (a) {
    if (a.getAttribute('data-fit') === fit) a.classList.add('is-active');
  });

  // FrontrowMD's own script (loaded with the sticker) handles the widget's messages and modal.

  // Readout: screen width and how much of the widget is visible.
  var out = document.getElementById('readout');
  function updateReadout() {
    if (!out) return;
    var f = document.getElementById('frontrow-sticker');
    if (!f) return;
    var r = f.getBoundingClientRect();
    var row = f.closest('.frontrow-row');
    var limit = window.innerWidth;
    if (fit === 'crop' && row && getComputedStyle(row).overflow === 'hidden') {
      var rr = row.getBoundingClientRect();
      limit = Math.min(limit, rr.right);
    }
    var hidden = Math.max(0, Math.round(r.right - limit));
    var scale = Math.round((r.width / f.offsetWidth) * 100);
    out.textContent = 'Screen ' + window.innerWidth + 'px · widget ' + scale + '% · ' + (hidden ? hidden + 'px cut off' : 'fully visible');
  }
  window.addEventListener('resize', updateReadout);
  window.addEventListener('load', updateReadout);
  setTimeout(updateReadout, 600);
  setTimeout(updateReadout, 2500); // after FrontrowMD scales the sticker
})();
