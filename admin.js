const API = "http://localhost:3000/movies";

AOS.init();

let movies = [];
let editId = null;

let list = document.getElementById("list");

// ===== Login =====
function login() {
  let password = document.getElementById("password").value;

  if (password == "1234") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminBox").style.display = "block";
    loadMovies();
  } else {
    document.getElementById("error").textContent = "Parol xato!";
  }
}

// ===== Serverdan kinolarni olish =====
async function loadMovies() {
  let res = await fetch(API, { cache: "no-store" });
  movies = await res.json();
  showList();
}

// ===== Ro'yxatni chiqarish =====
function showList() {
  list.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    list.innerHTML += `
      <div class="movie-row">
        <img src="${movies[i].img}">
        <span>${movies[i].title} (${movies[i].year})</span>
        <div>
          <button class="edit-btn" onclick="editMovie(${movies[i].id})">Tahrirlash</button>
          <button onclick="deleteMovie(${movies[i].id})">O'chirish</button>
        </div>
      </div>
    `;
  }
}

// ===== Formadan ma'lumot olish =====
function getForm() {
  return {
    title: document.getElementById("title").value,
    year: +document.getElementById("year").value,
    genre: document.getElementById("genre").value,
    rating: +document.getElementById("rating").value,
    img: document.getElementById("img").value,
    video: document.getElementById("video").value
  };
}

// ===== Qo'shish yoki saqlash =====
async function saveMovie() {
  let movie = getForm();

  if (editId === null) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    });
    alert("Yangi kino qo'shildi ✅");
  } else {
    movie.id = editId;
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    });
    alert("Kino saqlandi ✅");
  }

  clearForm();
  loadMovies();
}

// ===== Tahrirlash uchun formani to'ldirish =====
function editMovie(id) {
  let movie = movies.find(m => m.id == id);
  if (!movie) return;

  document.getElementById("title").value = movie.title;
  document.getElementById("year").value = movie.year;
  document.getElementById("genre").value = movie.genre;
  document.getElementById("rating").value = movie.rating;
  document.getElementById("img").value = movie.img;
  document.getElementById("video").value = movie.video || "";

  editId = movie.id;
  document.getElementById("formTitle").textContent = "Kinoni tahrirlash";
  document.getElementById("saveBtn").textContent = "Saqlash";
  document.getElementById("cancelBtn").style.display = "inline-block";
}

// ===== O'chirish =====
async function deleteMovie(id) {
  if (!confirm("Kinoni o'chirasizmi?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadMovies();
}

// ===== Formani tozalash =====
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("year").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("img").value = "";
  document.getElementById("video").value = "";

  editId = null;
  document.getElementById("formTitle").textContent = "Yangi kino qo'shish";
  document.getElementById("saveBtn").textContent = "Qo'shish";
  document.getElementById("cancelBtn").style.display = "none";
}

// ===== Qayta yuklash tugmasi =====
function resetMovies() {
  loadMovies();
}