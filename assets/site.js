"use strict";

(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("is-visible");
      }
    });

    var revealReady = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
      if (!revealReady) {
        document.documentElement.classList.add("reveal-ready");
        revealReady = true;
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-language-select]").forEach(function (select) {
    select.addEventListener("change", function () {
      if (select.value) window.location.assign(select.value);
    });
  });

  document.querySelectorAll(".carousel-control").forEach(function (button) {
    button.addEventListener("click", function () {
      var track = document.querySelector("[data-carousel]");
      if (!track) return;
      var direction = Number(button.getAttribute("data-direction")) || 1;
      track.scrollBy({
        left: direction * Math.max(220, track.clientWidth * 0.72),
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  });
}());
