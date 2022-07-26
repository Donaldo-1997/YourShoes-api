require('dotenv').config();
const GoogleStrategy = require('passport-google-oidc');
const passport = require('passport');

const emails = ["donaldojbm7@gmail.com"];
passport.use(
    "authGoogle",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/authGoogle",
      },
      async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }
    
            const validate = await user.isValidPassword(password)
    
            if (!validate) {
                return done(null, false, { message: 'Wrong password' })
            }
    
            return done(null, user, { message: 'Login successfull' })
        } catch (e) {
            return done(e)
        }
      }
    )
  );
  