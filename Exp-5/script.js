
// Available products stored as objects in an array
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        icon: "💻"
    },
    {
        id: 2,
        name: "Headphones",
        price: 2000,
        icon: "🎧"
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1500,
        icon: "⌨️"
    },
    {
        id: 4,
        name: "Mouse",
        price: 800,
        icon: "🖱️"
    }
];

// Shopping cart array
let cart = [];

// Discount settings
const discountRate = 20;
const minimumAmount = 50000;

// Selecting HTML elements
const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");

// Display available products using forEach()
function displayProducts() {

    productList.innerHTML = "";

    products.forEach(function(product) {

        productList.innerHTML += `
            <div class="product-card">

                <div class="product-icon">
                    ${product.icon}
                </div>

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <label>Quantity</label>

                <input
                    type="number"
                    id="qty-${product.id}"
                    value="1"
                    min="1"
                    step="1"
                >

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

    });
}

// Add product to cart
function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    const quantityInput = document.getElementById("qty-" + productId);
    const quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            ...product,
            quantity: quantity
        });

    }

    updateCart();

    quantityInput.value = 1;
}

// Display cart items using map()
function displayCart() {

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty">Your cart is empty.</p>';

        return;
    }

    cartItems.innerHTML = cart.map(function(item) {

        return `
            <div class="cart-item">

                <div>
                    <h4>${item.name}</h4>

                    <small>
                        ₹${item.price.toLocaleString("en-IN")} each
                    </small>

                    <br>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>Qty: ${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                <strong>
                    ₹${(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>

            </div>
        `;

    }).join("");

}

// Calculate subtotal using reduce()
function calculateSubtotal() {

    return cart.reduce(function(total, item) {

        return total + (item.price * item.quantity);

    }, 0);

}

// Update cart and order summary
function updateCart() {

    displayCart();

    const subtotal = calculateSubtotal();

    // Apply 20% discount when subtotal reaches ₹50,000
    let discount = 0;

    if (subtotal >= minimumAmount) {
        discount = subtotal * discountRate / 100;
    }

    const total = subtotal - discount;

    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toFixed(2);

    document.getElementById("discount").textContent =
        "- ₹" + discount.toFixed(2);

    document.getElementById("total").textContent =
        "₹" + total.toFixed(2);

    const message = document.getElementById("discountMessage");

    if (discount > 0) {

        message.textContent =
            "20% discount applied to your order!";

    } else {

        message.textContent =
            "Add products worth ₹50,000 to unlock 20% discount!";

    }

    console.log("Cart:", cart);
    console.log("Subtotal:", subtotal);
    console.log("Discount:", discount);
    console.log("Final Total:", total);

}

// Change product quantity using find()
function changeQuantity(productId, change) {

    const item = cart.find(function(product) {
        return product.id === productId;
    });

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCart();

}

// Remove product using filter()
function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    updateCart();

}

// Clear complete cart
document.getElementById("clearCart").addEventListener("click", function() {

    cart = [];

    updateCart();

});

// Initial display
displayProducts();
updateCart();
