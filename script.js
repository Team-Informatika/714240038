import { renderHTML, onClick, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";

// Render halaman home.html
renderHTML("pengganti dirinya", "home.html");

// Tunggu hingga elemen dalam home.html termuat sebelum menjalankan script utama
const checkInterval = setInterval(() => {
    const modal = document.getElementById("modal");
    const githubBtn = document.getElementById("github");
    const whatsappBtn = document.getElementById("whatsapp");
    const instagramBtn = document.getElementById("instagram");

    if (modal && githubBtn && whatsappBtn && instagramBtn) {
        clearInterval(checkInterval); // Hentikan pengecekan setelah elemen ditemukan
        init(); // Jalankan fungsi inisialisasi
    }
}, 100); // Periksa setiap 100ms

// Fungsi inisialisasi setelah home.html termuat
function init() {
    // Ambil data dari JSON
    getJSON("https://t.if.co.id/json/nawal.json", null, null, responseFunction);

    // Event listener modal
    document.getElementById("modal").addEventListener("click", function (event) {
        if (event.target === this) {
            this.classList.remove("active");
        }
    });

    // Event listeners untuk tombol sosial media
    onClick("github", () => window.open('https://github.com/nawal886', '_blank'));
    onClick("whatsapp", () => window.open('https://wa.me/62895350871030', '_blank'));
    onClick("instagram", () => window.open('https://instagram.com/harom_ein', '_blank'));

    setInner("tex", "Kontak saya:");
}

// Fungsi untuk menangani data dari JSON
function responseFunction(response) {
    const data = response.card;

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
        .map(link => `<a href="${link.url}" target="_blank"><i class="${link.icon}"></i> ${link.platform}</a>`)
        .join(" | ");
}

// Fungsi untuk membuka modal gambar
window.openModal = function (src) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    if (modal && modalImage) {
        modalImage.src = src;
        modal.classList.add("active");
    }
};
