module.exports = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['token'] || req.headers['authorization'];
    if (token) {
        var parts = token.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
              credentials = parts[1];
      
            if (/^Bearer$/i.test(scheme)) {              
              commonService.jwtVerify(credentials, function (err, result) {
                if (err) {
                  console.log(err.message);
                  commonService.sendCustomResult(req, res, 'AUTH_ERROR', 'TOKEN_EXPIRED');                                  
                }
                req.token = result; // This is the decrypted token or the payload you provided
                next();
              });
            } else {
                commonService.sendCustomResult(req, res, 'AUTH_ERROR', 'INVALID_TOKEN');                
            }
          } else {
            commonService.sendCustomResult(req, res, 'AUTH_ERROR', 'INVALID_TOKEN');            
          }
    } else {
        commonService.sendCustomResult(req, res, 'BAD_REQUEST', 'MISSING_HEADER');                    
    }
}