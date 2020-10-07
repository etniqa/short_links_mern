const jwt = require('jsonwebtoken');
const mycfg = require('../config/mycfg');

module.exports = (req, res, next) => {
    try {
        console.log("STARTS auth.middleware");
        console.log();
        // special request from front, which you dont need to perform
        if (req === 'OPTIONS') {
            // continue perform request
            return next;
        }

        console.log(`before token extraction`);
        const token = req.headers.authorization   // special field in header for TOKEN. View: BEARERER <TOKEN>
            .split(' ')[1];
        console.log("after token extraction");
        console.log("/");

        if (!token) {
            res.status(401).json({message: "There is no token in headers of request"});
        }

        // decode token
        console.log("before decoding token");
        req.user = jwt.verify(token, mycfg.jwtSecret);

        // continue performing (the same as return next;)
        next();
    } catch (e) {
        console.log("Error in auth.middleware.js on backend: " + e.message);
        res.status(401).json({message: "Something goes wrong in auth.middleware.js: " + e.message});
    }
};
