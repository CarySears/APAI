(function(){
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

    // Scroll behavior
    window.addEventListener('scroll', function(){
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

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

  loadHTML('#footer-placeholder', '/footer.html');
})();
