const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');
const i18n = require("i18n");
const config = require('./configs/config')
const db = require('./configs/database')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const notFoundRoutes = require('./routes/notfound')
const commonService = require('./services/common');
var swagger = require('./configs/swagger');
global.commonService = commonService; 
i18n.configure(config.i18n);
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(i18n.init); // Use i18n globally
app.use(swagger);
// Default Route
app.all('/', (req, res) => {        
    commonService.sendCustomResult(req,res,'SUCCESS','WELCOME_MESSAGE');   
})


app.use(authRoutes); // For login and signup routes
app.use('/users',userRoutes);
app.use(notFoundRoutes); // This route should be in end of this file because it handle all the 404 requests
app.listen(config.PORT, () => console.log(`App listening on port ${config.PORT}`))