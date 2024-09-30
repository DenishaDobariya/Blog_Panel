const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const saltRounds = 8;

const renderRegister = (req, res) => {
    res.render('register');
};

const register = async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hashPass) {
            console.log("hashed Password : ", hashPass);

            if (!err) {
                const signUpUser = await new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPass
                });
                console.log("USER", signUpUser);
                const createdUser = await signUpUser.save();
                console.log("SignUp user : ", createdUser);
                res.redirect('/login');
            }
            else{
                console.error("Error hashing password:", err);
                return res.redirect('/register'); 
            }
        });
    } 
    else {
        console.log("Passwords do not match.");
        res.redirect('/register');
    }
};

const renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("user is already login");
        res.redirect('/blogs'); 
    } else {
        console.log("please login...");
        res.render('login'); 
    }
};

const login = (req, res) => {
    console.log("success login..."); 
    res.redirect('/blogs'); 
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); } 
        res.redirect('/login'); 
    });
};

module.exports = { renderRegister, register, renderLogin, login, logout };
