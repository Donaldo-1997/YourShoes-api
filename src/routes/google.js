const { Router } = require('express');
const router = Router();
require('../../src/passport-setup');
const passport = require('passport')
const cookieSession = require('cookie-session')

router.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))



// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    console.log('desde isLog')
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

// Example protected and unprotected routes
// router.get('/', (req, res) => res.render('pages/index'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) =>{
    console.log('desde googd')
    res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

// Auth Routes
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('http://localhost:3000');
})
module.exports = router;