const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const passport = require('passport');

const renderRegister = (req, res) => {
    res.render('register');
};

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.redirect('/auth/login');
    } catch (error) {
        res.status(500).send('Error registering new user.');
    }
};

const renderLogin = (req, res) => {
    res.render('login');
};

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/blogs');
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
};

module.exports = {renderRegister, register, renderLogin, login, logout}