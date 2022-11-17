const bouncer = require("express-bouncer")(500, 90000)

bouncer.whitelist.push("127.0.0.1")

bouncer.blocked = (req, res, next, remaining) => {
    console.log("NOOOO")
    res.send(429, `Too many requests. Please wait ${remaining / 1000} seconds.`)
}

module.exports = bouncer
