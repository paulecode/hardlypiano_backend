const { v4: uuidv4 } = require("uuid")
const createMockModel = require("./utils/createMockModel")

const users = []
const User = createMockModel(users)

const defaultUser = { username: "foo", password: "bar" }
const user1 = new User({ ...defaultUser })
const user2 = new User({ ...defaultUser, username: "irakli" })
user1.save()
user2.save()

// console.log(users)
// console.log(User.find({}))
// console.log(User.returnValue())

// console.log(User.then())
;(async () => {
    const result = await User.find({})
        .select("username ")
        .find({ username: "irakli" })
    console.log(result)
})()
// console.log(users)

// Goal: get this to work
// ;(async () => {
//     const result = await User.getAll().mapUsernames()
//     console.log(result)
// })()

// console.log(User.find().find())
