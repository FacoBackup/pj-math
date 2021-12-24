export function multiplyByMatrix(matrixA, matrixB) {
    let aRows = matrixA.length,
        aCols = matrixA[0].length,
        bCols = matrixB[0].length,
        newMatrix = new Array(aRows)

    for (let rowA = 0; rowA < aRows; rowA++) {
        newMatrix[rowA] = new Array(bCols)
        for (let columnB = 0; columnB < bCols; columnB++) {
            newMatrix[rowA][columnB] = 0;
            for (let columnA = 0; columnA < aCols; columnA++) {
                newMatrix[rowA][columnB] += matrixA[rowA][columnA] * matrixB[columnA][columnB]
            }
        }
    }
    return newMatrix
}

export function generateMatrix(rows, columns, fill = 0) {
    let newM = new Array(rows).fill(fill)
    for (let i = 0; i < rows; i++) {

        newM[i] = new Array(columns).fill(fill)
    }

    return newM
}

export function subtractMatrices(matrixA, matrixB) {
    let res = generateMatrix(matrixA.length, matrixA[0].length, 0)

    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixA[i].length; j++) {
            res[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }
    return res
}

export function addMatrices(matrixA, matrixB) {
    let res = generateMatrix(matrixA.length, matrixA[0].length, 0)

    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixA[i].length; j++) {
            res[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    return res
}
