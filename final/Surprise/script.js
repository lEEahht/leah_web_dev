// animate the hero title letters
function animateLetters(elementId) {
  var element = document.getElementById(elementId);
  var text = element.innerText;
  element.innerHTML = "";

  for (var i = 0; i < text.length; i++) {
    var span = document.createElement("span");
    span.className = "letter";
    if (text[i] === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.innerText = text[i];
    }
    element.appendChild(span);
  }

  // add show class one by one with delay
  var letters = element.querySelectorAll(".letter");
  for (var j = 0; j < letters.length; j++) {
    // had to use a closure here or j would be wrong value
    (function(index) {
      setTimeout(function() {
        letters[index].classList.add("show");
      }, index * 60);
    })(j);
  }
}

// run letter animation on page load
window.onload = function() {
  animateLetters("heroTitle");
}

// scroll fade in
// got this from a youtube tutorial
var fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", function() {
  for (var i = 0; i < fadeElements.length; i++) {
    var element = fadeElements[i];
    var position = element.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (position < windowHeight - 80) {
      element.classList.add("visible");
    }
  }
});

// hero video click to play/pause
var heroVideo = document.getElementById("heroVideo");

heroVideo.addEventListener("click", function() {
  if (heroVideo.paused) {
    heroVideo.play();
  } else {
    heroVideo.pause();
  }
});

// film video
var filmVideo = document.getElementById("filmVideo");

filmVideo.addEventListener("click", function() {
  if (filmVideo.paused) {
    filmVideo.play();
   
  } else {
    filmVideo.pause();
   
  }
});

// music player
var audio = document.getElementById("audio");
var playBtn = document.getElementById("playBtn");
var progress = document.querySelector(".progress");

playBtn.addEventListener("click", function() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "❚❚";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", function() {
  if (!audio.duration) return;
  var percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

audio.addEventListener("ended", function() {
  playBtn.textContent = "▶";
  progress.style.width = "0%";
});