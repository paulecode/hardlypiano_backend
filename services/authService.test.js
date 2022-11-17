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
