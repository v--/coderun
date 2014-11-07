axios.get('/application.js').then(function (response) {
    var script = response.data;
    eval(response.data);
}).catch(function (response) {
    toastr.error(null, 'Could not load the game :(');
});
