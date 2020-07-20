const {Router} = require("express");
const Link = require("../models/Link");
const router = Router();

/// /to/:code
router.get("/:code", async (req, res) => {
   const link = await Link.findOne({code: req.params.code});
   if (link) {
        link.clicks++;
        // update
        await link.save();
        return res.redirect(link.from);
   }
   res.status("404").json({message: "There is no link"});
});

module.exports = router;
