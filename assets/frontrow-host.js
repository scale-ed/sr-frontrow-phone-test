/* Mockup host for the FrontrowMD sticker + modal.
   Answers the same postMessage handshake the widget expects from the
   parent page on 1md.org (ready / resize / open modal / close / minimize). */
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

  var modal = document.getElementById('frontrow-modal');
  function openModal() { modal.classList.add('is-open'); document.documentElement.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('is-open'); document.documentElement.style.overflow = ''; }

  function stickerFor(win) {
    return Array.prototype.find.call(document.querySelectorAll('iframe.frontrow-sticker'), function (f) { return f.contentWindow === win; });
  }

  window.addEventListener('message', function (ev) {
    var d = ev.data;
    var name = typeof d === 'string' ? d : (d && d.name);
    var src = ev.source;
    switch (name) {
      case 'STICKER_REQUEST_READY_STATUS': if (src) src.postMessage({ name: 'PARENT_READY' }, '*'); break;
      case 'RESIZE_STICKER': if (src) src.postMessage({ name: 'STICKER_RESIZED' }, '*'); break;
      case 'OPEN_MODAL_STICKER': openModal(); break;
      case 'CLOSE_MODAL':
      case 'CLOSE_ALL_MODALS': closeModal(); break;
      case 'TOGGLE_STICKER': var f = stickerFor(src); if (f) f.classList.toggle('is-min'); updateReadout(); break;
    }
  });

  // Readout: screen width and how much of the widget is visible.
  var out = document.getElementById('readout');
  function updateReadout() {
    if (!out) return;
    var f = document.querySelector('iframe.frontrow-sticker');
    if (!f) return;
    var r = f.getBoundingClientRect();
    var row = f.closest('.frontrow-row');
    var limit = window.innerWidth;
    if (fit === 'crop' && row && getComputedStyle(row).overflow === 'hidden') {
      var rr = row.getBoundingClientRect();
      limit = Math.min(limit, rr.right);
    }
    var hidden = Math.max(0, Math.round(r.right - limit));
    var scale = Math.round((r.width / 437) * 100);
    out.textContent = 'Screen ' + window.innerWidth + 'px · widget ' + scale + '% · ' + (hidden ? hidden + 'px cut off' : 'fully visible');
  }
  window.addEventListener('resize', updateReadout);
  window.addEventListener('load', updateReadout);
  setTimeout(updateReadout, 600);
})();
