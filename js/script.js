// Initial Variables
const otherTitle = $('#other-title');
const title = $('#title');
const color = $('#color');
const colorOptions = $('#color option');
const checkboxes = $(':checkbox');
let eventTotal = 0;
const activities = $('#activities');
const totalDiv = 
`
<div><p id="eventTotal">Total: $${eventTotal}</p></div>
`;

$('#name').focus(); //Start page focused on name input

// Hide the other title input. Then make it appear when "other" is selected
otherTitle.hide();
title.change(function() {
    if (title.val() === 'other') {
        otherTitle.show();
    } else if (otherTitle.show() && title.val() !== 'other') {
        otherTitle.hide();
    }
});

// Hide the color select options
$('label[for="color"]').hide();
color.hide();

// Make color options appear and change based on theme selected
$('#design').change( (e) => {
    $('#design option').eq(0).hide();
    $('label[for="color"]').show();
    color.show();
    colorOptions.hide();
    if ($(e.target).val() === 'js puns') {
        
        colorOptions.each((i) => {
            if (i <= 2) {
                colorOptions.eq(i).show();
            }
        });
        colorOptions.eq(0).prop('selected', true);
    } else if ($(e.target).val() === 'heart js') {
        colorOptions.each((i) => {
            if (i >= 3) {
                colorOptions.eq(i).show();
            }
        });
        colorOptions.eq(3).prop('selected', true);
    }
});


activities.append(totalDiv); //Place "Total" div at the bottom of activities checkboxes

// Set up valid/invalid messaging for activities secton
activities.after(`<p id="invalidActivity" class="invalid">&#10007; Please choose at least one activity</p>`)
activities.after(`<p id="validActivity" class="valid">&#10003; We look forward to seeing you there!</p>`);
const invalidActivity = $('#invalidActivity');
const validActivity = $('#validActivity');
invalidActivity.hide();
validActivity.hide();

// Listens to activities checkboxes. Adds totals up per selected activities
// Also checks times and disables conflicting activities
checkboxes.change((e) => {
    const clicked = e.target;
    const selectedTime = e.target.dataset.dayAndTime;
    let eventPrice = parseInt(clicked.dataset.cost);
    const totalUpdate = $('#eventTotal');
    if ($(e.target).prop('checked')) {
        eventTotal += eventPrice;
    } else {
        eventTotal -= eventPrice;
    }
    totalUpdate.html(`<div><p id="eventTotal">Total: $${eventTotal}</p></div>`);
    checkboxes.each((i) => {
        const eventTime = checkboxes[i].dataset.dayAndTime;
        if (checkboxes[i] !== clicked && selectedTime === eventTime) {
           if (checkboxes[i].getAttribute('disabled') !== 'true') {
            checkboxes[i].setAttribute('disabled', true);
           } else {
            checkboxes[i].removeAttribute('disabled');
           }
        }
    });
    if (invalidActivity.show()) {
        invalidActivity.hide();
        validActivity.show();
    }
    if (eventTotal === 0) {
        if (validActivity.show()) {
            validActivity.hide();
        }
        invalidActivity.show();
    }   
});

// Variables for payment section
const creditCard = $('#credit-card');
const paypal = $('#paypal');
const bitcoin = $('#bitcoin');
const payment = $('#payment');
const paymentOptions = $('#payment option');

// Hide "Select Payment" and make "Credit Card" selected
// Also hides "paypal" and "bitcoin" divs
paymentOptions.eq(0).hide();
paymentOptions.eq(1).prop({selected: true});
paypal.hide();
bitcoin.hide();

// Listens to payment select. Shows information based on what's selected
payment.change(() => {
 if (payment.val() === 'credit card') {
    creditCard.show();
    paypal.hide();
    bitcoin.hide();
 } else if (payment.val() === 'paypal') {
    creditCard.hide();
    paypal.show();
    bitcoin.hide();
 } else if (payment.val() === 'bitcoin') {
    creditCard.hide();
    paypal.hide();
    bitcoin.show();
 }
});


