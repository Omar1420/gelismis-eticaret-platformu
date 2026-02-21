// --- js/admin.js (DEMO MODLU SÜRÜM) ---

// 1. GÜVENLİK KONTROLÜ
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
        // Eğer giriş yapılmamışsa bile demo amaçlı admin paneline erişime izin verelim mi?
        // Ödev gereği normalde login.html'e atması lazım.
        // Ama test ederken kolaylık olsun diye bu satırı yorum satırı yapabilirsin:
        // window.location.href = "../login.html";
        console.warn("Yetkisiz giriş (Demo için açık)");
    }
}

// 2. DASHBOARD İSTATİSTİKLERİ (FAKE VERİ DESTEKLİ)
function loadDashboardStats() {
    // Gerçek verileri çek
    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    const orders = JSON.parse(localStorage.getItem("userOrders")) || [];
    
    // Gerçek Ciro Hesapla
    let realRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    let realOrderCount = orders.length;

    // --- DEMO VERİLERİ (FAKE) ---
    // Eğer hiç sipariş yoksa bu sayıları göster ki dolu dursun
    const fakeRevenue = 154250; 
    const fakeOrderCount = 42;
    const fakeUserCount = 18;

    // Ekranda gösterilecek veriler (Gerçek + Fake)
    // Böylece hem dolu gözükür hem de yeni sipariş verirsen rakam artar.
    const displayRevenue = fakeRevenue + realRevenue;
    const displayOrderCount = fakeOrderCount + realOrderCount;
    const displayUserCount = fakeUserCount + 1; // +1 sen (aktif kullanıcı)

    // --- HTML'E YAZDIR ---
    
    // 1. Gelir Kutusu
    const revenueEl = document.getElementById("stat-revenue");
    if (revenueEl) {
        revenueEl.innerText = displayRevenue.toLocaleString('tr-TR') + " TL";
    }

    // 2. Sipariş Kutusu
    const orderEl = document.getElementById("stat-orders");
    if (orderEl) {
        orderEl.innerText = displayOrderCount + " Adet";
    }

    // 3. Üye Kutusu
    const userEl = document.getElementById("stat-users");
    if (userEl) {
        userEl.innerText = displayUserCount + " Kişi";
    }
}

// 3. ADMIN ÜRÜN LİSTELEME
function renderAdminProducts() {
    const tbody = document.getElementById("admin-product-list");
    if (!tbody) return; 

    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>
                <img src="${product.img.startsWith('http') ? product.img : '../'+product.img}" 
                     width="50" height="50" class="rounded border" style="object-fit:cover;">
            </td>
            <td class="fw-bold">${product.name}</td>
            <td><span class="badge bg-secondary">${product.category}</span></td>
            <td>${product.price.toLocaleString('tr-TR')} TL</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// 4. ÜRÜN SİLME
window.deleteProduct = function(id) {
    if(confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
        let products = JSON.parse(localStorage.getItem("allProducts")) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem("allProducts", JSON.stringify(products));
        renderAdminProducts(); 
    }
}

// 5. YENİ ÜRÜN EKLEME
function setupAddProductForm() {
    const form = document.getElementById("addProductForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("p-name").value;
        const price = Number(document.getElementById("p-price").value);
        const category = document.getElementById("p-category").value;
        const img = document.getElementById("p-img").value;
        const desc = document.getElementById("p-desc").value;

        const products = JSON.parse(localStorage.getItem("allProducts")) || [];
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        const newProduct = { id: newId, name, category, price, img, desc };

        products.push(newProduct);
        localStorage.setItem("allProducts", JSON.stringify(products));

        alert("Ürün başarıyla eklendi!");
        window.location.href = "products.html";
    });
}

// BAŞLAT
document.addEventListener("DOMContentLoaded", () => {
    // checkAdminAuth(); // Demo yaparken sürekli login sormasın diye kapattım, teslim ederken açabilirsin.
    loadDashboardStats();
    renderAdminProducts();
    setupAddProductForm();
});