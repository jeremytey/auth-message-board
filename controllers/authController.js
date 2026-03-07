const passport = require('passport');
const bcrypt = require('bcrypt');
const auth = require('../db/queries/userQueries');

exports.getSignUpForm = (req, res) => {
    res.render('signupForm');
}

exports.submitSignUpForm = async (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const username= req.body.email;

    try{
        if (password !== confirmPassword){
            res.status(400).render('signupForm', {message:"password does not match"});
            return;
        }
        const existingUser = await auth.getUserByEmail(username);
        if (!existingUser){
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await auth.createUser(req.body.first_name, req.body.last_name, username, hashedPassword);
        
        req.login(user, (err) => {
            if (err) return next(err);
            res.redirect('/');
        });
        }  else {
            res.render('signupForm', {message: "Username already exists"});
        }
    } catch (err) {
        console.error(err);
        res.status(400).send('Unable to perform operation');
    }
}

exports.getLoginForm = (req, res) => {
    res.render('loginForm');
}

// Use passport to authenticate login form submission
exports.submitLoginForm = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            res.status(400).send('Unable to perform operation');
        } else {
            res.redirect('/');
        }
    }
    );
}

exports.getMemberPasscodeForm = (req, res) => {
    res.render('memberPasscode', {
    title: 'Join the Club',
    description: 'Enter the member passcode to unlock full membership.',
    action: '/passcode/member'
});
}

exports.submitMemberPasscodeForm = (req, res) => {
    if (req.body.passcode === process.env.MEMBER_PASSCODE) {
        auth.updateUserRole(req.user.id, 'member')
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.error(err);
                res.status(400).send('Unable to perform operation');
            }
        );
    } else {
        res.render('memberPasscode', {
            title: 'Join the Club',
            description: 'Enter the member passcode to unlock full membership.',
            action: '/passcode/member',
            message: "Incorrect passcode"
        });
    }
}

exports.getAdminPasscodeForm = (req, res) => {
    res.render('memberPasscode', {
    title: 'Admin Access',
    description: 'Enter the admin passcode.',
    action: '/passcode/admin'
});
}

exports.submitAdminPasscodeForm = (req, res) => {
    if (req.body.passcode === process.env.ADMIN_PASSCODE) {
        auth.updateUserRole(req.user.id, 'admin')
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.error(err);
                res.status(400).send('Unable to perform operation');
            }
        );
    } else {
        res.render('memberPasscode', {
            title: 'Admin Access',
            description: 'Enter the admin passcode.',
            action: '/passcode/admin',
            message: "Incorrect passcode"
        });
    }
}


