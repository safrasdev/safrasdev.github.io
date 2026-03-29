/* product.js - Specific Logic for Product Page */

function changeImage(src) {
    const mainImg = document.getElementById('main-prod-img');
    if (mainImg) {
        mainImg.src = src.replace('w=200', 'w=1000');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Dynamic product loading (simulation)
    if (id === '2') {
        const mainImg = document.getElementById('main-prod-img');
        const prodName = document.getElementById('prod-name');
        const prodPrice = document.getElementById('prod-price');
        
        if (mainImg) mainImg.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000';
        if (prodName) prodName.innerHTML = '<span>SILVER ZENITH</span> <span>TIMEPIECE</span>';
        if (prodPrice) prodPrice.textContent = '$899.00';
    } else if (id === '3') {
        const mainImg = document.getElementById('main-prod-img');
        const prodName = document.getElementById('prod-name');
        const prodPrice = document.getElementById('prod-price');
        
        if (mainImg) mainImg.src = 'https://images.unsplash.com/photo-1594932224030-940955d21022?auto=format&fit=crop&q=80&w=1000';
        if (prodName) prodName.innerHTML = '<span>MINIMALIST</span> <span>TRENCH</span>';
        if (prodPrice) prodPrice.textContent = '$320.00';
    }

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const name = document.getElementById('prod-name').innerText;
            const price = document.getElementById('prod-price').textContent;
            const img = document.getElementById('main-prod-img').src;
            if (typeof addToCart === 'function') {
                addToCart({ id, name, price, img });
            }
        });
    }

    // Size chip selection logic
    const sizeButtons = document.querySelectorAll('.size-chips button');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
