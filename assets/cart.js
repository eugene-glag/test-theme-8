document.addEventListener('DOMContentLoaded', function () {

    // quantity change button handler
    document.querySelectorAll('.cart-page .quantity .quantity_button').forEach(function (el) {
        el.addEventListener('click', function (el) {
            changeQuantity(this);
        });
    })

    // remove button handler
    document.querySelectorAll('.cart-page .cart-remove').forEach(function (el) {
        el.addEventListener('click', function (el) {
            let productId = this.dataset.id;
            updateCart(productId, 0);
        });
    })

    function changeQuantity(element) {
        // quantity input values
        let productId = element.dataset.id;
        let quantityInput = document.querySelector('.cart-page .quantity_input[data-id="' + productId + '"]');
        let currentValue = parseInt(quantityInput.value);

        if (element.classList.contains('minus') && currentValue > 1) {
            currentValue--;
            quantityInput.value = currentValue;
        } else if (element.classList.contains('minus') && currentValue == 1) {
            currentValue = 0;
        } else if (element.classList.contains('plus')) {
            currentValue++;
            quantityInput.value = currentValue;
        }

        // update cart
        updateCart(productId, currentValue);
    }

    function updateCart(id, quantity){
        let data = {
            updates: {
                [id]: quantity
            }
        }

        fetch('/cart/update.js', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            location.reload();
            return response.json();
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});