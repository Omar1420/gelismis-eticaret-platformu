// --- js/validation.js (GÜNCEL: Admin Yönlendirmesi Düzeltildi) ---

// 1. GİRİŞ FORMU KONTROLÜ
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Sayfanın yenilenmesini durdur

        const emailInput = document.getElementById("email").value;
        const passwordInput = document.getElementById("password").value;
        const captchaInput = document.getElementById("captchaInput").value.toUpperCase();
        const displayCode = document.getElementById("captcha-display").innerText;

        // A) Captcha Kontrolü
        if (captchaInput !== displayCode) {
            document.getElementById("captchaInput").classList.add("is-invalid");
            document.getElementById("captchaError").style.display = "block";
            return; // Hata varsa dur
        }

        // B) HAZIR HESAP KONTROLLERİ
        let role = "customer"; // Varsayılan: Müşteri
        let redirectUrl = "index.html"; // Varsayılan: Anasayfa

        // --- Admin Girişi mi? ---
        if (emailInput === "admin@nova.com" && passwordInput === "123456") {
            role = "admin";
            alert("Yönetici Girişi Başarılı! Admin paneline yönlendiriliyorsunuz...");
            redirectUrl = "admin/dashboard.html"; // <--- BURASI DÜZELTİLDİ (Artık panele gider)
        }
        // --- Müşteri Girişi mi? ---
        else if (emailInput === "user@nova.com" && passwordInput === "123456") {
            role = "customer";
            alert("Hoş geldiniz! Giriş başarılı.");
            redirectUrl = "index.html";
        }
        // --- Normal Giriş Denemesi ---
        else {
            if (passwordInput.length < 6) {
                alert("Şifre en az 6 karakter olmalı.");
                return;
            }
            alert("Giriş Başarılı!");
        }

        // C) KULLANICIYI KAYDET (LocalStorage)
        const user = {
            email: emailInput,
            name: emailInput.split("@")[0], // Email'in başı isim olsun
            role: role
        };

        localStorage.setItem("currentUser", JSON.stringify(user));

        // D) Yönlendir
        window.location.href = redirectUrl;
    });
}


// 2. KAYIT FORMU KONTROLÜ
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        // Formun otomatik gitmesini durdur
        e.preventDefault();
        
        const passwordInput = document.getElementById("reg-password");
        const rePasswordInput = document.getElementById("reg-repassword");
        const captchaInput = document.getElementById("captchaInput");
        const captchaDisplay = document.getElementById("captcha-display").innerText;

        const passwordValue = passwordInput.value;
        const rePasswordValue = rePasswordInput.value;

        // Şifre Eşleşme Kontrolü
        if (passwordValue !== rePasswordValue) {
            rePasswordInput.setCustomValidity("Şifreler eşleşmiyor!"); 
            rePasswordInput.classList.add("is-invalid");
        } else {
            rePasswordInput.setCustomValidity("");
            rePasswordInput.classList.remove("is-invalid");
            rePasswordInput.classList.add("is-valid");
        }

        // Captcha Kontrolü
        if (captchaInput.value.toUpperCase() !== captchaDisplay) {
            captchaInput.setCustomValidity("Kod hatalı");
            captchaInput.classList.add("is-invalid");
        } else {
            captchaInput.setCustomValidity("");
            captchaInput.classList.remove("is-invalid");
        }

        // Genel Validasyon Kontrolü
        if (!registerForm.checkValidity()) {
            e.stopPropagation(); // Hata varsa dur
        } else {
            // HER ŞEY DOĞRUYSA:
            alert("Kayıt Başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
            window.location.href = "login.html";
        }

        registerForm.classList.add("was-validated");
    });

    // Kullanıcı yazarken hata mesajını anlık silmek için:
    if(document.getElementById("reg-repassword")){
        document.getElementById("reg-repassword").addEventListener("input", function(){
            this.setCustomValidity("");
            this.classList.remove("is-invalid");
        });
    }
}