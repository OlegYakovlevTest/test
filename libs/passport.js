const config = require('./config')
    , passport = require('passport')
    , JwtStrategy = require('passport-jwt').Strategy
    , InfusionsoftStrategy = require('passport-infusionsoft').Strategy
    , ExtractJwt = require('passport-jwt').ExtractJwt
    , LocalStrategy = require('passport-local')
    , UserModel = require('./mongoose');

const strategyOptions = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.get('secret')
    }
};

// Setting up local login strategy
const localLogin = new LocalStrategy((username, password, done) => {

    let authCriteria = username.indexOf('@') === -1 ? 'username' : 'email';
    const condition = {
        [authCriteria]: username.toLowerCase(),
        auth_strategy: 'local'
    };

    if (authCriteria == 'email') {
        condition.email_confirmed = true;
    }

    UserModel.findOne(condition)
        .then((user) => {
            if (!user) { return done(null, false, { error: { message: `Incorrect ${authCriteria} or password.` } }); }

            user.comparePassword(password, (err, isMatch) => {
                if (err) { return done(err); }
                if (!isMatch) { return done(null, false, { error: { message: `Incorrect ${authCriteria} or password.` } }); }
                return done(null, user);
            });
        })
        .catch(done);
});

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(strategyOptions.jwt, (payload, done) => {
    UserModel.findById(payload._id)
        .then((user) => {
            done(null, user ? user : false);
        })
        .catch(done);
});

const infusionsoftLogin = new InfusionsoftStrategy(config.get('services.infusionsoft'), (req, accessToken, refreshToken, profile, done) => {
    req.user.set('services.infusionsoft', {
        accessToken: accessToken,
        refreshToken: refreshToken
    });
    req.user.save()
        .then((user) => {
            done(null, user);
        })
        .catch(done);
});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(infusionsoftLogin);
