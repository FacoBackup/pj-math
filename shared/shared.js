import {generateMatrix} from "../matrix/basic";
import {crossProduct, dotProduct, normalizeVec} from "../vector/linearAlgebra";
import {multiply, subtract} from "../vector/basic";
import Vector from "../vector/Vector";
import {normalise} from "../../components/core/math/vectorOperations";

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
