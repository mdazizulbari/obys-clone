function locomotiveWithGsap() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function cursorAnimation() {
  // document.addEventListener("mousemove", function (detailes) {
  //   gsap.to("#cursor", {
  //     left: detailes.x,
  //     top: detailes.y,
  //   });
  // });
  Shery.makeMagnet("#navRight p");
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  var videoContainer = document.getElementById("videoContainer");
  var video = document.querySelector("#videoContainer video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (detailes) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#videoCursor", {
        left: detailes.x - 510,
        y: detailes.y,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#videoCursor", {
      left: "70%",
      y: "-15%",
      // this axis thing is really fucked up, if i give one value in y the other flag animaiton y gets overwritten, if I give both top, none work well... after al lot of trial, idk even how this one is working perfectly...
    });
  });
  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#videoCursor"
      ).innerHTML = `<i class="ri-pause-fill"></i>`;
      gsap.to("#videoCursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#videoCursor"
      ).innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to("#videoCursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
  document.addEventListener("mousemove", function (detailes) {
    gsap.to("#flag", {
      left: detailes.x,
      top: detailes.y,
    });
  });
  var heroText3 = document.querySelector("#heroText3 h2");
  heroText3.addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1,
    });
  });
  heroText3.addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0,
    });
  });
  var heroText3sec = document.querySelector("#heroText3sec");
  heroText3sec.addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1,
    });
  });
  heroText3sec.addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0,
    });
  });
}
function loaderAnimation() {
  // Sites code starts from here -------------------------------------------
  // loader section ------------------------------------------------------
  var tl = gsap.timeline();
  tl.from(".line h2", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      setInterval(() => {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 27);
    },
  });
  tl.to(".line h3", {
    animationName: "nowanimation",
    opacity: 1,
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2.5,
    // the time that the site takes to load orginal 2.5
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("nav", {
    opacity: 0,
  });
  tl.from("#hero", {
    delay: 0.2,
    y: 1200,
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });
  tl.from(
    "#heroText1 h1, #heroText2 h1, #heroText3 h2, #heroText3 h3, #heroText4 h1",
    {
      y: 140,
      stagger: 0.2,
    }
  );
  tl.from(
    "#heroText1, #videoSection",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}
function sheryImgAnimaiton() {
  Shery.imageEffect(".imgContainer", {
    style: 5,
    // debug: true,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: -0.5, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.6428341290530447 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4.53, range: [1, 15] },
      durationOut: { value: 2, range: [0.1, 5] },
      durationIn: { value: 2, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.08, range: [0, 10] },
      metaball: { value: 0.7, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.41, range: [0, 2] },
      noise_scale: { value: 6.87, range: [0, 100] },
    },
  });
}
function footerAnimation() {
  var footerText = document.querySelector("footer h2").textContent;
  var splitedText = footerText.split("");
  var clutter = "";
  splitedText.forEach(function (element) {
    clutter += `<span>${element}</span>`;
  });
  document.querySelector("footer h2").innerHTML = clutter;
// Initial setup for the animation
var tl = gsap.timeline({ paused: true });

// Animation to run on hover
tl.to("footer h2 span", {
  opacity: 0,
  stagger: 0.05,
  duration: 0.1,
});

tl.to("footer h2 span", {
  opacity: 1,
  fontFamily: "silk serif",
  // fontWeight: 400,
  color: "black",
  stagger: 0.05,
  duration: 0.1,
  // css: {
  //   "-webkit-text-stroke": "0.1rem white",
  // },
});

// Add hover event listeners
document.querySelector("footer h2").addEventListener("mouseenter", function() {
  tl.play();
});

document.querySelector("footer h2").addEventListener("mouseleave", function() {
  tl.reverse();
});

  
}

// function calls -------------------------------------------------------------------

cursorAnimation();
loaderAnimation();
sheryImgAnimaiton();
footerAnimation()
document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth > 600) {
    locomotiveWithGsap();
  }
});
