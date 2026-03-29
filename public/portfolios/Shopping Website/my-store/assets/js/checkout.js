/* checkout.js - Specific Logic for Checkout Page */

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();
    initCheckoutActions();
});

function renderCheckoutSummary() {
    const items = JSON.parse(localStorage.getItem('vogueman_cart') || '[]');
    const bagCount = document.getElementById('bag-count');
    const subtotalVal = document.getElementById('subtotal-val');
    const finalTotal = document.getElementById('final-total');

    if (!bagCount || !subtotalVal) return;

    let total = 0;
    items.forEach(it => {
        const p = typeof it.price === 'string' 
            ? parseFloat(it.price.replace('$', '').replace(',', ''))
            : it.price;
        total += p;
    });

    bagCount.textContent = `${items.length} ${items.length === 1 ? 'ITEM' : 'ITEMS'}`;
    subtotalVal.textContent = `$${total.toLocaleString()}.00`;
    finalTotal.textContent = `$${total.toLocaleString()}.00`;
}

function initCheckoutActions() {
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            const currentItems = JSON.parse(localStorage.getItem('vogueman_cart') || '[]');
            if (currentItems.length === 0) {
                alert("Your bag is empty.");
                return;
            }

            localStorage.removeItem('vogueman_cart');
            const wrapper = document.querySelector('.checkout-minimal-wrapper');
            const success = document.getElementById('success-view');
            
            if (wrapper) wrapper.style.display = 'none';
            if (success) success.style.display = 'block';
            
            if (typeof updateCartCount === 'function') updateCartCount();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
