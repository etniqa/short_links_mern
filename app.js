const express = require('express');

// for work with mongodb
const mongoose = require('mongoose');
const devCfg = require('./config/devCfg');
const prodCfg = require('./config/prodCfg');
const path = require(`path`);

const app = express();

app.use(express.json({extended: true}));
// performing methods which in ./routes/auth.routes during any (POST, GET, ...) request on /api/auth
// a-la @RequestMapping("/api/auth")         (@Controller in './routes/auth.routes')
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

// node send our client's pages
// process.env - here is global vars. NODE_ENV - global var (in system), which we have set using cross-env
if (process.env.NODE_ENV === "production") {
    console.log("There is a PRODUCTION mode");
    // if we get request, which start on / (any request) then we send front from __dirname(where I`m now)/client/build  ===
    // folder, where we have compiled frontend
    app.use('/', express.static(path.join(__dirname, 'client', `build`)));
    // if any other request (default for requests on bad paths) then we send __dirname/client/build/index.html
    app.get(`*`, (req, res) => {
        res.sendFile(path.resolve(__dirname, `client`, `build`, `index.html`))
    })
}


// connect mongo DB
async function start() {    // async `cause there is await method inside of this function
    try {
        await mongoose.connect((process.env.NODE_ENV === "production" ? prodCfg : devCfg).mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        // wait for finishing performing of mongoose.connect(...)
        app.listen((process.env.NODE_ENV === "production" ? prodCfg : devCfg).port, () => console.log(`app has been started on port 
            ${(process.env.NODE_ENV === "production" ? prodCfg : devCfg).port}!`));
    } catch (e) {
        console.log(`Server error: ${e}`);
        process.exit(1);    // exit if there was an error
    }
}

start();

