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

$('#name').focus();

otherTitle.hide();
title.change(function() {
    if (title.val() === 'other') {
        otherTitle.show();
    } else if (otherTitle.show() && title.val() !== 'other') {
        otherTitle.hide();
    }
});

$('label[for="color"]').hide();
color.hide();

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
    } else if ($(e.target).val() === 'heart js') {
        colorOptions.each((i) => {
            if (i >= 3) {
                colorOptions.eq(i).show();
            }
        });
    }
});


activities.append(totalDiv);
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
});

const creditCard = $('#credit-card');
const paypal = $('#paypal');
const bitcoin = $('#bitcoin');
const payment = $('#payment');
const paymentOptions = $('#payment option');

paymentOptions.eq(0).hide();
paymentOptions.eq(1).prop({selected: true});
paypal.hide();
bitcoin.hide();

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