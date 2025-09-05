(function(){
  'use strict';
  // Simple ticking accent on 25–30s to draw attention
  const timer = document.querySelector('.timer');
  if (timer){
    let on = false;
    setInterval(()=>{
      on = !on; timer.style.transform = on ? 'scale(1.04)' : 'scale(1)';
    }, 900);
  }

  // Steam puffs rising from bottom center
  const steam = document.querySelector('.steam');
  if (steam){
    const createPuff = () => {
      const el = document.createElement('div');
      el.className = 'puff';
      const dx = (Math.random() * 60 - 30) + 'px';
      const dur = (5 + Math.random() * 3).toFixed(2) + 's';
      el.style.setProperty('--dx', dx);
      el.style.setProperty('--dur', dur);
      steam.appendChild(el);
      el.addEventListener('animationend', ()=> el.remove(), { once: true });
    };
    // spawn cadence
    const loop = setInterval(()=>{
      createPuff();
      if (Math.random() > 0.65) createPuff();
    }, 850);
    // cleanup if page hides
    document.addEventListener('visibilitychange', ()=>{
      if (document.hidden) clearInterval(loop);
    });
  }
})();

