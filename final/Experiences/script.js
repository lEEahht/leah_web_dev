var progress = 0;
var targetProgress = 0;
var touchStartY = 0;

var timelineLine = document.getElementById('timelineLine');
var scrollHint = document.getElementById('scrollHint');
var heroText = document.querySelector('.hero-text');
var cards = document.querySelectorAll('.experience-card');

var SCROLL_SPEED = 0.0012;
var TOUCH_SPEED = 0.003;

var LINE_START = 4;
var LINE_END = 85;
var HERO_END = 0.30;

for (var i = 0; i < cards.length; i++) {
  cards[i]._threshold = parseFloat(cards[i].dataset.threshold) || 0;
}
//mobile js capabilities

function isMobile() {
  return window.innerWidth <= 768;
}


function initMobile() {
  // page must scroll normally override the fixed layout
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';

 
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.15 });

  for (var i = 0; i < cards.length; i++) {
    observer.observe(cards[i]);
  }
}

//desktop stuff
function initDesktop() {
  window.addEventListener('wheel', function(e) {
    e.preventDefault();
    var delta = (e.deltaY || e.deltaX) * SCROLL_SPEED;//change in x when you scroll horizontal and the y grows verticlaly woth the expereinece 
    targetProgress = targetProgress + delta;
    if (targetProgress < 0) targetProgress = 0;
    if (targetProgress > 1) targetProgress = 1;
  }, { passive: false });

  window.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener('touchmove', function(e) {
    var dy = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    targetProgress += dy * TOUCH_SPEED;
    if (targetProgress < 0) targetProgress = 0;
    if (targetProgress > 1) targetProgress = 1;
  });

  window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetProgress += 0.08;
      if (targetProgress > 1) targetProgress = 1;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetProgress -= 0.08;
      if (targetProgress < 0) targetProgress = 0;
    }
  });

  animate();
}

//desktop animation loop
function animate() {
  progress += (targetProgress - progress) * 0.07;
  if (Math.abs(targetProgress - progress) < 0.0001) {
    progress = targetProgress;
  }

  //hero text sliding out
  var heroT = progress / HERO_END;
  if (heroT > 1) heroT = 1;
  var heroX = heroT * heroT * -120;
  var heroOpacity = 1 - (progress / 0.18);
  if (heroOpacity < 0) heroOpacity = 0;
  if (heroOpacity > 1) heroOpacity = 1;

  if (heroText) {
    heroText.style.transform = 'translateX(' + heroX + 'vw)';
    heroText.style.opacity = heroOpacity;
  }

  //line grows
  var lineWidth = LINE_START + progress * (LINE_END - LINE_START);
  timelineLine.style.width = lineWidth + '%';

  //scroll hint
  if (progress > 0.04) {
    scrollHint.classList.add('hidden');
  } else {
    scrollHint.classList.remove('hidden');
  }

  //card reveals
  for (var i = 0; i < cards.length; i++) {
    if (progress >= cards[i]._threshold) {
      cards[i].classList.add('visible');
    } else {
      cards[i].classList.remove('visible');
    }
  }

  requestAnimationFrame(animate);
}


if (isMobile()) {
  initMobile();
} else {
  initDesktop();
}

// re-run on resize
window.addEventListener('resize', function() {
  window.location.reload();
});