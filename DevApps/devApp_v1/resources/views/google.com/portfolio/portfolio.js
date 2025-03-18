(function (h, o, t, j, a, r) {
    h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
    h._hjSettings = { hjid: 5338917, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='); window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'AW-16931587007'); (() => { function u() { function n(t, e, i) { let r = document.createElement("a"); r.href = t, r.target = i, r.rel = e, document.body.appendChild(r), r.click(), r.remove() } function o(t) { if (this.dataset.hydrated) { this.removeEventListener("click", o); return } t.preventDefault(), t.stopPropagation(); let e = this.getAttribute("href"); if (!e) return; if (/Mac|iPod|iPhone|iPad/u.test(navigator.userAgent) ? t.metaKey : t.ctrlKey) return n(e, "", "_blank"); let r = this.getAttribute("rel") ?? "", c = this.getAttribute("target") ?? ""; n(e, r, c) } function a(t) { if (this.dataset.hydrated) { this.removeEventListener("auxclick", o); return } t.preventDefault(), t.stopPropagation(); let e = this.getAttribute("href"); e && n(e, "", "_blank") } function s(t) { if (this.dataset.hydrated) { this.removeEventListener("keydown", s); return } if (t.key !== "Enter") return; t.preventDefault(), t.stopPropagation(); let e = this.getAttribute("href"); if (!e) return; let i = this.getAttribute("rel") ?? "", r = this.getAttribute("target") ?? ""; n(e, i, r) } document.querySelectorAll("[data-nested-link]").forEach(t => { t instanceof HTMLElement && (t.addEventListener("click", o), t.addEventListener("auxclick", a), t.addEventListener("keydown", s)) }) } return u })()()
 