console.log("Home frontend JS (simplified & working)");

// Sphere element
const sphereEl = document.querySelector(".sphere-animation");
if (sphereEl) {
  const spherePaths = sphereEl.querySelectorAll("path");

  // Intro line-drawing
  anime({
    targets: spherePaths,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 2000,
    delay: anime.stagger(100),
    easing: "easeInOutSine",
  });

  // Breathing animation
  spherePaths.forEach((path, i) => {
    anime({
      targets: path,
      translateX: [0, 3, -3, 0],
      translateY: [0, 3, -3, 0],
      easing: "easeInOutSine",
      duration: 4000 + i * 50,
      loop: true,
      direction: "alternate",
    });
  });

  // Gradient shadow animation
  const gradient = document.querySelector("#sphereGradient");
  if (gradient) {
    anime({
      targets: gradient,
      x1: ["0%", "25%", "0%"],
      x2: ["25%", "50%", "25%"],
      y1: ["0%", "15%", "0%"],
      y2: ["15%", "30%", "15%"],
      duration: 30000,
      loop: true,
      easing: "linear",
    });
  }
}
