let powerButton = document.querySelector('.power-btn');
let blankScreen = document.querySelector('.blank');
let blurScreen = document.querySelector('.blur');
let apps = document.querySelectorAll('.app');
let errorNotification =  document.querySelector('.error');
let back = document.querySelector('.back-btn');

powerButton.addEventListener('click', function() {
    if (blankScreen.style.display == 'none') {
        blankScreen.style.display = 'block';
    } else {
        blankScreen.style.display = 'none';
    }
});

apps.forEach(function(app) {
    app.addEventListener('click', function() {
        blurScreen.style.display = 'block';
        errorNotification.style.display = 'block';
    });
});

back.addEventListener('click', function(){
    blurScreen.style.display = 'none';
    errorNotification.style.display = 'none';
});
