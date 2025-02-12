import { renderHTML, onClick, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";

// Render halaman home.html lalu jalankan inisialisasi
renderHTML("content", "home.html").then(() => {
    // Setelah home.html selesai dimuat, jalankan fungsi init
    init();
});

// Fungsi inisialisasi setelah home.html dimuat
function init() {
    // Ambil data dari JSON
    getJSON("https://t.if.co.id/json/nawal.json", null, null, responseFunction);

    // Event listener modal (harus setelah home.html termuat)
    const modal = document.getElementById("modal");
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === this) {
                this.classList.remove("active");
            }
        });
    }
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

// Event listeners untuk social media
onClick("github", () => window.open('https://github.com/nawal886', '_blank'));
onClick("whatsapp", () => window.open('https://wa.me/62895350871030', '_blank'));
onClick("instagram", () => window.open('https://instagram.com/harom_ein', '_blank'));

setInner("tex", "Kontak saya:");
