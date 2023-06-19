//START

const { spawn } = require("child_process");
const http = require("http");
const logger = require("./log");
const { Port } = require('./config.json');

//CHECK FOR UPDATES
require('axios')
  .get('https://raw.githubusercontent.com/yukihiraofficial/yukihirabot/main/package.json')
  .then(res => {
    const { version } = res.data;
    const currentVersion = require('./package.json').version;
    let compare = require('compare-versions')(currentVersion, version);
    if (compare == -1) logger.info('yoo broo check this out soon as possible anjelo cayao release this file and upload a new project follow anjelo cayao in facebook: https://www.facebook.com/anjelogwpo')
    else logger.info('You are using the latest version of yukihira!')
  })
  .catch(e => logger.warn('Unable to check for updates.'))

/*
CHECK NODE VERSION
*/

const majorNodeVersion = parseInt(process.version.slice(1,process.version.indexOf('.')));
if (majorNodeVersion != 14) {
    logger.error("yukihira requires Node 14.x.x to run!");
    process.exit(0);
}

/*
UPTIMEROBOT TRICK FOR 24/7 USEFUL TOOL
*/

http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("thanks for using yukihira bot 1.2.0 kindly read the readme and dont change it and also dont change the credits.");
    res.end();
}).listen(Port || 8080);

logger.info("yukihira is starting...");


/*
CREATE A CHILD PROCESS AND HANDLE ERRORS
*/

function YukiBot() {
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "yukihira.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (exitCode) => {
        if (exitCode == 0) return;
        await new Promise(resolve => setTimeout(resolve, 1000));
        logger.warn("yukihira is restarting...");
YukiBot();
    });

    child.on("error", function (error) {
        logger.error("An error occurred: " + JSON.stringify(error));
    });
};

YukiBot();

//END
