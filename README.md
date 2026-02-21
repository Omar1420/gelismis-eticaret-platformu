# 🛍️ Gelişmiş B2C E-Ticaret Platformu

HTML5, CSS3 ve modern JavaScript (ES6+) kullanılarak geliştirilmiş, tarayıcı tabanlı dinamik veri yönetimi sunan kapsamlı bir B2C e-ticaret web uygulaması.

Proje, statik bir tasarımın ötesine geçerek **LocalStorage** üzerinden veritabanı simülasyonu yapar ve hem müşteri (Front-Office) hem de yönetici (Back-Office) süreçlerini sunucusuz (serverless) bir yapıda yönetir.

## ✨ Öne Çıkan Özellikler

* **Müşteri Arayüzü (Front-Office):**
  * Dinamik sepet ve favori yönetimi.
  * Gelişmiş ürün filtreleme ve arama.
  * Mobil uyumlu (Mobile-First) "Premium Dark Mode" tasarımı.
* **Yönetim Paneli (Back-Office / Admin):**
  * `Chart.js` ile entegre edilmiş, anlık satış ve kategori analiz grafikleri.
  * CRUD (Ekle/Oku/Güncelle/Sil) işlemleri ile ürün ve sipariş yönetimi.
* **Algoritma & Yapay Zeka Simülasyonları:**
  * **Akıllı Ürün Öneri Sistemi:** Kullanıcıya özel rastgeleleştirilmiş (Fisher-Yates) vitrin ürünleri.
  * **Güvenlik (Captcha):** Botları engellemeye yönelik istemci taraflı dinamik Captcha doğrulama sistemi.

## 📂 Proje Mimarisi
* `admin/` - Yönetici paneli ve analiz grafikleri.
* `customer/` - Kullanıcı hesap yönetimi (Siparişler, Profil).
* `js/` - LocalStorage, DOM manipülasyonu ve sepet mantığını çalıştıran scriptler.
* `css/` - Özelleştirilmiş stil dosyaları.
* HTML Sayfaları: `index.html`, `product-list.html`, `cart.html`, `checkout.html`, `login.html` vb.

## 🛠️ Kullanılan Teknolojiler
* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Framework / Kütüphaneler:** Bootstrap 5, Chart.js, FontAwesome 6
* **Veri Yönetimi:** Tarayıcı API (LocalStorage)

---
*Geliştirici: Ömer Demirel*
