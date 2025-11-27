/* ===============================
   NAVBAR SCROLL – SHRINK EFFECT
=============================== */

// Sayfadaki <header> etiketini seçiyoruz
const header = document.querySelector("header");

// Sayfa kaydırıldığında çalışacak event
window.addEventListener("scroll", () => {
  
  // Eğer kullanıcı 80px aşağı kaymışsa
  if (window.scrollY > 80) {    
    header.classList.add("shrink");   // header'a shrink sınıfını ekle
  } else {
    header.classList.remove("shrink"); // yukarı çıkınca shrink'i kaldır
  }

});


/* ===============================
   TYPEWRITER (Harf Harf Yazma)
=============================== */

document.addEventListener("DOMContentLoaded", () => {
    const text = "Hello World! I'm Sena...";
    const speed = 130;   // yazma hızı
    const eraseSpeed = 60; // silme hızı
    const waitTime = 5000; // yazı bittikten sonra bekleme (5 saniye)
    
    let i = 0;
    let isDeleting = false;

    const target = document.querySelector("#typewriter .text");
    if (!target) return;

    function typeLoop() {
        if (!isDeleting) {
            // YAZMA MODU
            target.textContent = text.substring(0, i + 1);
            i++;

            if (i === text.length) {
                // Yazı bitti → Bekle → Sonra silmeye başla
                setTimeout(() => {
                    isDeleting = true;
                }, waitTime);
            }
        } 
        else {
            // SİLME MODU
            target.textContent = text.substring(0, i - 1);
            i--;

            if (i === 0) {
                // Silme bitti → tekrar yazmaya başla
                isDeleting = false;
            }
        }

        // Animasyon hız kontrolü
        const delay = isDeleting ? eraseSpeed : speed;
        setTimeout(typeLoop, delay);
    }

    typeLoop(); // Başlat
});
// NAVBAR rengini bölüme göre değiştirme
const navbar = document.querySelector("header");
const aboutSection = document.querySelector("#hakkimda");

window.addEventListener("scroll", () => {
  const rect = aboutSection.getBoundingClientRect();

  // Hakkımda bölümü ekranda görünüyorsa
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    navbar.classList.add("nav-white");
  } else {
    navbar.classList.remove("nav-white");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Görünürken animasyonu aç
          entry.target.classList.add("show");
        } else {
          // Görüş alanından çıkınca tekrar kapat
          entry.target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.15, // elemanın yaklaşık %15'i görünce tetikle
    }
  );

  reveals.forEach((el) => observer.observe(el));
});

// Sayfa yenilenince her zaman en üstten başla
window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// Sayfa yenilendiğinde/geri gelindiğinde her zaman en üstten başlasın
window.history.scrollRestoration = "manual";

// Normal yükleme için
window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50); // Safari'ye ufak bir gecikme
});

// Safari'nin "geri gelme" (bfcache) durumunu da yakala
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }
});

// SKILLS bölümüne özel reveal (progress bar animasyonu)
const skillsSection = document.querySelector(".skills-section");

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsSection.classList.add("show");
        } else {
          skillsSection.classList.remove("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  skillsObserver.observe(skillsSection);
}


// İletişim formu mesajı
const form = document.querySelector("#contactForm");
const formResult = document.querySelector("#formResult");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formResult.textContent = "Mesajınız başarıyla gönderildi! ";
    form.reset();
  });
}


document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;

        const distance = targetPosition - startPosition;
        const duration = 1200; //  → daha yavaş (1000–2000 ms ideal)
        let start = null;

        function smoothStep(time) {
            if (!start) start = time;
            let progress = time - start;

            // Ease-in-out (yumuşak hızlanıp yavaşlama)
            let ease = progress / duration;
            ease = ease < 0.5
                ? 2 * ease * ease
                : 1 - Math.pow(-2 * ease + 2, 2) / 2;

            window.scrollTo(0, startPosition + distance * ease);

            if (progress < duration) {
                requestAnimationFrame(smoothStep);
            }
        }

        requestAnimationFrame(smoothStep);
    });
});



