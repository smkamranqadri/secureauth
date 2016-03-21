var jwt = require('jwt-simple');

var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';
    console.log(req.body);
    console.log(username);
    console.log(password);
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    if (dbUserObj) {

      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(genToken(dbUserObj));
    }

  },

  validate: function(username, password) {
    if (username == 'mk@local.com' && password == 'mk') {
        var dbUserObj = { // spoofing a userobject from the DB.
          name: 'mk',
          role: 'admin',
          username: 'mk@local.com'
        };
        return dbUserObj;
    } else {
        return false;
    }
  },

  validateUser: function(username) {
    if (username == 'mk@local.com') {
        var dbUserObj = { // spoofing a userobject from the DB.
            name: 'mk',
            role: 'admin',
            username: 'mk@local.com'
        };
        return dbUserObj;
    } else {
        return false;
    }
  },
};

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
