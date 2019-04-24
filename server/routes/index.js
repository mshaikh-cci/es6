//API routes

// const userController = require('../controllers').user;
// const taskController = require('../controllers').task;
// const authservice = require('../services/auth-services');

// export default (app) => {
    // app.get('/api', (req, res) => res.status(200).send({
    //     message: 'Welcome to the Todos API!',
    //   }))

    //   //users
    //   app
    //   .route('/users')
    //   .post(userController.create)//create users 
// };

//or
// import express from 'express';
// const router = express.Router();


// import * as UserController from '../controllers/userController';
// import {authLocal, authJwt} from '../services/auth-services';
// import { Router } from 'express';
// const routes = new Router();

// routes.post('/signup',authLocal,UserController.create,);

// export default routes;

// app.post('/signup',UserController.create);

    

// app.get('/listallusers', authJwt, UserController.list);

// app.delete('/deleteuser', authJwt, UserController.destroy);



import * as UserController from '../controllers/userController';
import * as TaskController from '../controllers/taskController';
import {authLocal, authJwt} from '../services/auth-services';

export default (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
      }))
   
    app
    .route('/users')//user
    .post(UserController.create)//create user or sign up
    .get(authJwt, UserController.list)//list all users
    .delete(authJwt, UserController.destroy);//delete user

    app.post('/login',authLocal,UserController.login);//login

    app
    .route('/tasks')//task
    .post(authJwt, TaskController.createtaskfrombody)
    .get(authJwt, TaskController.listalltasks);
}





