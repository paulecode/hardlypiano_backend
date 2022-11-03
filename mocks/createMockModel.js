const { query } = require("express")
const { v4: uuidv4 } = require("uuid")

// class mockCollection {
//     constructor(collection) {
//         this.collection = collection
//     }
//     static find(filter) {
//         const found = this.collection.filter((item) => {
//             for (const key in filter) {
//                 if (filter[key] !== item[key]) return false
//             }
//             return true
//         })
//         return this(found)
//     }
//     static select(arr = this.collection) {
//         const fields = stringOfFields.split(" ")

//         const selected = arr.map((item) => {
//             const obj = {}
//             for (const key of fields) {
//                 obj[key] = item[key]
//             }
//             return obj
//         })

//         return this
//     }
// }

function createMockModel(collection = []) {
    let queryResults
    let queryStarted

    return class {
        // Model methods
        static startQuery() {
            if (!queryStarted) {
                queryResults = [...collection]
                queryStarted = true
            }
        }
        static endQuery() {
            queryResults = [...collection]
            queryStarted = false
        }
        static async findOne(filter) {
            this.startQuery()
            const found =
                queryResults.find((item) => {
                    for (const key in filter) {
                        if (filter[key] !== item[key]) return false
                    }
                    return true
                }) || null
            queryResults = found
            return this
        }
        static find(filter) {
            this.startQuery()
            const found = queryResults.filter((item) => {
                for (const key in filter) {
                    if (filter[key] !== item[key]) return false
                }
                return true
            })
            queryResults = [...found]
            return this
        }
        static select(stringOfFields) {
            this.startQuery()
            const fields = stringOfFields.split(" ")
            const selected = queryResults.map((item) => {
                const obj = {}
                for (const key of fields) {
                    if (item[key]) obj[key] = item[key]
                }
                return obj
            })
            queryResults = [...selected]

            return this
        }

        static async then(res, rej) {
            res(queryResults)
            this.endQuery()
        }

        // Document methods
        constructor(obj) {
            for (const key in obj) {
                this._id = this[key] = obj[key]
            }
            this._id = uuidv4()
        }
        save() {
            collection.push(this)
            return this
        }
    }
}

function _createMockModel(collection = []) {
    return class {
        // Model methods
        static sayHi() {
            console.log("hello")
            return
        }
        static returnMe(array = collection) {
            return new Promise((res, rej) => {
                res(this)
            })
        }
        static mapMe(array = collection) {
            return new Promise((res, rej) => {
                const mapped = array.map((obj) => obj.username)
                res(collection)
            })
        }
        static async findOne(filter) {
            const found =
                collection.find((item) => {
                    for (const key in filter) {
                        if (filter[key] !== item[key]) return false
                    }
                    return true
                }) || null
            return found
        }
        static find(filter) {
            const found = collection.filter((item) => {
                for (const key in filter) {
                    if (filter[key] !== item[key]) return false
                }
                return true
            })
            return this(found)
        }
        static select(stringOfFields) {
            const fields = stringOfFields.split(" ")

            const selected = collection.map((item) => {
                const obj = {}
                for (const key of fields) {
                    obj[key] = item[key]
                }
                return obj
            })

            return selected
        }

        // Document methods
        constructor(obj) {
            for (const key in obj) {
                this._id = this[key] = obj[key]
            }
            // this.collection = collection
            this._id = uuidv4()
            // console.log("Here I am", this)
        }
        save() {
            collection.push(this)
            return this
        }
    }
}

module.exports = createMockModel
