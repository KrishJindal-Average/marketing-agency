/* =====================================================
   EDIT CONTACT DETAILS HERE
   ===================================================== */
const BRAND = "Your Agency";
const CONTACT = {
  email: "patelabhay2550@gmail.com",
  phone: "7247294002",
  whatsapp: "917247294002",          // country code + number, no + or spaces
  //instagram: "youragency",           // handle without @
  address: "Sagar, Madhya pradesh",
  //hours: "Any time free for you "
};

/* =====================================================
   VIDEO SLOTS: 14 vertical videos (9:16)
   Change src (video file) and poster (cover image) for each reel.
   Put files in /videos and /posters. Missing files show a placeholder.
   ===================================================== */
const VIDEOS = [
  /* VIDEO SLOT 1  */ { src: "video_1.mp4", poster: "posters/reel-1.jpg" },
  /* VIDEO SLOT 2  */ { src: "video_2.MP4", poster: "posters/reel-2.jpg" },
  /* VIDEO SLOT 3  */ { src: "video_3.mp4", poster: "posters/reel-3.jpg" },
  /* VIDEO SLOT 4  */ { src: "video_4.mp4", poster: "posters/reel-4.jpg" },
  /* VIDEO SLOT 5  */ { src: "video_5.mp4", poster: "posters/reel-5.jpg" },
  /* VIDEO SLOT 6  */ { src: "video_6.mp4", poster: "posters/reel-6.jpg" },
  /* VIDEO SLOT 7  */ { src: "video_7.mp4", poster: "posters/reel-7.jpg" },
  /* VIDEO SLOT 8  */ { src: "video_8.mp4", poster: "posters/reel-8.jpg" },
  /* VIDEO SLOT 9  */ { src: "video_9.mp4", poster: "posters/reel-9.jpg" },
  /* VIDEO SLOT 10 */ { src: "video_10.mp4", poster: "posters/reel-10.jpg" },
  /* VIDEO SLOT 11 */ { src: "video_11.mp4", poster: "posters/reel-11.jpg" },
  /* VIDEO SLOT 12 */ { src: "video_12.mp4", poster: "posters/reel-12.jpg" },
  /* VIDEO SLOT 13 */ { src: "video_13.mp4", poster: "posters/reel-13.jpg" },
  /* VIDEO SLOT 14 */ { src: "video_14.mp4", poster: "posters/reel-14.jpg" }
];
/* =====================================================
   POSTER SLOTS: 6 images (3:4). Change the image path.
   ===================================================== */
const POSTERS = [
  /* POSTER SLOT 1 */ "images/poster-1.jpg",
  /* POSTER SLOT 2 */ "images/poster-2.jpg",
  /* POSTER SLOT 3 */ "images/poster-3.jpg",
  /* POSTER SLOT 4 */ "images/poster-4.jpg",
  /* POSTER SLOT 5 */ "images/poster-5.jpg",
  /* POSTER SLOT 6 */ "images/poster-6.jpg"
];

/* ===== TEXT LISTS: edit services and process steps ===== */
const SERVICES = [
  ["Concept and scripting", "Ideas and scripts built around what your audience actually watches."],
  ["Shooting", "Our crew comes to you, with lighting, audio and direction."],
  ["Editing", "Reels cut for retention, with captions, sound and pacing."],
  ["Posters and creatives", "Static posts and carousels that match your brand."],
  ["Instagram management", "We post, reply and keep your page active every week."],
  ["Growth and reports", "Monthly numbers in plain language, with next steps."]
];
const STEPS = [
  ["Shoot", "We plan the day and film it."], ["Edit", "Cuts, captions, color, sound."],
  ["Post", "Scheduled at your best times."], ["Grow", "We review results and adjust."]
];

