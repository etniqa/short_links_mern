const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cfg = require('config');
const {check, validationResult} = require('express-validator');
const Users = require('../models/User');

const router = Router();

//  /api/auth
// + /register = /api/auth/register
//  a-la @PostMapping("/register")
router.post(`/register`,
    [
        // this middlewares is checking fields (email, password) and set errors to validationResult
        // const {check, ! validationResult !} = require('express-validator');
        check(`email`, 'Wrong email').isEmail(),
        check('password', 'Minimal length of password are 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            // perform validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Some date is wrong during registration (error from server)"
                });
            }
            // get email and password from req.body
            //  ya ahyel here
            // this shit is the same to
            //     username: req.body.username,
            //     password: req.body.password
            const {email, password} = req.body;

            // checking if there is email in DB during registration
            const candidate = await Users.findOne({email});
            if (candidate) {
                res.status(400).json({message: `This email is using`});
            }
            // hash password using library bcryptjs
            const hashedPassword = await bcrypt.hash(password, 12);
            // !!! we`re saving all passwords hashed
            const user = new Users({email, password: hashedPassword});
            await user.save();

            res.status(201).json({message: `User is created`});

        } catch (e) {
            // set status 500 and send .json file with message field
            res.status(500).json({message: `Something goes wrong during registration... Try again`});
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
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Some date is wrong during entrance (from backend)"
                })
            }

            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if (!user) {
                return res.status(400).json({message: "There is no user, sorry ("});
            }

            const isMatchPasswords = await bcrypt.compare(password, user.password);
            if (!isMatchPasswords) {
                return res.status(400).json({message: "Wrong password, try again"});
            }

            const token = jwt.sign(
                {userId: user.id},
                cfg.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            // if there is no res.status() then status set 201 (success)
            res.json({message: "Logining is successful", token, userId: user.id});

        } catch (e) {
            // set status 500 and send .json file with message field
            res.status(500).json({message: `Something goes wrong during registration... Try again`});
        }
    });

module.exports = router;
