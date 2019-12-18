const otherTitle = $('#other-title');
const title = $('#title');
const color = $('#color');
const colorOptions = $('#color option');
const checkboxes = $(':checkbox');

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

checkboxes.change((e) => {
    const clicked = e.target;
    
});