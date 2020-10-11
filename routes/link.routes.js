
const {Router} = require('express');
const Link = require('../models/Link.js');
const shortId = require('shortid');
const mycfg = (process.env.NODE_ENV === "production" ? require('../config/prodCfg') : require('../config/devCfg'))
const auth = require('../middleware/auth.middleware');

const router = Router();

//  /api/link
// + /generate = /api/link/generate
//  a-la @PostMapping("/generate")
router.post('/generate', auth, async (req, res) => {
    try {
        console.log("start link.routes.js (/api/link/generate");
        const baseUrl = mycfg.baseUrl;
        const {from} = req.body;

        const existing = await Link.findOne({from});
        console.log("existing:", existing);
        if (existing) {
            console.log("send existing");
            return res.json({link: existing});
        }
        console.log("continue PERFORMING");
        const code = shortId.generate();

        const to = baseUrl + '/t/' + code;
        const link = new Link({code, to, from, owner: req.user.userId});

        await link.save();

        res.status(201).json({link});   // 201 status === created
    } catch (e) {
        // set status 500 and send .json file with message field
        res.status(500).json(e.message || {message: `Something goes wrong during POST on /link/generate... Try again`});
    }
});

// getAll()
// here need to be userId, so that's why we add middleware auth for extracting userId from jwtToken
router.get('/getAll', auth, async (req, res) => {
    try {
        console.log("STARTS /link/getAll");

        // need here userId (getting from decoded token)
        const links = await Link.find({owner: req.user.userId});

        res.json({links});
    } catch (e) {
        // set status 500 and send .json file with message field
        res.status(500).json({message: `Something goes wrong during GET on /link/getAll... Try again: ${e.message}`});
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        res.json({link});
    } catch (e) {
        // set status 500 and send .json file with message field
        res.status(500).json({message: `Something goes wrong during GET on /link/:id... Try again: ${e.message}`});
    }
});

module.exports = router;
