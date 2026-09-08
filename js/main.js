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

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el)); (function(){var form=document.getElementById('enquiry-form');if(!form)return;var intro=document.getElementById('ef-intro'),confirm=document.getElementById('ef-confirm'),statusEl=document.getElementById('ef-status'),btn=form.querySelector('.form-submit');var langOf=function(){var r=form.querySelector('input[name="language"]:checked');return r?r.value:'';};var started=false;form.addEventListener('focusin',function(){if(started)return;started=true;if(typeof gtag==='function')gtag('event','connect_enquiry_start',{language:langOf()});});form.addEventListener('submit',function(e){e.preventDefault();if(!form.reportValidity())return;var lang=langOf(),label=btn.textContent;btn.disabled=true;btn.textContent=form.dataset.sending||'Sending…';if(statusEl)statusEl.hidden=true;fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)}).then(function(res){return res.json().catch(function(){return{};}).then(function(data){if(!res.ok||!data.success)throw new Error(data.message||'submit failed');if(typeof gtag==='function')gtag('event','connect_enquiry_submit',{method:'connect_form',language:lang});form.hidden=true;if(intro)intro.hidden=true;if(confirm)confirm.hidden=false;});}).catch(function(){btn.disabled=false;btn.textContent=label;if(statusEl){statusEl.textContent=form.dataset.error||'Something went wrong — please email coach@rrealpath.com.';statusEl.hidden=false;}});});})();
});
