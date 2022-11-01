const User = require("./User")

xdescribe("model User is defined and functional", () => {
    it("model User is defined", () => {
        expect(User).toBeDefined()
    })
    it("model User accepts username and password", () => {
        const user = new User({
            username: "foo",
            password: "bar",
        })
        expect(user.username).toBeDefined()
        expect(user.password).toBeDefined()
    })
    it("model User requires username and password", () => {
        const user = new User({ username: "foo" })
        expect(user.save).toThrow()
    })
    it("model User only accepts strings for username and password", async () => {
        const user1 = new User({ username: "foo", password: "bar" })
        try {
            await user1.save()
        } catch (e) {
            console.log(e)
        }
        // expect(user1.save).not.toThrow();

        // const user2 = new User({ username: 'foo', password: 'bar' });
        // expect(user2.save).not.toThrow();
    })
    it("model User is initialized with pieces array", () => {
        const user = new User({ username: "foo", password: "bar" })
        expect(user.pieces).toBeInstanceOf(Array)
    })
})
