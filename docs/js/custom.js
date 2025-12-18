(() => {
    let loginLogoutEl = document.getElementById('loginlogout');
    let isLoggedIn = localStorage.getItem('loggedIn');

    // Functionality if checkout button pressed
    let checkoutBtn = document.getElementById('checkout__btn');
    checkoutBtn.addEventListener('click', checkoutClicked);

    // Functionality for subscription to newsletter
    let subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.addEventListener('submit', subscribeNewsletter)


    // This is <ul> which wraps <li>
    let loginList = document.getElementById('loginList');

    // This is the <li> which wraps <a> with text User Details
    let loginListItem = document.getElementById('loginListItem')
    // check if user is logged in or logged out..
    checkLoginStatus()

    // add a listener for log in / logout if such a button id is pressed
    loginLogoutEl.addEventListener('click', handleLogging);

    function checkLoginStatus() {
        // set the checkout figure
        if (typeof (localStorage.getItem('checkout')) === 'undefined' || localStorage.getItem('checkout') === null) {
            localStorage.setItem('checkout', '0');
        }

        // If the Key does not exist, set it
        if (typeof (isLoggedIn) === 'undefined' || isLoggedIn === null) {
            localStorage.setItem('loggedIn', '0');

            isLoggedIn = localStorage.getItem('loggedIn');
        }



        if (isLoggedIn === '1') {
            // change the text from Login to Logout
            loginLogoutEl.textContent = 'Logout';
            loginList.appendChild(loginListItem);
            // Only if the user is registered, they can see the amount of products in cart

            let checkout = localStorage.getItem('checkout');

            document.querySelector('#checkout').textContent = checkout;

            // if the person is logged in, saving their details in localStorage FOR THE FIRST TIME just like in userdetails.js from userdetails.json
            (async () => {
                    try {
                        if (typeof (localStorage.userDetails) === 'undefined' || localStorage.getItem('userDetails') === null) {
                            const response = await fetch('/assets/userdetails.json');
                            const data = await response.json();


                            let userDetails = {}; // Then saving to Local Storage
                            userDetails.firstName = data.firstName;
                            userDetails.lastName = data.lastName;
                            userDetails.dob = data.dob;
                            userDetails.address1 = data.address1;
                            userDetails.address2 = data.address2;
                            userDetails.address3 = data.address3;
                            localStorage.setItem('userDetails', JSON.stringify(userDetails));
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
            })();
        } else {
            loginLogoutEl.textContent = 'Login';
            // Removing the <li> - the "bullet" from the list together with its contents
            // ONLY IF <ul> does not have <li> removed ALREADY

            loginList.removeChild(loginListItem);



        }

    }

    function handleLogging(event) {
        event.preventDefault();
        // if user is logged in them log them out and redirect to home page
        if (isLoggedIn === '1') {
            localStorage.setItem('loggedIn', '0');

            window.location.href = "index.html";
        } else {
            window.location.href = "login.html";
        }
    }

    function checkoutClicked() {
        localStorage.setItem('checkoutBtn', '1');
    }

    function subscribeNewsletter(event) {
        event.preventDefault();
        subscribeForm.classList.add('bg-success', 'text-white', 'fw-bold', 'p-2', 'border', 'border-success', 'rounded');
        subscribeForm.textContent = 'You have been added to our newsletter'
    }



})();








