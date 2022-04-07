// import { ten, Tensor } from '@jtheta/ten'
// import { assert } from '@jtheta/assert'
// import {mat, Matrix, Size} from '@jtheta/mat';

// // TODO(ritch) get rid of this webpack/ts-node workaround
// let dl = require('deeplearn')

// export type HypothesisFunction = (theta: Tensor, x: Tensor) => Tensor
// export type CostFunction = (prediction: Tensor, label: Tensor) => Tensor
// export type Optimizer = {
//   minimize: any
// }

// export default class Lesson {
//   constructor(
//     private hypothesis: HypothesisFunction,
//     private input: Tensor,
//     private labels: Tensor,
//     private duration: number,
//     private diagnosing: boolean = false) {
//       this.input = ten(input)
//       this.labels = ten(labels)
//       assert(input.size.equals(labels.size), 'Lesson must have equal input and labels')
//       assert(!isNaN(duration), 'Lesson duration must be a number')
//       assert(duration > 0, 'Lesson must have a positive duration')
//   }
//   private history: Array<number> = []
//   static train = dl.train
//   async learn(initialTheta: Tensor, cost: CostFunction, optimizer: Optimizer): Promise<Tensor> {
//     initialTheta = ten(initialTheta)
//     const theta = dl.variable(initialTheta.asLameTensor())
//     const x = this.input
//     const y = this.labels

//     const h = input => this.hypothesis(ten(theta), input).asLameTensor()
//     const j = (pred, label) => cost(ten(pred), label).asLameTensor()
//     let lastCost

//     // Train the model.
//     for (let i = 0; i < this.duration; i++) {
//       lastCost = optimizer.minimize(() => j(h(x), y), this.diagnosing)
//     }
    
//     if (this.diagnosing) {
//       const costScalar = lastCost.dataSync()
//       assert(!isNaN(costScalar), 'Cost function must return a scalar')
//       this.history.push()
//     }

//     const raw = await theta.data()
//     return new Tensor(raw, initialTheta.size)
//   }
//   toMatrix(): Matrix {
//     return new Matrix(this.history, new Size(1, this.history.length))
//   }
// }