const router = require("express").Router();
const userController = require("../../controllers/userController");
const db = require("../../models");
const passport = require('../../config/passport');

// /api/user - get all users
router.get("/", (req, res, next) => {
    console.log("===== user!!======");
    console.log("reg-user: ", req.user);
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

// /api/user/signup - Post a new user with hashed password
router.route("/signup")
    .post(userController.create)
router.route("/populated")
    .get(userController.findAll)

// router.post(
//     "/login",
//     function (req, res, next) {
//         console.log("routes/user.js, login, req.body: ", req.body);
//         console.log(req.body);
//         next();
//     },
//     passport.authenticate("local"),
//     (req, res) => {
//         console.log("logged in", req.user);
//         var userInfo = {
//             username: req.user.username,
//             _id: req.user._id
//         };
//         res.json(req.user);
//     }
// );

router.post("/logout", (req, res) => {
    if (req.user) {
        console.log("logout", req.user)
        req.logout();
        res.send({ msg: "logging out" });
    } else {
        res.send({ msg: "no user to log out" });
    }
});

router.post("/login", passport.authenticate('local'), (req, res) => {
    console.log('logging in...')
    res.json(req.user)
})

// Matches with ":id"
router
    .route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;
