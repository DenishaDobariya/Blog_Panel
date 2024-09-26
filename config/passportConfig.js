const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (username, password, done) => {
        try {
            console.log("Passport authentication...", username);
            
            const user = await User.findOne({ email: username });
            console.log("User found:", user);

            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log("Error during password comparison");
                        return done(err);
                    }

                    if (result) {
                        console.log("Authentication successful");
                        return done(null, user); 
                    } else {
                        console.log("Incorrect password");
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            } else {
                console.log("User not found");
                return done(null, false, { message: 'User not found.' });
            }
        } catch (err) {
            console.error("Error in authentication:", err);
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, user); 
        } else {
            done(null, false); 
        }
    } catch (err) {
        console.error("Error during deserialization:", err);
        done(err);
    }
});

module.exports = passport;
