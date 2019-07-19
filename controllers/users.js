const Users = require('../models/users');
module.exports = {
    index: (req,res) => {       
        var options = {}        
        if(req.query.page != undefined && parseInt(req.query.page)){
            options.page = req.query.page;
        }
        if(req.query.limit != undefined && parseInt(req.query.limit)){
            options.limit = req.query.limit;
        }

        Users.paginate({role:'user'},options)
        .then(function(allUsers){
            commonService.sendCustomResult(req,res,'SUCCESS','USERS_FOUND_SUCCESSFULLY',commonService.paginateData(allUsers));
        })
        .catch(function(err){
            console.log('Error',err);
            commonService.sendCustomResult(req,res,'SERVER_ERROR','USERS_NOT_FOUND');
        });
    }
}