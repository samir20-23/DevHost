
if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    document.write(
      '<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"><\/script>'
    );
    document.write(
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.9/core.min.js"><\/script>'
    );
    document.write(
      '<script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js"><\/script>'
    );

    // show info bar
    document.querySelector(".browser-ie11").style.display = "block";

    // createEvent polyfill
    (function() {
      if (typeof window.CustomEvent === "function") return false;

      function CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(
          event,
          params.bubbles,
          params.cancelable,
          params.detail
        );
        return evt;
      }

      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    })();
  }
