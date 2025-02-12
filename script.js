import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";

// Render home.html
console.log("⏳ Memulai render home.html...");
renderHTML("penggantidirinya", "home.html");

// Tunggu sebentar sebelum mengambil data JSON (agar home.html sudah selesai dimuat)
setTimeout(() => {
    console.log("✅ home.html kemungkinan sudah selesai dimuat, mengambil data JSON...");
    loadData();
}, 1000); // Tunggu 1 detik agar HTML selesai dimuat

// Fungsi untuk mengambil dan menampilkan data JSON
function loadData() {
    console.log("⏳ Mengambil data JSON...");
    getJSON("https://t.if.co.id/json/nawal.json", null, null, function(response) {
        console.log("✅ Data JSON diterima:", response);

        if (!response || !response.data || !response.data.card) {
            console.error("❌ Data JSON tidak valid!", response);
            return;
        }

        const data = response.data.card;
        console.log("🔹 Data yang digunakan:", data);

        // Pastikan semua elemen sudah ada sebelum diisi
        setTimeout(() => {
            console.log("⏳ Memasukkan data ke dalam halaman...");

            const avatarElem = document.getElementById("avatar");
            if (avatarElem) {
                avatarElem.innerHTML = `
                    <img src="${data.avatar.src}" alt="${data.avatar.alt}" onclick="openModal('${data.avatar.src}')">
                `;
                console.log("✅ Avatar dimuat.");
            } else {
                console.warn("⚠️ Elemen avatar tidak ditemukan!");
            }

            const namaElem = document.getElementById("nama");
            const occupationElem = document.getElementById("occupation");
            if (namaElem && occupationElem) {
                namaElem.textContent = data.details.name;
                occupationElem.textContent = data.details.occupation;
                console.log("✅ Nama dan pekerjaan diatur.");
            }

            const quoteElem = document.getElementById("quote");
            if (quoteElem) {
                quoteElem.textContent = `"${data.details.skills.description || "No quote available"}"`;
                console.log("✅ Quote diatur.");
            }

            const aboutElem = document.getElementById("about");
            if (aboutElem) {
                aboutElem.innerHTML = data.details.about
                    .map(item => `<p>${item.value}</p>`)
                    .join("");
                console.log("✅ About section diatur.");
            }

            const skillsElem = document.getElementById("skills");
            if (skillsElem) {
                skillsElem.innerHTML = data.details.skills.list
                    .map(skill => `<li>${skill}</li>`)
                    .join("");
                console.log("✅ Skillset diatur.");
            }

            const hargaElem = document.getElementById("harga");
            const rateElem = document.getElementById("rate");
            if (hargaElem && rateElem) {
                hargaElem.textContent = data.details.rate_day.price;
                rateElem.textContent = data.details.rate_day.rate;
                console.log("✅ Harga dan rate diatur.");
            }

            const socialLinksElem = document.getElementById("social-links");
            if (socialLinksElem) {
                socialLinksElem.innerHTML = data.details.social_links
                    .map(link => `<a href="${link.url}" target="_blank">${link.platform}</a>`)
                    .join(" | ");
                console.log("✅ Social links diatur.");
            }

            // Cek apakah CSS sudah dimuat
            const cssLoaded = Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes("style.css"));
            if (cssLoaded) {
                console.log("✅ CSS (style.css) sudah dimuat.");
            } else {
                console.warn("⚠️ CSS (style.css) mungkin belum dimuat.");
            }

        }, 500); // Tunggu sebentar untuk memastikan elemen tersedia
    });
}

// Fungsi untuk menampilkan modal gambar
window.openModal = function (src) {
    console.log("🔍 Membuka modal untuk gambar:", src);
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    if (modal && modalImage) {
        modalImage.src = src;
        modal.classList.add("active");
        console.log("✅ Modal ditampilkan.");

        modal.onclick = () => {
            modal.classList.remove("active");
            console.log("✅ Modal ditutup.");
        };
    } else {
        console.warn("⚠️ Modal tidak ditemukan!");
    }
};
