var express = require('express');

var router = express.Router();

var model = require('../models/index');


router.get('/', function(req, res, next) {
  model.User.findAll({})
    .then(users => res.json({
      error:false,
      data:users
    }))
    .catch(error => res.json({
      error:true,
      data: [],
      error: error
    }));
});

router.post('/', function(req, res, next){
  const {
    name,
    cpf,
    date_of_birth
  } = req.body;
  model.User.create({
    name: name,
    cpf: cpf,
    date_of_birth: date_of_birth
  })
  .then(user => res.status(201).json({
    error: false,
    data: user,
    message: "New user has been created :P"
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});

router.put('/', function(req, res, next){
  const user_id = req.params.id;
  const {name, cpf, date_of_birth} = req.body;
  model.User.update({
    name: name,
    cpf: cpf,
    date_of_birth: date_of_birth
  },{
    where:{
      id: user_id
    }
  })
  .then(user => res.status(201).json({
    error: false,
    message: "User has been updated :P"
  }))
  .catch(error => res.json({
    error: true,
    error: error
  }));
});

router.delete('/:id', function(req, res, next){
  const user_id = req.params.id;
  model.User.destroy({
    where:{
      id: user_id
    }
  })
  .then(user => res.status(201).json({
    error: false,
    message: "User has been deleted :P"
  }))
  .catch(error => res.json({
    error: true,
    error: error
  }));
});

module.exports = router;
