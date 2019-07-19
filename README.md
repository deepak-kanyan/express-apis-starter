# express-apis-starter
Create express REST apis 


## Installation

Take git clone of the repo

```bash
git clone https://github.com/deepak-kanyan/express-apis-starter
cd express-apis-starter && npm install
node app.js
```
# Features included
1. JWT(JSON Web Token) 
2. Swagger
3. Express validator
4. Email templates with node mailer
5. Paginator
6. OTP email verification
7. Bcrypt for password encryption
8. Mongoose as ODM for MongoDB 
9. i18n for locales


## Environment variables
PORT=1338 On which port you want to start the server.

TOKEN_SECRET='somevalue' for jwt secret

EMAIL_SERVICE='smtp.gmail.com'  for node mailer smtp details

EMAIL_PORT='465' for email service

EMAIL_USER='someuser@gmail.com' smtp user account 

EMAIL_PASSWORD='somepassword'  smtp user password

FROM_EMAIL='name@yourwebsite.com' from email 

## How to change the database
Go to configs/database.js and change database connection string

var mongoDB = 'mongodb://localhost/databasename';

## APIS ready to use
1. Login with email
2. Signup with email
3. OTP verification
4. All users listing

## How to use code

How to use swagger:

Start the server node app.js and navigate to browser

http://localhost:1338/api-docs

How to change swagger configuration

configs/swagger.js

How to change routes 


routes/

How to send custom result from any controller function

commonService.sendCustomResult(req, res, 'STATUS_CODE_KEY', 'MESSAGE_KEY_OF_LOCALE_FILE',DATA);

Where to find STATUS_CODE_KEY

services/common.js and there is a list of REST status codes in codeList.

Where to find MESSAGE_KEY_OF_LOCALE_FILE

configs/locales/en.json add new key-value for new messages.

The last parameter(DATA) of sendCustomResult function is optional or you can send array or object. 

How to change API response

services/common.js and change the function sendCustomResult as per requirement.




## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)