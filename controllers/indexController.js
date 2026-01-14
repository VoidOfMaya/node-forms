//import data
const usersStorage = require('../storages/userStorage.js')
//import tools:
const { query ,body, validationResult, matchedData } = require("express-validator");

//code:
//settup:
usersStorage.addUser({firstName: 'david',lastName: 'hanakabi', email: 'hanaka@gmail.com', age: 18, bio: ''});
usersStorage.addUser({firstName: 'maya',lastName: 'maza', email: 'mmm@gmail.com', age: 29, bio: ''});
usersStorage.addUser({firstName: 'lily',lastName: 'coleburn', email: 'coleburn@gmail.com', age: 38, bio: ''});
const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters';
const validateUser = [  //firstname
                        body("firstName").trim().isAlpha().withMessage(`First name ${alphaErr}`)
                        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
                        //lastname
                        body("lastName").trim().isAlpha().withMessage(`Last name ${alphaErr}`)
                        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
                        //email
                        body('email').trim().notEmpty().withMessage('Email is required')
                        .isEmail().withMessage('must be a valid email'),
                        //age
                        body('age').trim().notEmpty().isNumeric().withMessage('age is required,must be a number')
                        .isInt({min: 18, max: 120}).withMessage('age out of range'),
                        //bio
                        body('bio').trim().isLength({max: 200}).withMessage('bio must be shorter then 200 charachters'),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", { title: "Create user" });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};
const validateSearchData = [//name
                            query('name').optional({checkFalsy: true}).isAlpha().withMessage(` name must be a striing, error : ${alphaErr}`),
                            //email
                            query('email').optional({checkFalsy: true}).isEmail().withMessage('email must be valid')
];
exports.usersFindGet = [validateSearchData ,(req, res) =>{
    //validating  input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("search", {
        title: "find user",
        errors: errors.array(),
      });
    }
    //console.log(usersStorage.getUsers());
    const {name, email} = matchedData(req)
    console.log(`from controllers: looking for \nname: ${name} \nmail${email}`)
   
    res.render('search',{title: "Find user:", user: usersStorage.getByNameOREmail(name, email),})
    

}];