import {normalizeVec} from "./linearAlgebra";

export default class Vector {
    constructor(x, y, z) {
        this.update(x, y, z)
    }
    update(x = this.x, y = this.y, z = this.z) {
        this.x = x
        this.y = y
        this.z = z
        this.matrix = [this.x, this.y, this.z]
        this.normalized = normalizeVec(this)
        this.magnitude = Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2))
    }
}