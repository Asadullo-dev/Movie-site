const API = "http://localhost:3000/movies";

// kinolar shu yerda turadi
let movies = [];

// yoqtirgan kinolarning id lari (matn ko'rinishida saqlanadi)
let likes = [];

// hammasini ko'rish tugmasi uchun
let popularAll = false;
let allAll = false;

// hls.js obyekti (m3u8 uchun), kerak bo'lganda yaratiladi
let hls = null;

// html dagi elementlar
let search = document.getElementById("search");
let popularBox = document.getElementById("popularBox");
let allBox = document.getElementById("allBox");
let btnPopular = document.getElementById("btnPopular");
let btnAll = document.getElementById("btnAll");

// AOS ni ishga tushirish
AOS.init();

// serverdan kinolarni olish
fetch(API, { cache: "no-store" })
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    movies = data;
    showMovies();
  })
  .catch(function () {
    allBox.innerHTML = "<p>Serverdan ma'lumot olib bo'lmadi. json-server ishlayotganini tekshiring.</p>";
  });

// id turi (raqam yoki matn) farq qilmasligi uchun hammasini matnga aylantiramiz
function isLiked(id) {
  return likes.includes(String(id));
}

// bitta kino kartasini yasash
// id matn bo'lishi mumkin, shuning uchun qo'shtirnoq ichida yoziladi
function makeCard(movie) {
  let heart = isLiked(movie.id) ? "❤️" : "🤍";

  return `
    <div class="card" data-aos="fade-up">
      <img src="${movie.img}" alt="${movie.title}" onclick="watchMovie('${movie.id}')">
      <button class="like" onclick="likeMovie('${movie.id}')">${heart}</button>
      <h3>${movie.title}</h3>
      <p>${movie.year} | ${movie.genre}</p>
      <p>⭐ ${movie.rating}</p>
      <button class="watch-btn" onclick="watchMovie('${movie.id}')">▶ Ko'rish</button>
    </div>
  `;
}

// ro'yxatni ekranga chiqarish
function drawList(list, box, seeAll) {
  box.innerHTML = "";

  // hammasini ko'rish bosilmasa faqat 4 ta chiqadi
  let count = list.length;
  if (seeAll == false && count > 4) {
    count = 4;
  }

  for (let i = 0; i < count; i++) {
    box.innerHTML += makeCard(list[i]);
  }

  if (list.length == 0) {
    box.innerHTML = "<p>Kino topilmadi</p>";
  }
}

// hamma narsani ekranga chiqarish
function showMovies() {
  let text = search.value.toLowerCase();

  // qidiruv: nomida yozilgan so'z bor kinolar
  let found = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title.toLowerCase().includes(text)) {
      found.push(movies[i]);
    }
  }

  // mashhur: reyting 8 dan katta yoki teng
  let popular = [];
  for (let i = 0; i < found.length; i++) {
    if (found[i].rating >= 8) {
      popular.push(found[i]);
    }
  }

  drawList(popular, popularBox, popularAll);
  drawList(found, allBox, allAll);

  // tugma yozuvlari
  if (popularAll) {
    btnPopular.textContent = "Yopish";
  } else {
    btnPopular.textContent = "Hammasini ko'rish";
  }

  if (allAll) {
    btnAll.textContent = "Yopish";
  } else {
    btnAll.textContent = "Hammasini ko'rish";
  }

  // yangi chiqqan kartalarga effekt berish
  AOS.refreshHard();
}

// Hammasini ko'rish (mashhur)
function seeAllPopular() {
  popularAll = !popularAll;
  showMovies();
}

// Hammasini ko'rish (barcha)
function seeAllMovies() {
  allAll = !allAll;
  showMovies();
}

// Like bosish: faqat yurak o'zgaradi, kino o'z joyida qoladi
function likeMovie(id) {
  let key = String(id);

  if (isLiked(key)) {
    likes.splice(likes.indexOf(key), 1);
  } else {
    likes.push(key);
  }

  showMovies();
}

// Search: har harf yozilganda ishlaydi
search.addEventListener("input", showMovies);

// YouTube linkidan video id ni ajratib olish
function getYoutubeId(url) {
  let match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

// video havolasi turini aniqlash
function getVideoType(url) {
  if (getYoutubeId(url)) return "youtube";
  if (/\.m3u8(\?|$)/i.test(url)) return "hls";
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return "file";
  return "iframe";
}

// ikkala pleyerni to'xtatib, tozalash
function stopPlayers() {
  let player = document.getElementById("player");
  let yt = document.getElementById("ytPlayer");

  if (hls) {
    hls.destroy();
    hls = null;
  }

  player.pause();
  player.removeAttribute("src");
  player.load();
  player.style.display = "none";

  yt.removeAttribute("src");
  yt.style.display = "none";
}

// Kinoni ko'rish (oyna ochiladi)
function watchMovie(id) {
  let player = document.getElementById("player");
  let yt = document.getElementById("ytPlayer");

  let movie = movies.find(m => String(m.id) === String(id));
  if (!movie) return;

  let link = movie.video || "https://www.w3schools.com/html/mov_bbb.mp4";
  let type = getVideoType(link);

  stopPlayers();

  if (type === "youtube") {
    yt.src = "https://www.youtube.com/embed/" + getYoutubeId(link) + "?autoplay=1";
    yt.style.display = "block";
  } else if (type === "iframe") {
    // boshqa sayt iframe ga ruxsat bermasa, yangi oynada ochamiz
    window.open(link, "_blank");
    return;
  } else {
    player.style.display = "block";

    if (type === "hls" && window.Hls && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(link);
      hls.attachMedia(player);
    } else {
      // .mp4 yoki Safari da m3u8
      player.src = link;
    }
    player.play();
  }

  document.getElementById("movieTitle").textContent = movie.title;
  document.getElementById("movieInfo").textContent =
    movie.year + " | " + movie.genre + " | ⭐ " + movie.rating;

  document.getElementById("modal").style.display = "flex";
}

// Oynani yopish
function closeMovie() {
  stopPlayers();
  document.getElementById("modal").style.display = "none";
}

// qora joyga bosilsa ham yopiladi
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target.id == "modal") {
    closeMovie();
  }
});