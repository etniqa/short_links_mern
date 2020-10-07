// require("/classes/common");

const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cfg = require('config');
const {check, validationResult} = require('express-validator');
const Users = require('../models/User');

const router = Router();


/*class MyResponse {
    status: 'bad' | 'good';
    messages: Array;

    constructor(status: "bad" | "good", messages: Array) {
        this.status = status;
        this.messages = messages;
    }
}*/

//  /api/auth
// + /register = /api/auth/register
//  a-la @PostMapping("/register")
router.post(`/register`,
    [
        // this middlewares is checking fields (email, password) and set errors to validationResult
        check(`email`, 'Wrong email').isEmail(),
        check('password', 'Minimal length of password are 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            // perform validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("validation errors", errors.array());
                return res.status(400).json({
                    messages: errors.array(),
                });
            }
            // get email and password from req.body
            //     username: req.body.username,
            //     password: req.body.password
            const {email, password} = req.body;

            // checking if there is email in DB during registration
            const candidate = await Users.findOne({email});
            if (candidate) {
                return res.status(400).json({
                    messages: [{msg: "This email is using"}]
                });
            }
            // hash password using library bcryptjs
            const hashedPassword = await bcrypt.hash(password, 12);
            // !!! we`re saving all passwords hashed
            const user = new Users({email, password: hashedPassword});
            await user.save();

            res.status(201).json({
                messages: [{msg: `User is created`}]
            });

        } catch (e) {
            // set status 500 and send .json file with message field
            return res.status(500).json({
                message: [{msg: "Something goes wrong during registration... Try again"}]
            });
        }
    });

router.post(`/login`,
    [
        // this middlewares is checking fields (email, password) and set errors to validationResult
        // const {check, ! validationResult !} = require('express-validator');
        check(`email`, 'Wrong email').isEmail(),
        check('password', 'Minimal length of password are 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            console.log("starts /api/login");
            // perform validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("validation errors", errors.array());
                return res.status(400).json({
                    messages: errors.array()
                });
            }

            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if (!user) {
                return res.status(400).json({messages: [{msg: "There is no user, sorry ("}]});
            }

            const isMatchPasswords = await bcrypt.compare(password, user.password);
            if (!isMatchPasswords) {
                return res.status(400).json({messages: [{msg: "Wrong password, try again"}]});
            }

            const token = jwt.sign(
                {userId: user.id},
                cfg.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            // if there is no res.status() then status set 201 (success)
            res.json({messages: "Logining is successful", token, userId: user.id});

        } catch (e) {
            console.log("exception", e.message);
            // set status 500 and send .json file with message field
            res.status(500).json({messages: [{msg: `Something goes wrong during registration... Try again`}]});
        }
    });

module.exports = router;
