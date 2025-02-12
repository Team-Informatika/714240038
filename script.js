function responseFunction(response) {
    console.log("Data JSON diterima:", response); // Debugging: Cek struktur JSON

    // Pastikan respons memiliki data yang benar
    if (!response || !response.data || !response.data.card) {
        console.error("Data JSON tidak valid!", response);
        return;
    }

    const data = response.data.card; // Ambil data dari response.data.card

    // Pastikan elemen sudah ada sebelum memodifikasi
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