// Variables for custom form validation
const name = $('#name');
const validText = `<p class="valid">&#10003; Looks great!</p>`; //Sets text for valid message
name.after(`<p id="invalidName" class="invalid">&#10007; Please enter your name</p>`);
name.after(validText);
const validName = $('.valid').eq(0);
const invalidName = $('#invalidName');
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i;
const email = $('#mail');
email.after(`<p id="invalidEmail" class="invalid">&#10007; Please enter a vaild email</p>`);
email.after(validText);
const invalidEmail = $('#invalidEmail');
const validEmail = $('.valid').eq(1);
const ccNum = $('#cc-num');
const ccRegex = /^[\d]{13,16}$/;
ccNum.after(`<p id="invalidCCNum" class="invalid">&#10007; Please enter a vaild CC Number(without dashes)</p>`);
ccNum.after(validText);
const invalidCCNum = $('#invalidCCNum');
const validCCNum = $('.valid').eq(3);
const zip = $('#zip');
const zipRegex = /^[\d]{5}$/;
zip.after(`<p id="invalidZip" class="invalid">&#10007; Please enter a 5 digit Zip Code</p>`);
zip.after(validText);
const invalidZip = $('#invalidZip');
const validZip = $('.valid').eq(4);
const ccv = $('#cvv');
const ccvRegex = /^[\d]{3}$/;
ccv.after(`<p id="invalidCCV" class="invalid">&#10007; Please enter a 3 digit CCV</p>`);
ccv.after(validText);
const invalidCCV = $('#invalidCCV');
const validCCV = $('.valid').eq(5);

// Hide validation messages
validName.hide();
invalidName.hide();
validEmail.hide();
invalidEmail.hide();
invalidCCNum.hide();
validCCNum.hide();
invalidZip.hide();
validZip.hide();
invalidCCV.hide();
validCCV.hide();

// Function to show messages when validation is false
function invalidMessage(invalid, valid) {
    if (invalid.hide()) {
        invalid.show();
    }
    if (valid.show()) {
        valid.hide();
    }
}

// Function to show messages when validation is true 
function validMessage(invalid, valid) {
    if (invalid.show()) {
        invalid.hide();
    }
    valid.show();
}

// Event listeners for input values. This allows for "live" validation
name.on('input', () => {
    if (name.val() === '') {
        invalidMessage(invalidName, validName);
    } else {
        validMessage(invalidName, validName);
    }
});

email.on('input', () => {
    if (!emailRegex.test(email.val())) {
        invalidMessage(invalidEmail, validEmail);
    } else {
        validMessage(invalidEmail, validEmail);
    }
})

ccNum.on('input', () => {
    if (!ccRegex.test(ccNum.val())) {
        invalidMessage(invalidCCNum, validCCNum);
    } else {
        validMessage(invalidCCNum, validCCNum);
    }
});

zip.on('input', () => {
    if (!zipRegex.test(zip.val())) {
        invalidMessage(invalidZip, validZip);
    } else {
        validMessage(invalidZip, validZip);
    }
});

ccv.on('input', () => {
    if (!ccvRegex.test(ccv.val())) {
        invalidMessage(invalidCCV, validCCV);
    } else {
        validMessage(invalidCCV, validCCV);
    }
})

// Function for when the form is invalid on submit
function invalidSubmit(event, invalid) {
    event.preventDefault();
    invalid.show();
}

// Listener on submit to check for validation and show messages when it's found false
$('form').on('submit', (e) => {
    if (name.val() === '') {
        invalidSubmit(e, invalidName);
    }
    if (!emailRegex.test(email.val())) {
        invalidSubmit(e, invalidEmail);
    }
    if (eventTotal === 0) {
        invalidSubmit(e, invalidActivity);
    }
    if (payment.val() === 'credit card') {
        if (!ccRegex.test(ccNum.val())) {
            invalidSubmit(e, invalidCCNum);
        }
        if (!zipRegex.test(zip.val())) {
            invalidSubmit(e, invalidZip);
        }
        if (!ccvRegex.test(ccv.val())) {
            invalidSubmit(e, invalidCCV);
        }
    }
})

