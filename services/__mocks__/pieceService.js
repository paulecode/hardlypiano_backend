module.exports = () => {
    return {
        getPieces: () => {
            return [
                {
                    title: "Nocturne",
                    composeer: "Chopin",
                },
                {
                    title: "Moonlight Sonata",
                    composer: "Beethoven",
                },
            ]
        },
        createPiece: () => {},
        getPieceById: () => {
            return {
                title: "Nocturne",
                composeer: "Chopin",
            }
        },
        deletePiece: () => {
            return {
                title: "Nocturne",
                composeer: "Chopin",
            }
        },
    }
}
