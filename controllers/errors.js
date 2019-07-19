module.exports = {
    notfound: (req,res) => {
        commonService.sendCustomResult(req,res,'NOT_FOUND','INVALID_REQUEST');
    }
}