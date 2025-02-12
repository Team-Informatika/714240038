import { renderHTML, onClick, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";

async function loadPage() {
    try {
        // Pastikan elemen ID "penggantidirinya" ada di HTML sebelum render
        if (!document.getElementById("penggantidirinya")) {
            console.error("Elemen #penggantidirinya tidak ditemukan di HTML!");
            return;
        }

        // Render halaman home.html
        await renderHTML("penggantidirinya", "home.html"); // Menunggu hingga selesai

        // Ambil data JSON setelah home.html selesai dimuat
        getJSON("https://t.if.co.id/json/nawal.json", null, null, responseFunction);
    } catch (error) {
        console.error("Gagal memuat halaman atau JSON:", error);
    }
}

// Fungsi untuk menangani data dari JSON
function responseFunction(response) {
    if (!response || !response.card) {
        console.error("Data JSON tidak valid!", response);
        return;
    }
    
    const data = response.card;

    // Pastikan semua elemen ada sebelum mengubah kontennya
    const avatarEl = document.getElementById("avatar");
    const namaEl = document.getElementById("nama");
    const occupationEl = document.getElementById("occupation");
    const quoteEl = document.getElementById("quote");
    const aboutEl = document.getElementById("about");
    const skillsEl = document.getElementById("skills");
    const hargaEl = document.getElementById("harga");
    const rateEl = document.getElementById("rate");
    const socialLinksEl = document.getElementById("social-links");

    if (!avatarEl || !namaEl || !occupationEl || !quoteEl || !aboutEl || !skillsEl || !hargaEl || !rateEl || !socialLinksEl) {
        console.error("Beberapa elemen HTML tidak ditemukan. Pastikan ID-nya benar.");
        return;
    }

    // Set avatar
    avatarEl.innerHTML = `<img src="${data.avatar.src}" alt="${data.avatar.alt}" onclick="openModal('${data.avatar.src}')">`;

    // Set nama dan pekerjaan
    namaEl.textContent = data.details.name;
    occupationEl.textContent = data.details.occupation;

    // Set quote
    quoteEl.textContent = `"${data.details.skills.description || "No quote available"}"`;

    // Set about
    aboutEl.innerHTML = data.details.about.map(item => `<p>${item.value}</p>`).join("");

    // Set skillset
    skillsEl.innerHTML = data.details.skills.list.map(skill => `<li>${skill}</li>`).join("");

    // Set harga dan rate
    hargaEl.textContent = data.details.rate_day.price;
    rateEl.textContent = data.details.rate_day.rate;

    // Set social links
    socialLinksEl.innerHTML = data.details.social_links.map(link => `<a href="${link.url}" target="_blank">${link.platform}</a>`).join(" | ");
}

// Fungsi untuk menampilkan modal gambar
window.openModal = function (src) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    if (!modal || !modalImage) {
        console.error("Elemen modal tidak ditemukan!");
        return;
    }

    modalImage.src = src;
    modal.classList.add("active");

    // Tutup modal saat klik di luar gambar
    modal.onclick = () => modal.classList.remove("active");
};

// Jalankan fungsi utama setelah halaman dimuat
document.addEventListener("DOMContentLoaded", loadPage);
