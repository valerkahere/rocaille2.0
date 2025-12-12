// IIFE will execute on page load
(() => {
  // Initially hide the error element
  let loginError = document.getElementById('loginerror');
  loginError.classList.remove('d-block');
  loginError.classList.add('d-none')
  document.getElementById('user-login').addEventListener('submit', checkLogin)
  // wait for submit button to be clicked on login form - 
    // this code only invoked if login form submit button clicked
    
  function checkLogin(event) {
  let email = document.getElementById('emailAddressID').value;
    let password = document.getElementById('passwordID').value;
    if (email === 'example@gmail.com' && password === '202020')  {   
        // successful login, user redirected to shop.html
        localStorage.setItem('loggedIn', '1');    
        window.location.href = 'shop.html';  // redirect to shop page
    }
    else {
        // login unsuccessful, error message appears
        localStorage.setItem('loggedIn', 0);

        loginError.classList.remove('d-none');
        loginError.classList.add('d-block');
    }
    event.preventDefault();
  }
})();






