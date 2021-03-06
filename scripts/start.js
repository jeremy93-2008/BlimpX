const child = require("child_process")

const exec = child.exec("npm run start")

exec.stdout.on("data", (data) => {
    console.log(data)
    if (data.includes("Compiled successfully")) {
        process.exit(0)
    }
})