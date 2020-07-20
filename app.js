const express = require('express');

const mongoose = require('mongoose');
const mycfg = require('./config/mycfg');
const path = require(`path`);

const app = express();

// don`t understand for what
app.use(express.json({extended: true}));
// performing methods which in ./routes/auth.routes during any (POST, GET, ...) request on /api/auth
// a-la @RequestMapping("/api/auth")         (@Controller in './routes/auth.routes')
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

// ????
if (process.enu.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, 'client', `build`)));
    app.get(`*`, (req, res) => {
        res.sendFile(path.resolve(__dirname, `client`, `build`, `index.html`))
    })
}


// connect mongo DB
async function start() {    // async `cause there is await method inside of this function
    try {
        await mongoose.connect(mycfg.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        // wait for finishing performing of mongoose.connect(...)
        app.listen(mycfg.port, () => console.log(`app has been started on port ${mycfg.port}!`));

    } catch (e) {
        console.log(`Server error: ${e}`);
        process.exit(1);    // exit if there is a mistake
    }
}

start();
