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
    describe("AuthService.checkPassword", () => {
        it("is defined", () => {
            expect(AuthService.checkPassword).toBeDefined()
        })
    })
    describe("AuthService.generateToken", () => {
        it("is defined", () => {
            expect(AuthService.generateToken).toBeDefined()
        })
    })
    describe("AuthService.validateToken", () => {
        it("is defined", () => {
            expect(AuthService.validateToken).toBeDefined()
        })
    })
    describe("AuthService.loginAndReturnToken", () => {
        it("is defined", () => {
            expect(AuthService.loginAndReturnToken).toBeDefined()
        })
    })
})
