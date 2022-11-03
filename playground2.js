const db = require("./db")
const User = require("./models/User")

const user1 = new User({ username: "foo", password: "bar" }) // const saved = user1.save()
// console.log(saved)
// console.log(User.find({ username: "foo" }))
// console.log(
//     User.find({ username: "foo" }).then((c) => {
//         console.log(c)
//     })

;(async () => {
    await db.connect()
    await user1.save()
    console.log(User.find({ username: "foo" }).select("username"))
})()
