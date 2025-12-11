(async () => {
    const cardClassList = 'card h-100'; // h-100 makes tthem equal height!
    const cardBodyClassList = 'card-body vstack gap-1'; // vstack is shorthand for d-flex flex-column - vertical flex column
    const cardTitleClassList = 'card-title cutoff-text__title'; // cutoff-text - custom CSS class for controlling how many lines of text shown (alternative to JS substring)
    const cardTextClassList = 'card-subtitle cutoff-text__description';
    const smallTextClassList = 'text-body-secondary';

    function ApplyStyles(element, customClassList) {
        const splitClassList = customClassList.split(' ');
        splitClassList.forEach(className => {
            element.classList.add(className);
        });
    }

    const productCatalogue = document.getElementById('product-catalogue');
    const row = document.getElementById('cards-row');
    if (typeof (productCatalogue) !== 'undefined') {

        productCatalogue.classList.remove('d-block');
        productCatalogue.classList.add('d-none');
        
    }
    if (typeof (row) !== 'undefined') {
        row.classList.remove('d-block');
        row.classList.add('d-none');
        row.textContent = '';
    }

    // Rendering chosen products
    if (typeof(localStorage.getItem('chosenProducts')) !== 'undefined' && localStorage.getItem('chosenProducts') !== null) {
        let chosenProducts = localStorage.getItem('chosenProducts');
        // Enabling container and row back again
        productCatalogue.classList.remove('d-none');
        productCatalogue.classList.add('d-block');
        row.classList.remove('d-none');


        let splitChosenProducts = chosenProducts.split(',');
        console.log(splitChosenProducts);
        const response = await fetch('/assets/products.json');
        const data = await response.json();
        console.log(data);

        let renderedIDs = []; // this will help to see if the ID has already been rendered
        splitChosenProducts.forEach(id => {
            // if chosenID matches any one of JSON product IDs - render it
            // How to know if the id repeats?
            // returns true if a string/array contains a specified string
            if (renderedIDs.includes(id)) {
                // don't render
            } else {
                data.products.forEach(product => {
                    if (`${id.toString()}` === `${product.id.toString()}`) {
                        // if equal, render an appropriate product
                        const col = document.createElement('div');
                        col.classList.add('col');

                        const card = document.createElement('div');
                        ApplyStyles(card, cardClassList);


                        const cardBody = document.createElement('div');
                        ApplyStyles(cardBody, cardBodyClassList);

                        const image = document.createElement('img');
                        image.classList.add('card-img-top');

                        const cardTitle = document.createElement('h5');
                        ApplyStyles(cardTitle, cardTitleClassList);

                        const cardText = document.createElement('p');
                        ApplyStyles(cardText, cardTextClassList);

                        const cardPrice = document.createElement('small');
                        ApplyStyles(cardPrice, smallTextClassList);



                        // 2) Then, assigning (populating) appropriate values from data to elements - including error handling for all properties
                        if (typeof (product.img) !== 'undefined' && product.img.length !== 0 && product.img !== "unknown") {
                            image.src = product.img;
                        }

                        if (typeof (product.alt) !== 'undefined' && product.alt.length !== 0 && product.alt !== "unknown") {
                            image.alt = product.alt;
                        }

                        if (typeof (product.productName) !== 'undefined' && product.productName.length !== 0 && product.productName !== "unknown") {
                            cardTitle.textContent = product.productName;
                        }

                        if (typeof (product.description) !== 'undefined' && product.description.length !== 0 && product.description !== "unknown") {
                            cardText.textContent = product.description;
                        }

                        if (typeof (product.price) !== 'undefined' && product.price.length !== 0 && product.price !== "unknown") {
                            if (product.currency === "EUR" && typeof (product.currency) !== 'undefined' && product.currency.length !== 0 && product.currency !== "unknown") {
                                cardPrice.textContent = `${new Intl.NumberFormat(("IR"), {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(product.price)}` // formatting appropriately for Irish market ONLY if appropriate product currency parameter is present
                            }
                        }


                        // 3) Finally, adding all the populated elements to the DOM
                        row.appendChild(col);
                        col.appendChild(card);
                        card.appendChild(cardBody);
                        cardBody.appendChild(image);
                        cardBody.appendChild(cardTitle);
                        cardBody.appendChild(cardText);
                        cardBody.appendChild(cardPrice);
                    }


                });
            }
            // Add the ID to rendered in the end
            renderedIDs.push(id);
        });
    }

    let checkout = document.getElementById('buy-now');

    let paymentFailure = document.getElementById('payment-failure');
    paymentFailure.classList.add('d-none');
    let paymentSuccess = document.getElementById('payment-success');
    paymentSuccess.classList.add('d-none');

    let loggedin = localStorage.getItem('loggedIn');
    if (loggedin === '0') {
        window.location.href = 'login.html';  // redirect to login page if not logged in
    }

    checkout.addEventListener('click', completeCheckout)

    function completeCheckout(event) {
        event.preventDefault();
        let cardnumber = document.getElementById('cardNumber').value;
        let cardcvv = document.getElementById('cardCvv').value;

        if (cardnumber === '1234 5678 9102 3456' && cardcvv === '123') {
            showPSuccess();
            // now set cart total to zero, together with chosen products
            let total = 0;
            localStorage.setItem('chosenProducts', '') // will assign '' - empty string
            row.textContent = '';
            // hiding the elements upop successful checkout
            row.classList.remove('d-block');
            row.classList.add('d-none');
            productCatalogue.classList.remove('d-block');
            productCatalogue.classList.add('d-none');
            // makes sure that when we go to another page the total is zero 
            localStorage.setItem('checkout', total);
            document.querySelector('#checkout').textContent = total;

        } else {
            showPFailure();

        }
    }

    // shorthand to show Payment Failure
    function showPFailure() {
        paymentFailure.classList.remove('d-none');
        paymentFailure.classList.add('d-block');
        paymentSuccess.classList.remove('d-block');
        paymentSuccess.classList.add('d-none');
    }

    function showPSuccess() {
        paymentFailure.classList.remove('d-block');
        paymentFailure.classList.add('d-none');
        paymentSuccess.classList.remove('d-none');
        paymentSuccess.classList.add('d-block');
    }
})();






