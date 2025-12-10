(() => {
  
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
            // now set cart total to zero
            let total = 0;
            // makes sure that when we go to another page the total is zero 
            localStorage.setItem('checkout', total); 

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






