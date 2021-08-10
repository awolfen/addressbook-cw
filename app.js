// Contact constructor
function Contact(name, surname, phoneNumber, address) {
    this.name = name,
        this.surname = surname,
        this.phoneNumber = phoneNumber,
        this.address = address
};

// Array in which to store contacts
var contactArr = [];

// Update UI with contactArr 
const updateUI = (contacts) => {
    // Sort contacts alphabetically
    let sortedContacts = contacts.sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();
        if (aName < bName) { return -1; };
        if (aName > bName) { return 1; };
        return 0;
    });
    const list = document.getElementById('contact-list');
    let tableRows = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th></th>
            </tr>
        </thead>
    `;
    sortedContacts.forEach(contact => {
        tableRows += `<tr><td>${contact.name}</td><td>${contact.surname}</td><td class="contact-phone-number">${contact.phoneNumber}</td><td>${contact.address}</td><td><a href='#' class='delete'>Delete</a></td></tr>`;
    });
    list.innerHTML = tableRows;
    setNumberOfContacts();
};

// Update number of contacts
const setNumberOfContacts = () => {
    const display = document.querySelector('.num-of-contacts');
    display.innerHTML = (contactArr.length === 1) ? '1 Contact' : `${contactArr.length} Contacts`;
}

// Alert handling
const showAlert = (msg, className) => {
    //create div element
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.container');
    const form = document.getElementById('contact-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3s
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
};

// Clear form fields
const clearFields = () => {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('address').value = '';
};

// Toggle contact form
const toggleForm = () => {
    document.getElementById('add-contact-button').classList.toggle('button-primary');
    document.getElementById('contact-form').classList.toggle('hidden');
};

//Event Listener for add contact button
document.getElementById('add-contact-button').addEventListener('click', function () {
    toggleForm();
});

// Event Listener to add contact
document.getElementById('contact-form').addEventListener('submit', function (e) {
    // get form values
    const name = document.getElementById('name').value,
        surname = document.getElementById('surname').value,
        phoneNumber = document.getElementById('phoneNumber').value,
        address = document.getElementById('address').value;

    //instantiate contact
    const contact = new Contact(name, surname, phoneNumber, address);

    // Validation
    // Require at least a name and number
    if (name === '' || phoneNumber === '') {
        showAlert('Please provide both a name and phone number', 'error');
        // Ensure Phone number is unique
    } else if (contactArr.some(contact => { return contact.phoneNumber === phoneNumber })) {
        showAlert('That phone number already belongs to a contact', 'error');
    } else {
        // Add contact to contactArr
        contactArr.push(contact);
        // Update ui
        updateUI(contactArr);
        // Clear fields
        clearFields();
        // Close contact form
        toggleForm();
    }

    e.preventDefault();
});

// Event listener for delete contact
document.getElementById('contact-list').addEventListener('click', function (e) {
    // Confirmation
    var result = confirm('Are you sure?');
    if (result) {
        // Find contact phoneNumber
        let num = e.target.parentNode.previousSibling.previousSibling.innerHTML;
        // Filter contactArr to remove by phoneNumber
        contactArr = contactArr.filter(contact => contact.phoneNumber != num);
        // Success alert
        showAlert('Contact Deleted', 'success');
        // Update ui
        updateUI(contactArr);
    }
});

// Event listener for search bar filter function
document.getElementById('contact-search').addEventListener('keyup', function () {
    const query = this.value.toLowerCase();
    // Update ui with temp array where the query is included in either name or surname
    updateUI(contactArr.filter(contact => {
        return contact.name.toLowerCase().includes(query) || contact.surname.toLowerCase().includes(query);
    }));
});

