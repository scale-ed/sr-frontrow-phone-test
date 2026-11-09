/* Mockup host for the FrontrowMD embeds.
   Test-bar controls: which banner to load (?banner=badge|banner|quant|sticker) and the width readout. */
(function () {
  var params = new URLSearchParams(location.search);
  var banner = ['banner', 'quant', 'sticker'].indexOf(params.get('banner')) > -1 ? params.get('banner') : 'badge';

  // Keep the banner option when switching products.
  document.querySelectorAll('a[data-keep-params]').forEach(function (a) {
    var url = new URL(a.getAttribute('href'), location.href);
    url.searchParams.set('banner', banner);
    a.setAttribute('href', url.pathname.split('/').pop() + url.search);
  });
  document.querySelectorAll('a[data-banner]').forEach(function (a) {
    if (a.getAttribute('data-banner') === banner) a.classList.add('is-active');
  });

  // Load the chosen embed. Scripts cloned from a <template> are re-created so they run.
  // FrontrowMD's script then handles the widget's messages and modal.
  var row = document.getElementById('frontrow-row');
  var tpl = row && row.querySelector('template[data-banner="' + banner + '"]');
  if (tpl) {
    var node = document.importNode(tpl.content, true);
    node.querySelectorAll('script').forEach(function (old) {
      var s = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function (at) { s.setAttribute(at.name, at.value); });
      old.parentNode.replaceChild(s, old);
    });
    row.appendChild(node);
  }

  // Readout: screen width and the widget's rendered size.
  var out = document.getElementById('readout');
  function updateReadout() {
    if (!out || !row) return;
    var f = row.querySelector('iframe');
    if (!f || !f.offsetWidth) return;
    var r = f.getBoundingClientRect();
    var scale = Math.round((r.width / f.offsetWidth) * 100);
    out.textContent = 'Screen ' + window.innerWidth + 'px · widget ' + Math.round(r.width) + 'px wide (' + scale + '%)';
  }
  window.addEventListener('resize', updateReadout);
  window.addEventListener('load', updateReadout);
  setTimeout(updateReadout, 2500); // after FrontrowMD sizes the widget
  setTimeout(updateReadout, 8000);
})();
