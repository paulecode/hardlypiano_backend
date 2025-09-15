// Mock the factory function that returns the service object
const createPieceService = () => {
    return {
        getPieces: jest.fn(() => {
            return [
                {
                    title: "Nocturne",
                    composer: "Chopin",
                },
                {
                    title: "Moonlight Sonata",
                    composer: "Beethoven",
                },
            ]
        }),
        createPiece: jest.fn((userId, pieceDetails) => {
            return {
                ...pieceDetails,
            }
        }),
        getPieceById: jest.fn(() => {
            return {
                title: "Nocturne",
                composer: "Chopin",
            }
        }),
        deletePiece: jest.fn(() => {
            return {
                title: "Nocturne",
                composer: "Chopin",
            }
        }),
        updatePiece: jest.fn((userId, pieceId, pieceDetails) => {
            return {
                ...pieceDetails,
            }
        }),
        deleteManyPieces: jest.fn(() => {
            return 1
        }),
        getRecentlyPracticed: jest.fn(() => {
            return {
                title: "Nocturne",
                composer: "Chopin",
            }
        }),
        getLongestSincePractice: jest.fn(() => {
            return {
                title: "Moonlight Sonata",
                composer: "Beethoven",
            }
        }),
        getLeastPracticed: jest.fn(() => {
            return {
                title: "Nocturne",
                composer: "Chopin",
            }
        }),
        getMostPracticed: jest.fn(() => {
            return {
                title: "Moonlight Sonata",
                composer: "Beethoven",
            }
        }),
    }
}

module.exports = createPieceService
