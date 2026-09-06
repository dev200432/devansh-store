// ==============================
// Shopping Cart
// ==============================

let cart = [];


// ==============================
// Add Product To Cart
// ==============================

function addToCart(productName, productPrice) {

    const existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCartCount();

    alert(productName + " added to cart!");
}


// ==============================
// Update Cart Count
// ==============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    const totalItems = cart.reduce(
        (total, product) =>
            total + product.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


// ==============================
// Open Cart
// ==============================

function openCart() {

    const modal =
        document.getElementById("cartModal");

    modal.style.display = "flex";

    displayCart();
}


// ==============================
// Close Cart
// ==============================

function closeCart() {

    const modal =
        document.getElementById("cartModal");

    modal.style.display = "none";
}


// ==============================
// Display Cart Items
// ==============================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function (product, index) {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                    × ${product.quantity}
                </p>

            </div>

            <div>

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);
    });


    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
}


// ==============================
// Remove Product
// ==============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();

    displayCart();
}


// ==============================
// Checkout
// ==============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Thank you for shopping with Devansh Store!"
    );
}


// ==============================
// Product Filter
// ==============================

function filterProducts(category, button) {

    const products =
        document.querySelectorAll(".product-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (btn) {

        btn.classList.remove("active");
    });


    button.classList.add("active");


    products.forEach(function (product) {

        const productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }
    });
}


// ==============================
// Mobile Menu
// ==============================

function toggleMenu() {

    const navLinks =
        document.querySelector(".nav-links");

    navLinks.classList.toggle("active");
}


// ==============================
// Contact Form
// ==============================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const message =
                document.getElementById("message")
                    .value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formMessage.textContent =
                    "Please fill in all the fields.";

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;
            }


            formMessage.textContent =
                "Thank you " +
                name +
                "! Your enquiry has been submitted successfully.";


            contactForm.reset();
        }
    );
}


// ==============================
// Close Modal On Outside Click
// ==============================

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("cartModal");


        if (event.target === modal) {

            closeCart();
        }
    }
);