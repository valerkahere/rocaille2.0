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

// decide the styling for cards with sample data
