// Declaring class lists for styling
const rowClassList = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center my-1';
const cardClassList = 'card h-100'; // h-100 makes tthem equal height!
const cardBodyClassList = 'card-body vstack gap-1'; // vstack is shorthand for d-flex flex-column - vertical flex column
const cardTitleClassList = 'card-title cutoff-text__title'; // cutoff-text - custom CSS class for controlling how many lines of text shown (alternative to JS substring)
const cardTextClassList = 'card-subtitle cutoff-text__description';
const smallTextClassList = 'text-body-secondary';
const buttonClassList = 'btn btn-primary mt-auto add-to-cart'; // margin-top auto makes sure buttons are aligned in the bottom. add-to-cart is a custom class to target all cards buttons



// Loading JSON data from a local file (just like from as external API)
// using async IIFE function 
(async () => {
    try {
      // The container where the results will be displayed
      const catalogueContainer = document.getElementById('product-catalogue');

      // This is the "row" for bootstrap "columns", defines layout and centering
      const row = document.createElement('div');

      // Cleaning the variables
      catalogueContainer.textContent = '';
      row.textContent = '';

      

      const response = await fetch('/assets/products.json');
      const data = await response.json();

      renderCards(data, catalogueContainer, row);

      
      //
      let buttons = document.querySelectorAll('button.add-to-cart');
      buttons.forEach(button => {
        button.addEventListener('click', addItem);
      });
      //
      

      function addItem(event) {
        let total = localStorage.getItem('checkout');
        total++
        localStorage.setItem('checkout', total);
        
        document.getElementById('checkout').textContent = total;
        
        // Now after cards are rendered, make sure all "add to carts" are counted
        // if the button with a certain ID was clicked
        // save thid ID to an array
        // save the array to localStorage

        // if the array does not exist - create it
        // otherwise use the stored value
        if (typeof(localStorage.getItem('chosenProducts')) === 'undefined' || localStorage.getItem('chosenProducts') === null || localStorage.getItem('chosenProducts') === '') {
          var chosenProductsNew = [];
          chosenProductsNew.push(event.target.id);
          localStorage.setItem('chosenProducts', chosenProductsNew.toString());
        } else {
          let storedChosenProducts = localStorage.getItem('chosenProducts');
          let splitStoredChosenProducts = storedChosenProducts.split(',');
          splitStoredChosenProducts.push(event.target.id);
          // Updating the value with each addition
          localStorage.setItem('chosenProducts', splitStoredChosenProducts.toString()); // must convert array to string before saving in local storage
        }
        
        
         
        
      }

    } catch (error) {
      console.error(`Could not load products: ${error}`);
    }
    
    

  
  
})();

function renderCards(data, catalogueContainer, row) {
  
  ApplyStyles(row, rowClassList);
  catalogueContainer.appendChild(row);

  // Will go through each product
  data.products.forEach(product => {
    
      // 1) First, creating all the required elements: card, its container, contents
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

      const cardButton = document.createElement('button');
      cardButton.type = 'button';
      cardButton.textContent = "Add to cart";
      ApplyStyles(cardButton, buttonClassList);
      cardButton.id = `${product.id}`; // assigning a product id for each button to see which ones are chosen

      const cardPrice = document.createElement('small');
      ApplyStyles(cardPrice, smallTextClassList);



      // 2) Then, assigning (populating) appropriate values from data to elements - including error handling for all properties
      if (typeof(product.img) !== 'undefined' && product.img.length !== 0 && product.img !== "unknown") {
        image.src = product.img;
      }

      if (typeof(product.alt) !== 'undefined' && product.alt.length !== 0 && product.alt !== "unknown") {
        image.alt = product.alt;
      }

      if (typeof(product.productName) !== 'undefined' && product.productName.length !== 0 && product.productName !== "unknown") {
        cardTitle.textContent = product.productName;
      }

      if (typeof(product.description) !== 'undefined' && product.description.length !== 0 && product.description !== "unknown") {
        cardText.textContent = product.description;
      }

      if (typeof(product.price) !== 'undefined' && product.price.length !== 0 && product.price !== "unknown") {
        if (product.currency === "EUR" && typeof(product.currency) !== 'undefined' && product.currency.length !== 0 && product.currency !== "unknown") {
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
      cardBody.appendChild(cardButton);
  });


  
  
}

// Helper method to apply saved styles each by each - the way .classList.add function accepts them
function ApplyStyles(element, customClassList) {
  const splitClassList = customClassList.split(' ');
  splitClassList.forEach(className => {
    element.classList.add(className);
  });
}