/* ===== BUILD PAGE CONTENT FROM THE LISTS ABOVE ===== */
const $ = id => document.getElementById(id);
document.title = BRAND + " | From shoot to feed";
document.querySelectorAll("[data-brand]").forEach(e => e.textContent = BRAND);
$("svc").innerHTML = SERVICES.map(s => `<div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("");
$("steps").innerHTML = STEPS.map(s => `<div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("");
$("cl").innerHTML = [
  CONTACT.email && `<li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>`,
  CONTACT.phone && `<li><a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></li>`,
  CONTACT.instagram && `<li><a href="https://instagram.com/${CONTACT.instagram}" target="_blank" rel="noopener">@${CONTACT.instagram}</a></li>`,
  CONTACT.address && `<li>${CONTACT.address}</li>`,
  CONTACT.hours && `<li>${CONTACT.hours}</li>`
].filter(Boolean).join("");
CONTACT.whatsapp ? $("cta").href = "https://wa.me/" + CONTACT.whatsapp : $("cta").remove();
$("copy").textContent = "© " + new Date().getFullYear() + " " + BRAND;

/* ===== CAMERA SCENE: build cards in a depth line ===== */
const world = $("world"), cards = [];
const order = []; let pi = 0;
VIDEOS.forEach((v, i) => { order.push({ t: "v", d: v }); if (i % 2 === 1 && pi < POSTERS.length) order.push({ t: "p", d: POSTERS[pi++] }); });
while (pi < POSTERS.length) order.push({ t: "p", d: POSTERS[pi++] });
order.forEach((o, i) => {
  const el = document.createElement("div");
  el.className = "card " + o.t;
  el.innerHTML = '<div class="ph">' + (o.t === "v" ? "Reel " : "Poster ") + (o.t === "v" ? VIDEOS.indexOf(o.d) + 1 : POSTERS.indexOf(o.d) + 1) + '</div>';
  let m;
  if (o.t === "v") {
    m = document.createElement("video");
    m.src = o.d.src; m.poster = o.d.poster; m.muted = m.loop = m.playsInline = true; m.preload = "metadata";
  } else { m = document.createElement("img"); m.src = o.d; m.alt = "Poster " + (i + 1); m.loading = "lazy"; }
  m.addEventListener("error", () => m.remove());
  el.appendChild(m); world.appendChild(el);
  el.tabIndex = 0; el.setAttribute("role", "button"); el.setAttribute("aria-label", o.t === "v" ? "Play reel" : "View poster");
  const go = () => { if (+el.style.opacity >= .5 || reduce) openLb(o); };
  el.addEventListener("click", go);
  el.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  cards.push({ el, m: o.t === "v" ? m : null, z: -i * 430, side: i % 2 ? 1 : -1, y: ((i * 37) % 5 - 2) * .07, on: false });
});
const total = cards.length * 430;

/* ===== REEL PLAYER: plays the tapped reel with sound ===== */
const lb = $("lb"), lv = $("lbv"), li = $("lbi"), lm = $("lbm");
function openLb(o) {
  lm.textContent = ""; lv.pause();
  if (o.t === "v") { li.hidden = true; lv.hidden = false; lv.src = o.d.src; lv.poster = o.d.poster; lv.muted = false; lv.play().catch(() => { }); }
  else { lv.hidden = true; li.hidden = false; li.src = o.d; }
  lb.classList.add("on"); if (lenis) lenis.stop(); $("lbx").focus();
}
function closeLb() { lb.classList.remove("on"); lv.pause(); lv.removeAttribute("src"); lv.load(); if (lenis) lenis.start(); }
lv.addEventListener("error", () => { lm.textContent = "Add this video file to play it here."; });
li.addEventListener("error", () => { lm.textContent = "Add this image file to view it here."; });
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
$("lbx").addEventListener("click", closeLb);
addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

/* ===== ANIMATION ===== */
gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
let lenis;
if (reduce) document.body.classList.add("reduce");
else {
  lenis = new Lenis(); lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
}

if (!reduce) {
  /* Hero dolly: the headline pushes past the camera */
  gsap.timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "+=80%", scrub: true, pin: true } })
    .to("#h1", { scale: 2.4, filter: "blur(16px)", opacity: 0, ease: "power2.in" }, 0)
    .to("#hero p", { opacity: 0, y: -30 }, 0)
    .to(".orb", { y: -120, ease: "none" }, 0);

  /* Service cards rise as you arrive */
  gsap.from(".grid div", { y: 60, opacity: 0, stagger: .1, scrollTrigger: { trigger: "#svc", start: "top 85%" } });
  gsap.from(".steps div", { y: 40, opacity: 0, stagger: .12, scrollTrigger: { trigger: "#steps", start: "top 85%" } });

  /* Camera scene: scroll = camera moves forward through the cards */
  const vw = () => innerWidth, vh = () => innerHeight;
  ScrollTrigger.create({
    trigger: "#stage", start: "top top", end: "+=" + (total * 1.1), pin: true, scrub: true,
    onUpdate: self => {
      const p = self.progress, cam = p * (total - 200);
      /* gentle camera sway and tilt */
      gsap.set(world, { rotationY: Math.sin(p * 6.28) * 4, rotationZ: Math.sin(p * 9) * 1.2 });
      cards.forEach(c => {
        const rel = c.z + cam;                       /* distance toward the viewer */
        const focus = Math.abs(rel - 150);           /* 0 = sharp */
        const op = rel < -1500 ? 0 : rel > 650 ? 0 : Math.min(1, (rel + 1500) / 700) * (rel > 400 ? (650 - rel) / 250 : 1);
        const blur = rel < 150 ? Math.min(6, focus / 260) : Math.min(14, focus / 45);
        const x = c.side * vw() * (vw() < 700 ? .16 : .24) * (1 + Math.max(0, rel) / 700);
        const y = c.y * vh();
        c.el.style.opacity = op.toFixed(3);
        c.el.style.filter = "blur(" + blur.toFixed(1) + "px)";
        c.el.style.transform = "translate(-50%,-50%) translate3d(" + x + "px," + y + "px," + rel + "px)";
        c.el.style.zIndex = Math.round(1000 + rel);
        if (c.m) { const near = op > .5; if (near !== c.on) { c.on = near; near ? c.m.play().catch(() => { }) : c.m.pause(); } }
      });
      /* shutter blades close at the end of the scene */
      const k = Math.max(0, (p - .93) / .07) * 50;
      $("bt").style.height = $("bb").style.height = k + "vh";
    }
  });
  /* ...and open again as the contact section arrives */
  ScrollTrigger.create({
    trigger: "#contact", start: "top bottom", end: "top top", scrub: true,
    onUpdate: s => { $("bt").style.height = $("bb").style.height = (1 - s.progress) * 50 + "vh"; }
  });
}

/* HUD readouts follow overall page progress */
const pad = n => String(n).padStart(2, "0");
ScrollTrigger.create({
  start: 0, end: "max", onUpdate: s => {
    const p = s.progress, t = p * 180, f = Math.floor((t % 1) * 24);
    $("tc").textContent = pad(Math.floor(t / 3600)) + ":" + pad(Math.floor(t / 60) % 60) + ":" + pad(Math.floor(t) % 60) + ":" + pad(f);
    $("iso").textContent = "ISO " + [100, 200, 400, 800, 1600][Math.min(4, Math.floor(p * 5))];
    $("fs").textContent = "f/" + (1.8 + p * 4).toFixed(1);
    $("sh").textContent = "1/" + [50, 100, 200, 500][Math.min(3, Math.floor(p * 4))];
  }
});
