import Vector from "./Vector";

export function dotProduct(vecA, vecB) {
    return vecA.x * vecB.x + vecA.y * vecB.y + vecA.z * vecB.z
}

export function normalizeVec(vec) {
    const magnitude = vec.magnitude
    return new Vector(vec.x / magnitude, vec.y / magnitude, vec.z / magnitude)
}
