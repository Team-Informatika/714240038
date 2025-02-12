import {renderHTML,onClick,setInner} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

renderHTML('content', 'content/home.html');
onClick("github",myGithub);
function myGithub() {
    window.open('https://github.com/nawal886', 'blank');
}
onClick("whatsapp",mywhatsapp);
function mywhatsapp() {
    window.open('https://whatsapp.com/62895350871030', 'blank');
}
onClick("instagram",myinstagram);
function myinstagram() {
    window.open('https://instagram.com/harom_ein', 'blank');
} 
setInner("tex", "kontak saya:")

import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render halaman
renderHTML("pengganti dirinya", "home.html");

// Ambil data dari JSON
getJSON("https://t.if.co.id/json/nawal.json", null, null, responseFunction);

// Fungsi untuk mengambil JSON dari URL
async function getJSON(url, _, __, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Gagal mengambil data JSON:", error);
  }
}

// Fungsi untuk menangani data dari JSON
function responseFunction(response) {
  const data = response.data.card;

  // Render avatar dengan event untuk modal
  document.getElementById("avatar").innerHTML = `
    <img src="${data.avatar.src}" alt="${data.avatar.alt}" onclick="openModal('${data.avatar.src}')">
  `;

  // Render nama & occupation
  document.getElementById("nama").textContent = data.details.name;
  document.getElementById("occupation").textContent = data.details.occupation;

  // Render quote
  document.getElementById("quote").textContent = `"${data.details.skills.description || "No quote available"}"`;

  // Render about
  document.getElementById("about").innerHTML = data.details.about
    .map(item => `<p>${item.value}</p>`)
    .join("");

  // Render skills
  document.getElementById("skills").innerHTML = data.details.skills.list
    .map(skill => `<li>${skill}</li>`)
    .join("");

  // Render hourly rate
  document.getElementById("harga").textContent = data.details.rate_day.price;
  document.getElementById("rate").textContent = data.details.rate_day.rate;

  // Render social links
  document.getElementById("social-links").innerHTML = data.details.social_links
    .map(link => `<a href="${link.url}" target="_blank">${link.platform}</a>`)
    .join(" | ");
}

// Fungsi untuk membuka modal gambar
function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = src;
  modal.classList.add("active");

  // Tutup modal saat klik di luar gambar
  modal.onclick = (event) =>
