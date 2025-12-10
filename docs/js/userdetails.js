(async () => { // using async function to fetch saved user details
    // Getting the elements
    const fName = document.getElementById("firstNameID");
    const lName = document.getElementById("lastNameID");
    const DOB = document.getElementById("dobID");
    const addressOne = document.getElementById("address1ID");
    const addressTwo = document.getElementById("address2ID");
    const addressThree = document.getElementById("address3ID");
    // If there is nothing in localStorage, load the data from JSON file
    if (localStorage.userdetails === undefined || localStorage.userdetails === null) {
        const response = await fetch('/assets/userdetails.json');
        console.log(response);
        const data = await response.json();
        console.log(data);
        
        

        fName.value = data.firstName;
        lName.value = data.lastName;
        DOB.value = data.dob;
        addressOne.value = data.address1;
        addressTwo.value = data.address2;
        addressThree.value = data.address3;
    } // else if localStorage exists...
    else {
        // First, convert local storage data string to a JS object
        let userDetails = JSON.parse(localStorage.userdetails);

        // Then, assign the properties values of this JS object
        fName.value = userDetails.firstName;
        lName.value = userDetails.lastName;
        DOB.value = userDetails.dob;
        addressOne.value = userDetails.address1;
        addressTwo.value = userDetails.address2;
        addressThree.value = userDetails.address3;
    }
    

    document.getElementById('userdetailsForm').addEventListener('submit', updateUserDetails);

    // to get the item from local storage use
    // localstorage.[keyName]

    function updateUserDetails(event) {
        let userDetails = {};
        userDetails.firstName = fName.value;
        userDetails.lastName = lName.value;
        userDetails.dob = DOB.value;
        userDetails.address1 = addressOne.value;   
        userDetails.address2 = addressTwo.value;
        userDetails.address3 = addressThree.value;

        localStorage.setItem('userdetails',JSON.stringify(userDetails));
        
        event.preventDefault();
    }
})();




