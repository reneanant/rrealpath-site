/* Microsoft Clarity — project "rrealpath" (yfy23kxdlv). Masking: Balanced (form fields & user-typed text masked). */
(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "yfy23kxdlv");

document.addEventListener('DOMContentLoaded', () => {

// ── Active nav link
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
if (a.getAttribute('href') === path) a.classList.add('active');
});

// ── Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const drawer = document.getElementById('nav-drawer');
if (toggle && drawer) {
toggle.addEventListener('click', () => {
drawer.classList.toggle('open');
const open = drawer.classList.contains('open');
toggle.setAttribute('aria-expanded', open);
document.body.style.overflow = open ? 'hidden' : '';
});
drawer.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => {
drawer.classList.remove('open');
document.body.style.overflow = '';
});
});
}

// ── Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add('visible');
observer.unobserve(e.target);
}
});
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// -- Favicon: prefer the scalable SVG rr mark where supported
(function(){ if(document.querySelector('link[rel="icon"][type="image/svg+xml"]')) return; var l=document.createElement('link'); l.rel='icon'; l.type='image/svg+xml'; l.href='/favicon.svg'; document.head.appendChild(l); })();

// ── Footer: site-wide Privacy link (injected; footer markup is per-page)
(function(){
var copy = document.querySelector('footer .footer-copy');
if(!copy) return;
var isTH = (document.documentElement.lang || '').toLowerCase() === 'th' || /^\/th\//.test(location.pathname);
var href = isTH ? '/th/privacy' : '/privacy';
var label = isTH ? 'ความเป็นส่วนตัว' : 'Privacy';
if(copy.querySelector('a[href="' + href + '"]')) return;
var sep = document.createElement('span');
sep.textContent = '  ·  ';
sep.style.opacity = '0.6';
var a = document.createElement('a');
a.href = href;
a.textContent = label;
a.style.cssText = 'color:inherit;text-decoration:none;border-bottom:1px solid var(--rule);padding-bottom:1px;transition:border-color .2s;';
a.addEventListener('mouseenter', function(){ a.style.borderColor = 'var(--ink-faint)'; });
a.addEventListener('mouseleave', function(){ a.style.borderColor = 'var(--rule)'; });
copy.appendChild(sep);
copy.appendChild(a);
})();

// ── GA4 article read-tracking: section_view (>=5s dwell) + article_complete
(function(){
if(!/\/article-/.test(location.pathname)) return;
var body = document.querySelector('.article-body');
if(!body || typeof gtag !== 'function') return;
var heads = [].slice.call(body.querySelectorAll('h2'));
if(!heads.length) return;
var title = ((document.querySelector('.article-title') || {}).textContent || document.title || '').trim().slice(0,100);
var names = ['Intro'].concat(heads.map(function(h){ return (h.textContent || '').trim().replace(/\s+/g,' ').slice(0,100); }));
var dwell = names.map(function(){ return 0; });
var fired = names.map(function(){ return false; });
var THRESHOLD = 5000;
var completeFired = false;
var activeIdx = 0, lastTick = null, timer = null, running = false;
function sectionAt(){
var line = window.scrollY + window.innerHeight * 0.35;
var idx = 0;
for(var i=0;i<heads.length;i++){
var top = heads[i].getBoundingClientRect().top + window.scrollY;
if(top <= line) idx = i + 1; else break;
}
return idx;
}
function complete(){
if(completeFired) return;
completeFired = true;
gtag('event','article_complete',{ article_title: title });
}
function fire(i){
if(fired[i]) return;
fired[i] = true;
gtag('event','section_view',{ article_title: title, section_index: i, section_name: names[i], dwell: Math.round(dwell[i]/1000) });
if(i === names.length - 1) complete();
}
function tick(){
var now = Date.now();
if(lastTick !== null && document.visibilityState === 'visible' && document.hasFocus()){
var dt = now - lastTick;
if(dt > 0 && dt < 5000){
dwell[activeIdx] += dt;
if(dwell[activeIdx] >= THRESHOLD) fire(activeIdx);
}
}
lastTick = now;
}
function start(){ if(running) return; running = true; lastTick = Date.now(); activeIdx = sectionAt(); timer = setInterval(tick, 1000); }
function stop(){ running = false; if(timer){ clearInterval(timer); timer = null; } lastTick = null; }
window.addEventListener('scroll', function(){ activeIdx = sectionAt(); }, { passive:true });
document.addEventListener('visibilitychange', function(){ lastTick = Date.now(); });
new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting) start(); else stop(); }); }, { threshold: 0 }).observe(body);
var endMark = document.querySelector('.article-share') || document.querySelector('.article-crosslink');
if(endMark){ new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting) complete(); }); }, { threshold: 0 }).observe(endMark); }
})();
 (function(){var form=document.getElementById('enquiry-form');if(!form)return;var intro=document.getElementById('ef-intro'),confirm=document.getElementById('ef-confirm'),statusEl=document.getElementById('ef-status'),btn=form.querySelector('.form-submit');var langOf=function(){var r=form.querySelector('input[name="language"]:checked');return r?r.value:'';};var started=false;form.addEventListener('focusin',function(){if(started)return;started=true;if(typeof gtag==='function')gtag('event','connect_enquiry_start',{language:langOf()});});form.addEventListener('submit',function(e){e.preventDefault();if(!form.reportValidity())return;var lang=langOf(),label=btn.textContent;btn.disabled=true;btn.textContent=form.dataset.sending||'Sending…';if(statusEl)statusEl.hidden=true;fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)}).then(function(res){return res.json().catch(function(){return{};}).then(function(data){if(!res.ok||!data.success)throw new Error(data.message||'submit failed');if(typeof gtag==='function')gtag('event','connect_enquiry_submit',{method:'connect_form',language:lang});form.hidden=true;if(intro)intro.hidden=true;if(confirm)confirm.hidden=false;});}).catch(function(){btn.disabled=false;btn.textContent=label;if(statusEl){statusEl.textContent=form.dataset.error||'Something went wrong — please email coach@rrealpath.com.';statusEl.hidden=false;}});});})();
});
