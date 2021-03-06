var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '[Mongo] Connection error ..'));
    db.once('open', function callback() {
        console.log('[Mongo] Connection established');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
        return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }}

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'Martin');
            User.create({ firstName: 'Martin', lastName: 'Lindgren', username: 'Marreo', salt: salt, hashed_pwd: hash });

            salt = createSalt();
            hash = hashPwd(salt, 'Joe');
            User.create({ firstName: 'Joe', lastName: 'DePasco', username: 'JoeP', salt: salt, hashed_pwd: hash });

            salt = createSalt();
            hash = hashPwd(salt, 'Helge');
            User.create({ firstName: 'Helge', lastName: 'Svensee', username: 'Holger', salt: salt, hashed_pwd: hash });
        }
    })
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}