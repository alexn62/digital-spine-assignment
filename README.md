# Digital Spine Assignment

## Instructions to run: 

- To get started, clone this repo to your local machine:
```
git clone https://github.com/alexn62/digital-spine-assignment.git
```
- Navigate to the client folder and install all necessary dependencies
- Repeat this step for the server folder
```
npm install
```

### During development:
 - Create a ```.env.development``` file at the client folder level
 - Add the following line, choosing any port of your choice (3001 in this case): 
```
REACT_APP_API_URL=http://localhost:3001/api
```
 - Create a .env.dev file at the server folder level
 - Add the following lines (PORT need to match the port previously specified. Choose anything for DB_NAME and SESSION_SECRET):
```
PORT=3001
HOST=localhost
DB_PORT=27017
DB_NAME=
SESSION_SECRET=
```
 - Start a MongoDB process
 - Run ```npm start``` from the client folder
 - Run ```npm run start:dev``` from the server folder
 - Visit [http://localhost:3000](http://localhost:3000) in your browser

### For production:
 - Create a ```.env.production``` file at the client folder level
 - Add the following line, choosing any port of your choice (3001 in this case): 
```
REACT_APP_API_URL=http://localhost:80/api
```
 - Create a .env.prod file at the server folder level
 - Add the following lines (PORT need to match the port previously specified. Choose anything for DB_NAME and SESSION_SECRET):
```
PORT=3001
HOST=localhost
DB_PORT=27017
DB_NAME=
SESSION_SECRET=
```
 - Open Docker
 - Run ```docker build . -t {YOUR TAG}``` from the root level folder, choosing any tag you want
 - Run ```docker-compose up``` from the root level folder
 - Visit [http://localhost:80](http://localhost:80) in your browser
 - Note: If you changed the server port in your .env.production file, you will need to change line 15 in your ```docker-compose.yml``` file to expose a port other than 3001

## Server Tests
To run tests in the server folder please add a .env.test file with the following details:
```
PORT=3002
HOST=localhost
DB_PORT=27017
DB_NAME=
SESSION_SECRET=
```
- Note: Make sure to choose a different database name than prod and dev. (for example, add ```_test``` to it)
- In the server folder run:
- ```npm t```

## Postman collection
Please a variable ```url``` pointing to ```http://localhost:PORT``` to run queries against the API