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

    // Mega menu toggles
    document.querySelectorAll('.nav-item.has-mega .nav-link').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var item = btn.closest('.nav-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.nav-item.has-mega').forEach(function(i){ i.classList.remove('open'); });
        if(!isOpen) item.classList.add('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function(){
      document.querySelectorAll('.nav-item.has-mega').forEach(function(i){ i.classList.remove('open'); });
    });

    // Mobile toggle
    var mobBtn = document.getElementById('navMobBtn');
    var menu = document.querySelector('.nav-menu');
    if(mobBtn && menu){
      mobBtn.addEventListener('click', function(e){
        e.stopPropagation();
        menu.classList.toggle('mob-open');
      });
    }
  });

  loadHTML('#footer-placeholder', '/footer.html');
})();
