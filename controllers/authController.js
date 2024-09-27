const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const passport = require('passport'); 
const saltRounds = 8;

const renderRegister = (req, res) => {
    res.render('register');
};

const register = async (req, res) => {
    if (req.body.password == req.body.confirmPassword) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); 
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            await newUser.save(); 
            res.redirect('/login'); 
        } catch (error) {
            console.error("Error saving user:", error);
            res.redirect('/register'); 
        }
    } else {
        console.log("Passwords do not match.");
        res.redirect('/register'); 
    }
};

const renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/'); 
    } else {
        res.render('login'); 
    }
};

const login = (req, res) => {
    res.redirect('/blogs'); 
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); } 
        res.redirect('/login'); 
    });
};

module.exports = { renderRegister, register, renderLogin, login, logout };
