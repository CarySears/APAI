(function(){
  function ensureStylesheet(href){
    if(document.querySelector('link[href="'+href+'"]')) return;
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.href=href;
    document.head.appendChild(link);
  }

  function loadHTML(selector, file, callback){
    var el = document.querySelector(selector);
    if(!el) return;
    fetch(file)
      .then(function(r){ return r.text(); })
      .then(function(html){
        el.innerHTML = html;
        if(callback) callback();
      });
  }

  loadHTML('#nav-placeholder', '/nav.html', function(){
    var nav = document.getElementById('nav');
    if(!nav) return;

    // Mobile toggle
    var mobBtn = document.getElementById('navMobBtn');
    var menu = document.getElementById('navMenu');
    if(mobBtn && menu){
      mobBtn.addEventListener('click', function(e){
        e.stopPropagation();
        var isOpen = menu.classList.toggle('mob-open');
        mobBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      });

      // Close mobile menu when a nav link is clicked
      menu.querySelectorAll('a.nav-link').forEach(function(link){
        link.addEventListener('click', function(){
          menu.classList.remove('mob-open');
          mobBtn.setAttribute('aria-expanded', 'false');
          mobBtn.setAttribute('aria-label', 'Open navigation menu');
        });
      });
    }
  });

  ensureStylesheet('/footer.css');
  if(!document.querySelector('footer')){
    loadHTML('#footer-placeholder', '/footer.html');
  }

  window.addEventListener('load', function(){
    if(document.querySelector('script[data-widget-id="692e35e1885ff875a3542ddb"]')) return;
    var chat=document.createElement('script');
    chat.src='https://beta.leadconnectorhq.com/loader.js';
    chat.setAttribute('data-resources-url','https://beta.leadconnectorhq.com/chat-widget/loader.js');
    chat.setAttribute('data-widget-id','692e35e1885ff875a3542ddb');
    document.body.appendChild(chat);
  });
})();
