(async () => { // using async function to fetch saved user details from JSON
    try {

        // Getting the elements
        const fName = document.getElementById("firstNameID");
        const lName = document.getElementById("lastNameID");
        const DOB = document.getElementById("dobID");
        const addressOne = document.getElementById("address1ID");
        const addressTwo = document.getElementById("address2ID");
        const addressThree = document.getElementById("address3ID");
        // If there is nothing in localStorage, load the data from JSON file
        if (typeof (localStorage.userdetails) === 'undefined' || localStorage.getItem('userDetails') === null) {
            const response = await fetch('/json/userdetails.json');
            const data = await response.json();



            fName.value = data.firstName; // Displaying for the user
            lName.value = data.lastName;
            DOB.value = data.dob;
            addressOne.value = data.address1;
            addressTwo.value = data.address2;
            addressThree.value = data.address3;

            let userDetails = {}; // Then saving to Local Storage
            userDetails.firstName = data.firstName;
            userDetails.lastName = data.lastName;
            userDetails.dob = data.dob;
            userDetails.address1 = data.address1;
            userDetails.address2 = data.address2;
            userDetails.address3 = data.address3;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
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

            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            event.preventDefault();
        }
    }
    catch (error) {
        console.log(error);
     }
})();




