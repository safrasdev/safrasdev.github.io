/* cart.js - Specific Logic for Cart Page */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for main.js to update counts etc
    setTimeout(renderCart, 100);
});

function renderCart() {
    const items = JSON.parse(localStorage.getItem('vogueman_cart') || '[]');
    const list = document.getElementById('cart-list');
    const contentArea = document.getElementById('cart-content');
    const emptyLabel = document.getElementById('empty-cart-msg');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    if (!list) return;

    if (items.length === 0) {
        if (contentArea) contentArea.style.display = 'none';
        if (emptyLabel) emptyLabel.style.display = 'block';
        return;
    }

    if (contentArea) contentArea.style.display = 'flex';
    if (emptyLabel) emptyLabel.style.display = 'none';

    let html = '';
    let val = 0;

    items.forEach((item, idx) => {
        const p = typeof item.price === 'string' 
            ? parseFloat(item.price.replace('$', '').replace(',', ''))
            : parseFloat(item.price);
        
        val += p;
        const displayPrice = `$${p.toLocaleString()}.00`;

        html += `
            <div class="cart-item-center">
                <div class="cart-item-info">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="text-details">
                        <h3>${item.name}</h3>
                        <p class="milano-tag">REF: VM-${item.id} / MILANO EDITION</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <p class="price-val">${displayPrice}</p>
                    <button onclick="removeItem(${idx})" class="cart-remove-minimal">REMOVE</button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = `$${val.toLocaleString()}.00`;
    if (totalEl) totalEl.textContent = `$${val.toLocaleString()}.00`;
}

window.removeItem = (idx) => {
    let items = JSON.parse(localStorage.getItem('vogueman_cart') || '[]');
    items.splice(idx, 1);
    localStorage.setItem('vogueman_cart', JSON.stringify(items));
    renderCart();
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
};
