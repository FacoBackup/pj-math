export default class Vector {
    constructor(x, y, z, w = 0) {
        this.update(x, y, z, w)
    }

    update(x = this.x, y = this.y, z = this.z, w = this.w) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
        this.matrix = [this.x, this.y, this.z, this.w]
        this.magnitude = Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2))

        this.normalized = [this.x / this.magnitude, this.y / this.magnitude, this.z / this.magnitude, 1]
    }
}