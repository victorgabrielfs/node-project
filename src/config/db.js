var tp = require('tedious-promises')



var config = 
    {
        "userName": "user_trial",
        "password": "7412LIVE!@#$&*()",
        "server": "virtual2.febracorp.org.br",
        "options": {
        "port": 1433,
          "database": "CONTOSO",
          "encrypt": false,
        }
      }

tp.setConnectionConfig(config);

module.exports = tp;