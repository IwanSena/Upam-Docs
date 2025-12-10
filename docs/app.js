// Hilangkan preloader setelah halaman siap
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none";
            setTimeout(() => preloader.remove(), 300);
        }, 300);
    }
});

// Animasi muncul saat scroll
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);
sections.forEach(sec => observer.observe(sec));

// Fungsi load HTML ke dalam container (untuk QnA, Guide, Video, Donasi)
function loadComponent(id, url) {
    const root = document.getElementById(id);
    if (!root) return;

    fetch(url)
        .then(res => res.text())
        .then(html => {
            root.innerHTML = html;
        })
        .catch(() => {
            root.innerHTML = "<p>Gagal memuat konten. Silakan cek struktur file.</p>";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("guide-root", "components/guide.html");
    loadComponent("qna-root", "components/qna.html");
    loadComponent("video-root", "components/video.html");
    loadComponent("donate-root", "components/donate.html");
});
