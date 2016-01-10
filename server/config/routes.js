var auth = require('./auth.js'),
    mongoose = require('mongoose');

module.exports = function(app) {

//Routing for partials - Handle "good looking" request and redirect to public sided views
app.get('/partials/*', function (req, res) {
    console.log('Partial View Request deteced: ' + 'partials/' + req.params[0] + "- Rendering redirect: " + '../../public/app/' + req.params[0]);
    res.render('../../public/app/' + req.params[0]);
    });
    
    app.post('/login', auth.authenticate);
    
// All requests - deliever index and then client-side routing
app.get('/', function (req, res) {
    console.log('Request deteced.');
    res.render('index');
    });
    
    app.post('/User', function (req, res) {
    
    var name = req.body.name;
    console.log('User Request deteced. ' + name);
    
    var User = mongoose.model('User');
    User.create({ firstName: 'Martin', lastName: 'Lindgren', username: name, salt: 'Nej', hashed_pwd: 'Ja' });

    
    });
}