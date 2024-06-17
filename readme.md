# SKYNET-15 


### Custom Build Tool for Express-PG-Sequelize-React Projects

- Express.js boilerplate with middlewares

- Sequelize models generation by schema file

- React-redux automatic setup

<br>

## USAGE

### Download package
> npm install -D skynet-15

### Build express server boilerplate
> npx skynet init "2"

__IMPORTANT NOTE:__ _Do not npm init before initializing skynet-15._ __Remove package.json__

### Modify schema.js file for sequelize modeling

_Modify template as necessary. If need more models, copy and add more into the exported object. If need less, remove the unused template._

```js
module.exports = {
    table1: {
        model_name: 'User',
        attributes: {
            email: 'string',
            password: 'string',
            role: 'string',
            age: 'integer'
        }
    },

    table2: {
        model_name: 'Content',
        attributes: {
            email: 'string',
            password: 'string',
            role: 'string',
            age: 'integer'
        }
    }
}
```

### Build Sequelize Models

> npx skynet build-model

__Modify sequelize files according to necessity:__

- Config File

- Models

- Migrations

### Build Database

> npx skynet build-db

<br>

## For React Client

### Initialize React Project

> npm create vite@latest

### Download package inside client directory

> npm install -D skynet-15

### Build React-Redux Boilerplate

> npx skynet build-client

