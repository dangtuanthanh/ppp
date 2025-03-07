const express = require("express");
const app = express();
var PORT = normalizePort(process.env.portListen || '3000');
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
const serverInstance = app.listen(4000, () => {
    console.log(`🌍 Running temp server on ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("⏳ Server is under maintenance. Please wait...!");
});
async function startProcess() {
    console.log("⏳ Waiting for 30 seconds before closing the server...");

    setTimeout(() => {
        console.log("🛑 Temporarily close server...");
        serverInstance.close(() => {
            console.log("✅ Server is temporarily down.");

            console.log("🚀 Start main server...");
            require("child_process").execSync("npm start", { stdio: "inherit" });
        });
    }, 60000); // 30 giây
}

startProcess();
