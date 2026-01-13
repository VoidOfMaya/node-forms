//import data
const userData = require('../storages/userStorage.js')
//import tools:
const { body, validationResult, matchedData } = require("express-validator");

//code:
const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters';

const validateUser =[
    body('firstName').trim().isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`First name ${lengthErr}`),
    body('lastName').trim().isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`Last name ${lengthErr}`),    
]
exports.userListGet = (req,res) =>{
    res.render('index',{
        title: 'User list',
        users: userData.getUsers(),
    });
};
exports.userCreateGet = (req,res) =>{
    res.render('create',{
        title: 'Create user',
    });
};
exports.userCreatePost = [ validateUser, (req,res) =>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render('create',{
            title: 'Create user',
            errors: errors.array(),
        });
    }
    const{firstName, lastName} = req.body;
    userData.addUser({firstName, lastName});
    res.redirect('/');
}];