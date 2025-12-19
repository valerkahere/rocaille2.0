
// load express
const express = require('express');
// load handlebars
const exphbs = require('express-handlebars');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    // use this layout by default - if you have different layout
    // for say home page - you can toggle this in your code
    defaultLayout: 'default',
    // set location of layouts
    layoutsDir: 'views/layouts',
    // set location of partials - header, footer, etc
    partialsDir: 'views/partials',
  })
);
// set the view engine to handlesbards
app.set('view engine', 'hbs');
// where to find all of the view
app.set('views',  'views');
// where to find static files - css, images, js
app.use(express.static('public'));

// home page or home route
app.get('/', (req, res) => {

  // set active or not for navigation
  state={'home' : true, contact : false}
  // set specifics for <head>
  head={
      "title": "Rocaille",
      "description": "Discover unique, handcrafted bead jewellery at Rocaille shop. Explore our collection of cheerful keychains and charming pieces, perfect for yourself or as a thoughtful gift.",
      "keywords": "handcrafted bead jewellery, unique keychains, Rocaille shop, beaded gifts, handmade accessories, bead art, Creeper keychain, Toothless keychain."
    }
  res.render('index', {state:state, head:head});
  // send this to terminal where node app is running
  console.log('home')

});

// products route
app.get('/shop', (req, res) => {
    state={'home' : false, shop : true}
    head={
      "title": "Products",
      "description": "Browse our lovely collection of handcrafted bead creations. Find cute animal keychains, including axolotls, bees, and more, all made with intricate craftsmanship and care.",
      "keywords": "animal keychains, bead axolotl, beaded bees, custom beadwork, handmade bead animals, wildlife inspired jewellery, Rocaille shop, bead art collection."
    }
    res.render('shop', { state:state, head:head});
    console.log('shop')
});

// our story route
app.get('/about', (req, res) => {
    state={'home' : false, about : true}
    head={
      "title": "About Us",
      "description": "Learn about the values and history behind Rocaille. Discover our commitment to quality, safety, and aesthetic harmony, and the French origin of our brand's name.",
      "keywords": "Rocaille brand story, quality craftsmanship, beadwork values, history of Rocaille, handmade jewellery philosophy, French Rocaille beads."
    }
    res.render('about', { state:state, head:head});
    console.log('about')
});

// contact route
app.get('/contact', (req, res) => {
    state={'home' : false, contact : true}
    head={
      "title": "Get In Touch",
      "description": "Get in touch with Rocaille shop. We'd love to hear from you for any questions, custom order inquiries, or just to say hello. Contact us directly via Instagram.",
      "keywords": "contact Rocaille, custom bead orders, bead jewellery inquiry, get in touch, handmade keychain questions, Rocaille Instagram"
    }
    res.render('contact', { state:state, head:head});
    console.log('contact')
});

app.get('/checkout', (req, res) => {
    const state = { home : false, checkout: true };
    const head = {
      "title": "Secure Checkout - Rocaille Shop",
      "description": "Complete your purchase securely. Review your cart, enter shipping details, and finalize your order for handmade bead jewellery and keychains.",
      "keywords": "checkout Rocaille, secure payment, bead jewellery purchase, complete order, shipping details, Rocaille shop"
    };
    res.render('checkout', { state: state, head: head });
    console.log('checkout');
});

app.get('/login', (req, res) => {
    const state = { home : false, login: true };
    const head = {
      "title": "Login to Your Account - Rocaille Shop",
      "description": "Access your Rocaille shop account to view your order history, manage your personal details, and track your current purchases.",
      "keywords": "login Rocaille, Rocaille account, sign in, user account, my orders, customer login"
    };
    res.render('login', { state: state, head: head });
    console.log('login');
});

app.get('/userdetails', (req, res) => {
    const state = { home : false, userdetails: true };
    const head = {
      "title": "Your Account Details - Rocaille Shop",
      "description": "View and manage your account information, including your order history, shipping addresses, and personal details at Rocaille shop.",
      "keywords": "user details, my account, Rocaille profile, manage address, order history, account settings"
    };
    res.render('userdetails', { state: state, head: head });
    console.log('userdetails');
});

// app.get("/submission", (req, res) => {
//   // Extracting all form fields from query parameters
//   const formDetails = {
//     fname: req.query.fname,
//     lname: req.query.lname,
//     email: req.query.email,
//     message: req.query.message
//   }

//   //Setting State and head for the submission page
//   state = {home: false, contact: false, submission: true};
//   head = {
//     title: "Message Received",
//     description: "Your message has been received, thanks for reaching out",
//     keywords: "contact, submission"
//   };

//   // Rendering the submission page and displaying the message to the console for debugging
//   res.render('submission', {formDetails:formDetails, state:state, head:head});
//   console.log('submission received:', formDetails);


// });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});