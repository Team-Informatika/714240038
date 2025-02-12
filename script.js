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

function responseFunction(response) {
    const data = response.data.card;

    document.addEventListener("DOMContentLoaded", function () {
        // Render avatar dengan event untuk modal
        const avatarHTML = `<img src="${data.card.avatar.src}" alt="${data.card.avatar.alt}" onclick="openModal('${data.card.avatar.src}')">`;
        document.getElementById("avatar").innerHTML = avatarHTML;
      
        // Render nama
        document.getElementById("nama").textContent = data.card.details.name;
      
        // Render occupation
        document.getElementById("occupation").textContent = data.card.details.occupation;
      
        // Render quote
        const quote = data.card.details.skills.description || "No quote available";
        document.getElementById("quote").textContent = `"${quote}"`;
      
        // Render about
        const aboutHTML = data.card.details.about
          .map((item) => `<p>${item.value}</p>`)
          .join("");
        document.getElementById("about").innerHTML = aboutHTML;
      
        // Render skills
        const skillsHTML = data.card.details.skills.list
          .map((skill) => `<li>${skill}</li>`)
          .join("");
        document.getElementById("skills").innerHTML = skillsHTML;
      
        // Render hourly rate
        document.getElementById("harga").textContent = data.card.details.rate_day.price;
        document.getElementById("rate").textContent = data.card.details.rate_day.rate;
      
        // Render social links
        const socialLinksHTML = data.card.details.social_links
          .map(
            (link) =>
              `<a href="${link.url}" target="_blank"><i class="${link.icon}"></i> ${link.platform}</a>`
          )
          .join(" | ");
        document.getElementById("social-links").innerHTML = socialLinksHTML;
      });
      
      // Fungsi untuk membuka modal
      function openModal(src) {
        const modal = document.getElementById("modal");
        const modalImage = document.getElementById("modalImage");
      
        modalImage.src = src;
        modal.classList.add("active");
      
        // Tutup modal saat pengguna mengklik di luar gambar
        modal.addEventListener("click", () => {
          modal.classList.remove("active");
          modalImage.src = ""; // Kosongkan src untuk menghindari cache
        });
      }
      