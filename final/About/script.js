

gsap.registerPlugin(ScrollTrigger);

// animates each letter of the big hero text when page loads
function initHeroSplit() {
  var chars = document.querySelectorAll('.hero-big .split-char');

  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 70,
      scaleY: 1.3,
      transformOrigin: 'bottom center',
    },
    {
      opacity: 1,
      y: 0,
      scaleY: 1,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.04,
      delay: 0.4,
    }
  );
}

// scroll animation for the section headings (ABOUT ME, MY MISSION blah bal blah )
// letters kind of squish in as you scroll down to them
// pass in the element id and it sets up the scrolltrigger for it
function initScrollFloat(id) {
  var el = document.getElementById(id);
  if (!el) return;

  var chars = el.querySelectorAll('.char');

  gsap.fromTo(
    chars,
    {
      willChange: 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%',
    },
    {
      duration: 1,
      ease: 'back.inOut(2)',
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: 0.03,
      scrollTrigger: {
        trigger: el,
        start: 'center bottom+=50%',
        end: 'bottom bottom-=40%',
        scrub: true,
      },
    }
  );
}

window.addEventListener('DOMContentLoaded', function() {
  initHeroSplit();
  initScrollFloat('sfAbout');
  initScrollFloat('sfMission');
});