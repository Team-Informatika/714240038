import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";

// Render home.html
renderHTML("penggantidirinya", "home.html");

// Fungsi untuk mengambil dan menampilkan data JSON
function loadData() {
    getJSON("https://t.if.co.id/json/nawal.json", null, null, function(response) {
        if (!response || !response.data || !response.data.card) {
            console.error("Data JSON tidak valid!", response);
            return;
        }

        const data = response.data.card; // Mengakses data dari response.data.card

        setTimeout(() => {
            // Set avatar
            document.getElementById("avatar").innerHTML = `
                <img src="${data.avatar.src}" alt="${data.avatar.alt}" onclick="openModal('${data.avatar.src}')">
            `;

            // Set nama dan pekerjaan
            document.getElementById("nama").textContent = data.details.name;
            document.getElementById("occupation").textContent = data.details.occupation;

            // Set quote
            document.getElementById("quote").textContent = `"${data.details.skills.description || "No quote available"}"`;

            // Set about
            document.getElementById("about").innerHTML = data.details.about
                .map(item => `<p>${item.value}</p>`)
                .join("");

            // Set skillset
            document.getElementById("skills").innerHTML = data.details.skills.list
                .map(skill => `<li>${skill}</li>`)
                .join("");

            // Set harga dan rate
            document.getElementById("harga").textContent = data.details.rate_day.price;
            document.getElementById("rate").textContent = data.details.rate_day.rate;

            // Set social links
            document.getElementById("social-links").innerHTML = data.details.social_links
                .map(link => `<a href="${link.url}" target="_blank">${link.platform}</a>`)
                .join(" | ");
        }, 500);
    });
}

// Panggil fungsi loadData setelah renderHTML selesai
setTimeout(loadData, 1000);

// Fungsi untuk menampilkan modal gambar
window.openModal = function (src) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    modalImage.src = src;
    modal.classList.add("active");

    // Tutup modal saat klik di luar gambar
    modal.onclick = () => modal.classList.remove("active");
};
