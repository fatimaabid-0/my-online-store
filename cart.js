/* =================================
   F&M STORE - SHOPPING CART
   ================================= */

let cart = JSON.parse(localStorage.getItem("fmCart")) || [];

/* Save cart */
function saveCart() {
    localStorage.setItem("fmCart", JSON.stringify(cart));
    updateCartCount();
}

/* Add product to cart */
function addToCart(name, price, image) {

    const existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " has been added to your cart! 🛍️");
}

/* Remove product */
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

/* Change quantity */
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

/* Calculate total number of items */
function getCartCount() {

    return cart.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);
}

/* Calculate total price */
function getCartTotal() {

    return cart.reduce(function(total, product) {
        return total + (product.price * product.quantity);
    }, 0);
}

/* Update cart button */
function updateCartCount() {

    const cartButton = document.getElementById("cartButton");

    if (cartButton) {
        cartButton.innerHTML = "🛒 Cart (" + getCartCount() + ")";
    }
}

/* Create cart button */
function createCartButton() {

    if (document.getElementById("cartButton")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "cartButton";
    button.className = "cart-button";
    button.innerHTML = "🛒 Cart (" + getCartCount() + ")";

    button.onclick = function() {
        displayCart();
    };

    document.body.appendChild(button);
}

/* Display cart */
function displayCart() {

    let cartBox = document.getElementById("cartBox");

    if (cartBox) {
        cartBox.remove();
    }

    cartBox = document.createElement("div");

    cartBox.id = "cartBox";

    cartBox.style.position = "fixed";
    cartBox.style.top = "0";
    cartBox.style.right = "0";
    cartBox.style.width = "380px";
    cartBox.style.maxWidth = "90%";
    cartBox.style.height = "100vh";
    cartBox.style.background = "#fff8f4";
    cartBox.style.boxShadow = "-5px 0 20px rgba(0,0,0,0.15)";
    cartBox.style.zIndex = "2000";
    cartBox.style.padding = "25px";
    cartBox.style.boxSizing = "border-box";
    cartBox.style.overflowY = "auto";

    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h2 style="margin-top:0;">🛒 Your Cart</h2>

            <button onclick="closeCart()"
                style="padding:8px 14px;">
                ✕
            </button>
        </div>
    `;

    if (cart.length === 0) {

        html += `
            <p style="margin-top:40px;">
                Your cart is empty 💗
            </p>
        `;

    } else {

        cart.forEach(function(product, index) {

            html += `
                <div style="
                    background:white;
                    border-radius:15px;
                    padding:15px;
                    margin-bottom:15px;
                    text-align:left;
                ">

                    <div style="
                        display:flex;
                        gap:12px;
                        align-items:center;
                    ">

                        <img
                            src="${product.image}"
                            style="
                                width:70px;
                                height:70px;
                                object-fit:cover;
                                border-radius:12px;
                            "
                        >

                        <div style="flex:1;">

                            <strong>${product.name}</strong>

                            <p style="margin:5px 0;">
                                Rs. ${product.price.toLocaleString()}
                            </p>

                            <div>

                                <button
                                    onclick="changeQuantity(${index}, -1)">
                                    −
                                </button>

                                <span style="margin:0 10px;">
                                    ${product.quantity}
                                </span>

                                <button
                                    onclick="changeQuantity(${index}, 1)">
                                    +
                                </button>

                            </div>

                        </div>

                        <button
                            onclick="removeFromCart(${index})">
                            🗑️
                        </button>

                    </div>

                </div>
            `;
        });

        html += `
            <hr>

            <h3>
                Total:
                Rs. ${getCartTotal().toLocaleString()}
            </h3>

            <button
                onclick="checkout()"
                style="width:100%; margin-top:10px;">
                Proceed to Checkout 💗
            </button>
        `;
    }

    cartBox.innerHTML = html;

    document.body.appendChild(cartBox);
}

/* Close cart */
function closeCart() {

    const cartBox = document.getElementById("cartBox");

    if (cartBox) {
        cartBox.remove();
    }
}

/* Checkout */
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}
/* Activate cart when page loads */
document.addEventListener("DOMContentLoaded", function() {

    createCartButton();

    updateCartCount();

    /* Automatically connect Add to Cart buttons */
    document.querySelectorAll(".add-cart").forEach(function(button) {

        button.addEventListener("click", function() {

            const name = button.dataset.name;
            const price = button.dataset.price;
            const image = button.dataset.image;

            addToCart(name, price, image);

        });

    });

});