const { query } = require("express")
const { v4: uuidv4 } = require("uuid")

function createMockModel(collection = []) {
    let asyncAvailable = false
    let queryResults
    let queryStarted

    let num = 0

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
            const found = queryResults.find((item) => {
                for (const key in filter) {
                    if (filter[key] !== item[key]) return false
                }
                return true
            })
            queryResults = found || null
            return this
        }
        static find(filter) {
            queryResults = []
            // return []
            // console.log(collection)
            this.startQuery()
            queryResults = queryResults.filter((item) => {
                for (const key in filter) {
                    if (filter[key] !== item[key]) return false
                }
                return true
            })
            // queryResults = [...found]
            return this
        }
        static remove(filter) {
            collection = collection.filter((document) => {
                for (const key in filter) {
                    if (filter[key] !== document[key]) return true
                }
                return false
            })
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
        #then = (res, rej) => {
            if (num > 2) return res()
            console.log("running", this)
            num++

            res(this)
        }
    }
}

module.exports = createMockModel
