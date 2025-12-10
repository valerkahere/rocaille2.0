// Declaring class lists for styling
const rowClassList = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center my-1';
const cardClassList = 'card h-100'; // h-100 makes tthem equal height!
const cardBodyClassList = 'card-body vstack gap-1'; // vstack is shorthand for d-flex flex-column - vertical flex column
const cardTitleClassList = 'card-title';
const cardTextClassList = 'card-subtitle'; // controlling line clamping through CSS
const smallTextClassList = 'text-body-secondary';
const buttonClassList = 'btn btn-primary mt-auto'; // margin-top auto makes sure buttons are aligned in the bottom



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
      console.log(data.products);
      renderCards(data, catalogueContainer, row);
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
        cardText.textContent = `${product.description.substring(0, 50)}...`;
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

function ApplyStyles(element, customClassList) {
  const splitClassList = customClassList.split(' ');
  splitClassList.forEach(className => {
    element.classList.add(className);
  });
}
