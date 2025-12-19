// IIFE will execute on page load
(() => {
  // Initially hide the errors elements
  let loginError = document.getElementById('loginerror');
  loginError.classList.remove('d-block');
  loginError.classList.add('d-none');

  let checkoutError = document.getElementById('checkoutError');
  checkoutError.classList.remove('d-block');
  checkoutError.classList.add('d-none')

  // Notify the user that they need to log in if they pressed checkout
  if (localStorage.getItem('checkoutBtn') !== null && localStorage.getItem('checkoutBtn') === '1') {
    checkoutError.classList.remove('d-none');
    checkoutError.classList.add('d-block');
    localStorage.setItem('checkoutBtn', '0');
  } else {
    localStorage.setItem('checkoutBtn', '0');
  }
  

  document.getElementById('user-login').addEventListener('submit', checkLogin)
  // wait for submit button to be clicked on login form - 
    // this code only invoked if login form submit button clicked
    
  function checkLogin(event) {
  let email = document.getElementById('emailAddressID').value;
    let password = document.getElementById('passwordID').value;
    if (email === 'example@gmail.com' && password === '123456')  {   
        // successful login, user redirected to shop.html
        localStorage.setItem('loggedIn', '1');    
        window.location.href = '/shop';  // redirect to shop page
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






