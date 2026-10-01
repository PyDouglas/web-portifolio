const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("done"), 1750));

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("show"), index * 45);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
window.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+"px"; cursor.style.top=my+"px"; });
function cursorLoop(){
  rx += (mx-rx)*.14; ry += (my-ry)*.14;
  ring.style.left=rx+"px"; ring.style.top=ry+"px";
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a,.magnetic-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>ring.classList.add("big"));
  el.addEventListener("mouseleave",()=>{ring.classList.remove("big"); el.style.transform="";});
});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove", e=>{
    const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.12}px,${y*.12}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="");
});

document.querySelectorAll(".magnetic-card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const r=card.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
    const rx=((y/r.height)-.5)*-7, ry=((x/r.width)-.5)*7;
    card.style.transform=`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});

const footer = document.querySelector("footer");

function updateFooter() {
  const scrollBottom = window.scrollY + window.innerHeight;
  const pageBottom = document.documentElement.scrollHeight;
  const nearBottom = scrollBottom >= pageBottom - 80;

  footer.classList.toggle("footer-visible", nearBottom);
}

window.addEventListener("scroll", () => {
  const y = scrollY;
  document.querySelector(".hero-content").style.transform = `translateY(${y*.12}px)`;
  document.querySelector(".hero-grid").style.transform = `perspective(500px) rotateX(55deg) scale(1.5) translateY(${y*.05}px)`;
  updateFooter();
}, { passive: true });

window.addEventListener("resize", updateFooter);
updateFooter();
