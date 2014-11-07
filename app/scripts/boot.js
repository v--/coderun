window.onload = function() {
    var nested = document.createElement('h4');
    nested.innerHTML = 'JavaScript works!';
    document.querySelector('h1').appendChild(nested);
}
