(function(){
  'use strict';
  // Ticker auto-scroll
  const ticker = document.querySelector('.ticker');
  if (ticker){
    let x = 0; const speed = 0.4;
    const step = ()=>{ x -= speed; ticker.style.transform = `translateX(${x}px)`; requestAnimationFrame(step); };
    step();
  }
  // Spots countdown demo (can wire to real inventory)
  const spotsEl = document.getElementById('spots');
  if (spotsEl){
    let spots = 4;
    setInterval(()=>{ if (spots>1) { spots--; spotsEl.textContent = String(spots); } }, 18000);
  }
})();

