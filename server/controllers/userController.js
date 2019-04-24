// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const user = require('../models').user;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import User from '../models/user';
import model from '../models';
const {user} = model;

export async function create(req, res, next) {
    // // const body = filteredBody(req.body, constants.WHITELIST.users.create);
    // try {
    //   const user = await User.create(body);
    //   return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
    // } catch (e) {
    //   e.status = HTTPStatus.BAD_REQUEST;
    //   return next(e);
    // }

    //sign up
        if(!req.body.name|| !req.body.username|| !req.body.email|| !req.body.password){
          res.send("username/password/name/email cannot be null")
        }else{
          user.findOne({where : {username : req.body.username}})
          .then(found => {
            if(found){
              res.status(400).send({message : 'username already exists'})
            }else{
              return user
              .create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                // password: _hashPassword(req.body.password),
                password: bcrypt.hashSync(req.body.password, 8),
              })
              .then(user => res.status(201).send(user))
              .catch(error => res.status(400).send(error));
            }
          })
        }
  }

  //login
  export async function login(req, res, next) {
    console.log(req.user);
    res.status(200).json(req.user.toAuthJSON());
    return next();
}

//list all users
export async function list(req,res){
  return user
      .findAll().then(user => {
          res.send(user);
      });
}

//delete a user by id
export async function destroy(req, res){
  if(!req.body.id){
    return res.status(400).send({
      message: 'invalid input'
    });
  }else{
    user.destroy({ 
      where : {id : req.body.id}
    })
    .then(data => {
      if(!data){
       res.status(400).send({
          message: 'invalid user id'
        });
      }else{
        res.send({
          message: 'deleted successfully'
        });
      }
    })
  }
}