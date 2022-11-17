const createAuthService = require("./authService")

describe("AuthService.js", () => {
    const AuthService = createAuthService()

    it("is defined", () => {
        expect(AuthService).toBeDefined()
    })

    describe("AuthService.hashPassword", () => {
        it("is defined", () => {
            expect(AuthService.hashPassword).toBeDefined()
        })
        it("receives a password as string and hashes it", async () => {
            const password = "123456"
            const hashedPassword = await AuthService.hashPassword(password)
            expect(hashedPassword).toBeDefined()
            expect(hashedPassword).not.toEqual(password)
        })
        it("throws an error on no password given", async () => {
            expect(async () => {
                await AuthService.hashPassword()
            }).rejects.toThrow()
        })
        it("throws an error if non-string is provided", async () => {
            await expect(AuthService.hashPassword(123)).rejects.toThrow()
            await expect(AuthService.hashPassword([1, 2, 3])).rejects.toThrow()
            await expect(
                AuthService.hashPassword({ foo: "bar" })
            ).rejects.toThrow()
        })
        it("same input returns different output", async () => {
            const password = "passw0rd"
            const hash1 = await AuthService.hashPassword(password)
            const hash2 = await AuthService.hashPassword(password)
            expect(hash1).not.toEqual(hash2)
        })
    })
    describe("AuthService.isPasswordCorrect", () => {
        it("is defined", () => {
            expect(AuthService.isPasswordCorrect).toBeDefined()
        })
        it("returns true on correct match", async () => {
            const password = "passw0rd"
            const hashed = await AuthService.hashPassword(password)

            const result = await AuthService.isPasswordCorrect(password, hashed)

            expect(typeof result).toEqual("boolean")
            expect(result).toEqual(true)
        })
        it("returns false on incorrect match", async () => {
            const hashed = await AuthService.hashPassword("passw0rd")
            const result = await AuthService.isPasswordCorrect(
                "taylorswift",
                hashed
            )

            expect(result).toEqual(false)
        })
        it("throws an error on missing argument", async () => {
            await expect(AuthService.isPasswordCorrect()).rejects.toThrow()
            await expect(AuthService.isPasswordCorrect("foo")).rejects.toThrow()
        })
    })
    describe("AuthService.generateToken", () => {
        it("is defined", () => {
            expect(AuthService.generateToken).toBeDefined()
        })
        it("returns a token from an input", () => {
            const token = AuthService.generateToken({ name: "Irakli" })
            expect(token).toBeDefined()
        })
        it("throws an error when no payload provided", () => {
            expect(() => AuthService.generateToken()).toThrow()
        })
    })
    describe("AuthService.verifyToken", () => {
        it("is defined", () => {
            expect(AuthService.verifyToken).toBeDefined()
        })
        it("returns a payload on a correct token", () => {
            const payload = { username: "irakli" }
            const token = AuthService.generateToken(payload)
            const verified = AuthService.verifyToken(token)

            expect(verified).toBeDefined()
            expect(verified.username).toEqual(payload.username)
        })
        it("throws an error if no payload provided", () => {
            expect(() => AuthService.verifyToken()).toThrow()
        })
        it("throws an error if token is invalid", () => {
            const token = "badtoken"
            expect(() => AuthService.verifyToken(token)).toThrow()
        })
    })
    describe("AuthService.loginAndReturnToken", () => {
        it("is defined", () => {
            expect(AuthService.loginAndReturnToken).toBeDefined()
        })
    })
})
