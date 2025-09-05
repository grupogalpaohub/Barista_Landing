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
})();

