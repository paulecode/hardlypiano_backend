class ModelMock {
    constructor(obj, array) {
        for (const key in obj) {
            this[key] = obj[key]
        }
        this.collection = array
        console.log("This is constructor array", array)
    }
    static async save() {
        this.collection.push(this)
        return this
    }
    static sayHi() {
        console.log("hello, world")
        return
    }
    static async findOne(filter) {
        console.log("This is collection", this.collection)
        return (
            this.collection.find((item) => {
                console.log(item)
                for (const key in filter) {
                    if (filter[key] !== item[key]) return false
                }
                return true
            }) || null
        )
    }
}

module.exports = ModelMock
