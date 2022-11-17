module.exports = () => {
    return {
        getPieces: () => {
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
        },
        createPiece: (userId, pieceDetails) => {
            return {
                ...pieceDetails,
            }
        },
        getPieceById: () => {
            return {
                title: "Nocturne",
                composer: "Chopin",
            }
        },
        deletePiece: () => {
            return {
                title: "Nocturne",
                composer: "Chopin",
            }
        },
    }
}
