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


## Environment variables
PORT=1338 On which port you want to start the server.

TOKEN_SECRET='somevalue' for jwt secret

EMAIL_SERVICE='smtp.gmail.com'  for node mailer smtp details

EMAIL_PORT='465' for email service

EMAIL_USER='someuser@gmail.com' smtp user account 

EMAIL_PASSWORD='somepassword'  smtp user password

FROM_EMAIL='name@yourwebsite.com' from email 

## How to change database
Go to configs/database.js and change database string

var mongoDB = 'mongodb://localhost/databasename';


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)