import {generateMatrix} from "../matrix/basic";
import {crossProduct, dotProduct} from "../vector/linearAlgebra";
import {multiply, subtract} from "../vector/basic";
import Vector from "../vector/Vector";

export function multiplyMatrixVec(matrix, vec) {
    return new Vector(
        vec.x * matrix[0][0] + vec.y * matrix[1][0] + vec.z * matrix[2][0] + vec.w * matrix[3][0],
        vec.x * matrix[0][1] + vec.y * matrix[1][1] + vec.z * matrix[2][1] + vec.w * matrix[3][1],
        vec.x * matrix[0][2] + vec.y * matrix[1][2] + vec.z * matrix[2][2] + vec.w * matrix[3][2],
        vec.x * matrix[0][3] + vec.y * matrix[1][3] + vec.z * matrix[2][3] + vec.w * matrix[3][3]
    );
}

export function translationMatrix(x, y, z) {
    let matrix = generateMatrix(4,4)
    matrix[0][0] = 1
    matrix[1][1] = 1
    matrix[2][2] = 1
    matrix[3][3] = 1
    matrix[3][0] = x
    matrix[3][1] = y
    matrix[3][2] = z
    return matrix;
}

export function fast4x4Inverse(m) {
    let matrix = generateMatrix(4, 4)

    matrix[0][0] = m[0][0];
    matrix[0][1] = m[1][0];
    matrix[0][2] = m[2][0];

    matrix[1][0] = m[0][1];
    matrix[1][1] = m[1][1];
    matrix[1][2] = m[2][1];

    matrix[2][0] = m[0][2];
    matrix[2][1] = m[1][2];
    matrix[2][2] = m[2][2];

    matrix[3][0] = -(m[3][0] * matrix[0][0] + m[3][1] * matrix[1][0] + m[3][2] * matrix[2][0]);
    matrix[3][1] = -(m[3][0] * matrix[0][1] + m[3][1] * matrix[1][1] + m[3][2] * matrix[2][1]);
    matrix[3][2] = -(m[3][0] * matrix[0][2] + m[3][1] * matrix[1][2] + m[3][2] * matrix[2][2]);
    matrix[3][3] = 1;

    return matrix
}


export function matrixPointAt(posVec, targetVec, upVec) {
    let newForward = subtract(targetVec, posVec);


    newForward = {
        x: newForward.normalized[0],
        y: newForward.normalized[1],
        z: newForward.normalized[2],
        w: 1
    }

    let a = multiply(newForward, dotProduct(upVec, newForward));
    let newUp = subtract(upVec, a);


    newUp = {
        x: newUp.normalized[0],
        y: newUp.normalized[1],
        z: newUp.normalized[2],
        w: 1
    }

    let newRight = crossProduct(newUp, newForward);
    // const n = cross(newUp.x, newUp.y, newUp.z)
    // console.log(n.flat(), newUp.normalized)
    let matrix = generateMatrix(4, 4);

    matrix[0][0] = newRight.x;
    matrix[0][1] = newRight.y;
    matrix[0][2] = newRight.z;

    matrix[1][0] = newUp.x;
    matrix[1][1] = newUp.y;
    matrix[1][2] = newUp.z

    matrix[2][0] = newForward.x;
    matrix[2][1] = newForward.y;
    matrix[2][2] = newForward.z;

    matrix[3][0] = posVec.x;
    matrix[3][1] = posVec.y;
    matrix[3][2] = posVec.z;
    matrix[3][3] = 1;

    return matrix;
}

export function projectionMatrix(fieldOfView, aspectRatio, zScale, zOffset){
    return [
        [fieldOfView / aspectRatio, 0, 0, 0],
        [0, fieldOfView, 0, 0],
        [0, 0, -1, -1],
        [0, 0, -.2, 0]
    ]
}


export function normalMatrix (matrix) {
    let a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3],
        a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7],
        a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11],
        a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    let result = []

    result[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    result[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    result[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    result[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    result[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    result[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    result[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    result[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    result[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return result;
}
