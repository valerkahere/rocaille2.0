const currencyStyling = {
  style: 'currency',
  currency: 'EUR'
};
const price = 22;

function displayPrice(locale) {
    console.log(
        `${new Intl.NumberFormat((locale), currencyStyling).format(price)}`
    );
}

displayPrice("IR");




//let data = JSON.parse(products);
//console.log(data);
async function loadProducts() {
  try {

  } catch(error) {
    console.error(`Could not load products: ${error}`);
  }
  const response = await fetch('/assets/products.json');
  const data = await response.json();
  console.log(data);
}

loadProducts();
