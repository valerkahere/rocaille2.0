(() => {
    let loggingStatus = document.getElementById('loginlogout');
    let isLoggedIn = localStorage.getItem('loggedIn');
    // This is <ul> which wraps <li>
    let loginList = document.getElementById('loginList');
 
    // This is the <li> which wraps <a> with text User Details
    let loginListItem = document.getElementById('loginListItem')
    // check if user is logged in or logged out..
    checkLoginStatus()

    // set the checkout figure
    if ((typeof(localStorage.getItem('checkout')) !== 'undefined' && localStorage.getItem('checkout').length !== 0 && localStorage.getItem('checkout') !== "unknown" && localStorage.getItem('checkout') !== 'null')) {  
        localStorage.setItem('checkout', 0);
    }
    let checkout = localStorage.getItem('checkout');
    document.querySelector('#checkout').textContent = checkout;

    


    // add a listener for log in / logout if such a button id is pressed
    loggingStatus.addEventListener('click', handleLogging);
    
    function checkLoginStatus() {
        
        // If the Key does not exist, set it
        if (typeof(isLoggedIn) === 'undefined' && isLoggedIn.length === 0 && isLoggedIn === "unknown" && isLoggedIn === null) {
            localStorage.setItem('loggedIn', '0');
            isLoggedIn = localStorage.getItem('loggedIn');
        }

        
        
        if (isLoggedIn === '1' ) {
            // change the text from Login to Logout
            loggingStatus.textContent = 'Logout';
            loginList.appendChild(loginListItem);
        } else {
            loggingStatus.textContent = 'Login';
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

    
    

})();








