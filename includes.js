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
    var menu = document.querySelector('.nav-menu');
    if(mobBtn && menu){
      mobBtn.addEventListener('click', function(e){
        e.stopPropagation();
        var isOpen = menu.classList.toggle('mob-open');
        mobBtn.setAttribute('aria-expanded', String(isOpen));
      });

      menu.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', function(){
          menu.classList.remove('mob-open');
          mobBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });

  loadHTML('#footer-placeholder', '/footer.html');
})();
