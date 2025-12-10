(async () => { // using async function to fetch saved user details
    const response = await fetch('/assets/userdetails.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    
    // Getting the elements
    const fName = document.getElementById("firstNameID");
    const lName = document.getElementById("lastNameID");
    const DOB = document.getElementById("dobID");
    const addressOne = document.getElementById("address1ID");
    const addressTwo = document.getElementById("address2ID");
    const addressThree = document.getElementById("address3ID");

    fName.value = data.firstName;
    lName.value = data.lastName;
    DOB.value = data.dob;
    addressOne.value = data.address1;
    addressTwo.value = data.address2;
    addressThree.value = data.address3;



    if (localStorage.getItem('userdetails') === null) {  
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        // let userDetails = {firstName:"Walter", lastName:"Mitty", dob:"1990-12-01",address1:"Buenos Ayres Drive", address2:"Strandhill", address3:"Co. Sligo"};
        localStorage.setItem('userdetails', JSON.stringify(userDetails));
        
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        document.getElementById("firstNameID").setAttribute('value', userDetails.firstName);
        document.getElementById("lastNameID").setAttribute('value', userDetails.lastName);
        document.getElementById("dobID").setAttribute('value', userDetails.dob);
        document.getElementById("address1ID").setAttribute('value', userDetails.address1);       
        document.getElementById("address2ID").setAttribute('value', userDetails.address2);
        document.getElementById("address3ID").setAttribute('value', userDetails.address3);
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. 
        // JSON.parse turns it back into an javascript object
        userDetails=JSON.parse(localStorage.getItem('userdetails'));
        document.getElementById("firstNameID").setAttribute('value',userDetails.firstName);
        document.getElementById("lastNameID").setAttribute('value',userDetails.lastName);
        document.getElementById("dobID").setAttribute('value',userDetails.dob);
        document.getElementById("address1ID").setAttribute('value',userDetails.address1);      
        document.getElementById("address2ID").setAttribute('value',userDetails.address2);
        document.getElementById("address3ID").setAttribute('value',userDetails.address3);
    }


    document.getElementById('userdetails').addEventListener('submit', updateUserDetails);


    function updateUserDetails(event) {
        // if the user updates the user details - we update the userDetails javascript object
        let userDetails={};
        userDetails.firstName = document.getElementById('firstNameID').value;
        userDetails.lastName = document.getElementById('lastNameID').value;
        userDetails.dob = document.getElementById('dobID').value;
        userDetails.address1 = document.getElementById('address1ID').value;   
        userDetails.address2 = document.getElementById('address2ID').value;
        userDetails.address3 = document.getElementById('address3ID').value; 
    
        // finally we convert the javascript object to a string with JSON.stringify and save it to localstorage
        localStorage.setItem('userdetails',JSON.stringify(userDetails));

        event.preventDefault();
    }
})();




