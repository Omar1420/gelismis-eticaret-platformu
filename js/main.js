// --- js/main.js (KALICI HAFIZA & DÜZELTİLMİŞ SÜRÜM) ---

const defaultProducts = [
    // BİLGİSAYAR
    { id: 1, name: "MSI ", category: "bilgisayar", price: 75000, img: "assets/rtx4090.avif", desc: "24GB GDDR6X Bellek, 4K Oyun Canavarı." },
    { id: 2, name: "Asus ", category: "bilgisayar", price: 45000, img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302", desc: "i9 İşlemci, 32GB RAM Oyuncu Laptop." },
    { id: 3, name: " Mekanik Klavye", category: "bilgisayar", price: 3500, img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef", desc: "RGB Işıklı Profesyonel Klavye." },
    { id: 4, name: "Apple ", category: "bilgisayar", price: 6500, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf", desc: "144Hz Kavisli Oyuncu Monitörü." },
    { id: 5, name: "HyperX Cloud II", category: "bilgisayar", price: 2800, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b", desc: "7.1 Surround Ses Kulaklık." },
    { id: 6, name: "Samsung ", category: "bilgisayar", price: 3200, img: "assets/ssd.jpg", desc: "7000MB/s Ultra Hızlı Okuma." },

    // OYUN
    { id: 11, name: "Xbox Series X", category: "oyun", price: 22500, img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d", desc: "1TB SSD, Gerçek 4K." },
    { id: 12, name: "Nintendo Switch OLED", category: "oyun", price: 13500, img: "assets/nintendo.jpg", desc: "7 inç OLED Ekranlı El Konsolu." },

    // TELEFON
    { id: 20, name: "iPhone 15 ", category: "telefon", price: 85000, img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569", desc: "Titanyum Gövde, A17 Pro Çip." },
    { id: 21, name: "Samsung ", category: "telefon", price: 75000, img: "assets/s24ultra.jpeg", desc: "Galaxy AI, Titanyum Çerçeve." },

    // MOBİLYA
    { id: 30, name: "Modern Gri Koltuk", category: "mobilya", price: 18500, img: "assets/koltuk.jpg", desc: "Leke Tutmaz Kumaş, L Koltuk." },
    { id: 32, name: "Dekoratif Kitaplık", category: "mobilya", price: 4500, img: "https://images.unsplash.com/photo-1594620302200-9a762244a156", desc: "5 Raflı Modern Tasarım." },
    { id: 33, name: "Lambader Aydınlatma", category: "mobilya", price: 1800, img: "assets/lamba.webp", desc: "Üç Ayaklı Şık Lambader." },

    // BEBEK
    { id: 40, name: "Konfor Bebek Arabası", category: "bebek", price: 12000, img: "assets/bebek-arabasi.avif", desc: "Kolay Katlanabilir, Hafif." },
    { id: 41, name: "Ahşap Oyuncak Seti", category: "bebek", price: 850, img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1", desc: "Sağlığa Zararsız Boya." },
    { id: 42, name: "Bebek Telsizi & Kamera", category: "bebek", price: 3500, img: "assets/bebek-kamera.webp", desc: "Gece Görüşlü Kamera." },
    { id: 43, name: "Mama Sandalyesi", category: "bebek", price: 2100, img: "assets/mama-sandalyesi.jpg", desc: "Yıkanabilir Tepsi." },

    // PETSHOP
    { id: 50, name: "Premium Kedi Maması", category: "petshop", price: 1800, img: "assets/kedi-mama.jpg", desc: "Tahılsız Somonlu Mama." },
    { id: 51, name: "Köpek Yatağı", category: "petshop", price: 650, img: "assets/kopek-yatagi.webp", desc: "Yumuşak Dokulu Yatak." },
    { id: 52, name: "Kedi Tırmalama", category: "petshop", price: 450, img: "assets/kedi-tirmalama.webp", desc: "Doğal Halatlı." },
    { id: 53, name: "Otomatik Su Pınarı", category: "petshop", price: 950, img: "assets/su-pinari.jpg", desc: "Filtreli Su Kabı." },

    // KOZMETİK
    { id: 60, name: "L'Oreal Yüz Serumu", category: "kozmetik", price: 450, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", desc: "Hyaluronik Asit Serum." },
    { id: 61, name: "Mat Ruj Seti", category: "kozmetik", price: 320, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa", desc: "Kalıcı mat ruj serisi." },

    // AYAKKABI
    { id: 70, name: "Nike Air Spor Ayakkabı", category: "ayakkabi", price: 3500, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", desc: "Günlük kullanım için rahat." },
    { id: 71, name: "Klasik Puma", category: "ayakkabi", price: 2100, img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5", desc: "Su geçirmez hakiki deri." }
];

// --- GÜVENLİ VERİ YÜKLEME ---
let products = [];
try {
    const storedProducts = localStorage.getItem("allProducts");
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        if (products.length === 0) {
             products = defaultProducts;
             localStorage.setItem("allProducts", JSON.stringify(products));
        }
    } else {
        products = defaultProducts;
        localStorage.setItem("allProducts", JSON.stringify(products));
    }
} catch (e) {
    products = defaultProducts;
}

// --- YARDIMCI: Kullanıcıya Özel Key ---
function getFavKey() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return null; // Giriş yapmamış
    return `favorites_${user.email}`; 
}

// --- FAVORİ LİSTESİNİ ÇEK ---
function getFavorites() {
    const key = getFavKey();
    if (!key) return []; 
    return JSON.parse(localStorage.getItem(key)) || [];
}

// --- FAVORİ EKLE / ÇIKAR ---
function toggleFavorite(productId) {
    const key = getFavKey();
    if (!key) {
        if(confirm("Favori özelliğini kullanmak için giriş yapmalısınız. Giriş sayfasına gitmek ister misiniz?")) {
            window.location.href = "login.html";
        }
        return; 
    }

    let favorites = getFavorites();
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
        alert("Ürün favorilerden kaldırıldı.");
    } else {
        favorites.push(productId);
        alert("Ürün favorilere eklendi!");
    }

    localStorage.setItem(key, JSON.stringify(favorites));
    updateFavoriteButtonUI(productId);
    
    // Eğer favoriler sayfasındaysak sayfayı yenile
    if (window.location.pathname.includes("favorites.html")) {
        renderFavoritesPage();
    }
}

// --- BUTON GÖRÜNÜMÜNÜ GÜNCELLE ---
function updateFavoriteButtonUI(productId) {
    const favIcon = document.getElementById("fav-icon");
    if (favIcon) {
        const favorites = getFavorites(); 
        if (favorites.includes(productId)) {
            // Favorideyse (Dolu)
            favIcon.classList.remove("far"); 
            favIcon.classList.add("fas");    
            favIcon.parentElement.classList.remove("btn-outline-danger");
            favIcon.parentElement.classList.add("btn-danger");
            favIcon.parentElement.classList.add("text-white");
        } else {
            // Değilse (Boş)
            favIcon.classList.remove("fas");
            favIcon.classList.add("far");
            favIcon.parentElement.classList.add("btn-outline-danger");
            favIcon.parentElement.classList.remove("btn-danger");
            favIcon.parentElement.classList.remove("text-white");
        }
    }
}

// --- GİRİŞ KONTROLÜ ---
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const actionContainer = document.getElementById("user-actions");

    if (!actionContainer) return;

    if (user) {
        let adminLink = "";
        if(user.role === "admin") {
            adminLink = `<li><a class="dropdown-item text-danger fw-bold" href="admin/dashboard.html">Admin Paneli</a></li>
                         <li><hr class="dropdown-divider"></li>`;
        }
        
        actionContainer.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle border-0" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user-circle me-2"></i> ${user.name}
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow">
                    ${adminLink}
                    <li><a class="dropdown-item" href="customer/profile.html">Profilim</a></li>
                    <li><a class="dropdown-item" href="customer/orders.html">Siparişlerim</a></li>
                    <li><a class="dropdown-item" href="favorites.html">Favorilerim</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logoutUser()">Çıkış Yap</a></li>
                </ul>
            </div>
        `;
    } else {
        actionContainer.innerHTML = `
            <a href="login.html" class="btn btn-outline-light btn-sm px-3 rounded-pill me-2">Giriş</a>
            <a href="register.html" class="btn btn-light btn-sm px-3 rounded-pill text-dark fw-bold">Kayıt</a>
        `;
    }
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// --- SAYFA YÜKLENİNCE ÇALIŞACAKLAR ---
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus(); 

    // Ürün Listesi Sayfası
    const listContainer = document.getElementById("product-list-container");
    if (listContainer) {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        setupCategoryFilters();
        if (cat && cat !== 'all') {
            renderProductsList(products.filter(p => p.category === cat));
            document.querySelectorAll('.category-filter').forEach(btn => {
                if(btn.dataset.category === cat) btn.classList.add('active');
            });
        } else {
            renderProductsList(products);
        }
    }

    // Ürün Detay Sayfası
    if (window.location.pathname.includes("product-detail.html")) {
        loadProductDetail();
    }
    
    // AI Alanı
    const aiContainer = document.getElementById("ai-products");
    if(aiContainer) {
        const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
        aiContainer.innerHTML = shuffled.map(createProductCard).join('');
    }

    // Favoriler Sayfası
    if (window.location.pathname.includes("favorites.html") && typeof renderFavoritesPage === 'function') {
        renderFavoritesPage();
    }
});

// --- YARDIMCI FONKSİYONLAR ---

function createProductCard(product) {
    return `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 product-card border-0 p-3">
            <div class="position-relative overflow-hidden rounded-4">
                <img src="${product.img}" class="card-img-top hover-zoom" alt="${product.name}" 
                     style="height: 250px; object-fit: cover;" 
                     onerror="this.src='https://via.placeholder.com/250?text=NovaMarket'">
                <button onclick="toggleFavorite(${product.id})" class="btn-fav-round">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="card-body px-1 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-muted small text-uppercase fw-bold">${product.category}</span>
                    <span class="fw-bold gold-text fs-5">${product.price.toLocaleString('tr-TR')} TL</span>
                </div>
                <h5 class="card-title fw-bold text-white mb-3 text-truncate">${product.name}</h5>
                <div class="d-grid gap-2 mt-auto">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline-light btn-sm rounded-pill py-2">Detayları Gör</a>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary btn-sm rounded-pill py-2 fw-bold">
                        <i class="fas fa-cart-plus me-1"></i> Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

function renderProductsList(list) {
    const container = document.getElementById("product-list-container");
    if(container) container.innerHTML = list.map(createProductCard).join('');
}

function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if(product) {
        // 1. Ürün Bilgilerini Doldur
        document.getElementById("detail-img").src = product.img;
        document.getElementById("detail-title").innerText = product.name;
        document.getElementById("detail-price").innerText = product.price.toLocaleString('tr-TR') + " TL";
        document.getElementById("detail-desc").innerText = product.desc;
        document.getElementById("detail-category").innerText = product.category.toUpperCase();
        
        // Sepete Ekle Butonu
        const addBtn = document.getElementById("add-btn");
        if(addBtn) addBtn.onclick = function() { addToCart(product.id); };

        // --- İŞTE BU KISIM EKSİKTİ, ŞİMDİ EKLENDİ ---
        // Favori Butonu
        const favBtn = document.getElementById("fav-btn");
        if(favBtn) {
            updateFavoriteButtonUI(product.id); // Açılışta kontrol et (dolu mu boş mu?)
            favBtn.onclick = function() { toggleFavorite(product.id); }; // Tıklayınca çalıştır
        }
        // ---------------------------------------------

        // 2. Benzer Ürünleri Doldur
        const similarContainer = document.getElementById("similar-products");
        if(similarContainer) {
            const similarList = products
                .filter(p => p.id !== product.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            similarContainer.innerHTML = similarList.map(createProductCard).join('');
        }
    }
}

function setupCategoryFilters() {
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.dataset.category;
            renderProductsList(cat === 'all' ? products : products.filter(p => p.category === cat));
        });
    });
}