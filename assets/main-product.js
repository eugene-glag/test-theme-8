document.addEventListener('DOMContentLoaded', function () {

    /// add to cart click handler
    document.getElementById('product-submit').addEventListener('click', function (el) {
        let productId = this.dataset.id;
        let productQuantity = document.getElementById('product-quantity').value;
        console.log('productId', productId);
        addToCart(productId, productQuantity);
    });

    // variant change button handler
    document.querySelectorAll('.product-info .buy-block .variant-item').forEach(function (el) {
        el.addEventListener('click', function (el) {
            changeVariant(this);
        });
    })

    // quantity change button handler
    document.querySelectorAll('.product-info .buy-block .quantity .quantity_button').forEach(function (el) {
        el.addEventListener('click', function (el) {
            changeQuantity(this);
        });
    })

    function addToCart(id, quantity) {
        // request body data
        let data = {
            items: [
                {
                    id: id,
                    quantity: quantity
                }
            ]
        }

        fetch('/cart/add.js', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            updateCartCount();
            return response.json();
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function updateCartCount() {
        try {
            const response = await fetch('/cart.js', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            // change cart count
            document.querySelector('header .header-cart .cart-count span').innerHTML = result.item_count

            // change cart animate
            document.querySelector('header .header-cart').animate(
                [
                    { transform: "rotate(0) scale(1)" },
                    { transform: "rotate(45deg) scale(2.5)" },
                    { transform: "rotate(-45deg) scale(2.5)" },
                    { transform: "rotate(0) scale(1)" },
                ],
                {duration: 700}
            );
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function changeVariant(element) {
        // add active class
        document.querySelector('.product-info .buy-block .variant-item.active').classList.remove('active');
        element.classList.add('active');

        // disable add to cart button if variant unavailable
        if (element.classList.contains('unavailable')) {
            document.getElementById('product-submit').classList.add('unavailable');
        } else {
            document.getElementById('product-submit').classList.remove('unavailable');
        }

        // change add to cart button variant id
        document.getElementById('product-submit').dataset.id = element.dataset.id;
    }

    function changeQuantity(element) {
        // quantity input values
        let quantityInput = document.getElementById('product-quantity');
        let currentValue = parseInt(quantityInput.value);

        if (element.classList.contains('minus') && currentValue > 1) {
            currentValue--;
            quantityInput.value = currentValue;
        } else if (element.classList.contains('plus')) {
            currentValue++;
            quantityInput.value = currentValue;
        }
    }

});