(() => {
    let contactForm = document.getElementById('form');

    contactForm.addEventListener('submit', submitForm);

    function submitForm(event) {
        event.preventDefault();
        

        
        let paragraph = document.createElement('p');
        paragraph.textContent = `Successfully sent the message! `;
        let link = document.createElement('a');
        link.textContent = `Click here to go back to Home page`;
        link.href = '/';

        paragraph.classList.add('bg-success', 'text-white', 'fw-bolder', 'p-2', 'border',  'border-success', 'rounded');
        link.classList.add('text-white', 'fw-bold', 'p-2');

        paragraph.appendChild(link);
        contactForm.textContent = '';
        contactForm.appendChild(paragraph);
    }
})();