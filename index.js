import * as vecBasic from './vector/basic'
import * as vecLA from './vector/linearAlgebra'
import Vector from './vector/Vector'
import * as matrixBasic from './matrix/basic'
import * as matrixLA from './matrix/linearAlgebra'
import * as shared from './shared/shared'
const linearAlgebraMath = {
    ...vecBasic,
    ...vecLA,
    ...matrixBasic,
    ...matrixLA,
    ...shared
}

export  {
    linearAlgebraMath,
    Vector
}