const numbers = [
  {amount: 250},
  { amount: 400 },
  { amount: 100 },
  { amount: 325 },
];


let totalNaima = numbers.reduce((a, b) => a + b.amount,0)


console.log(totalNaima)

// let total = 0

// for (let i = 0; i < numbers.length; i++){
//     total += numbers[i].amount
// }

// console.log(total);

// let total = numbers.reduce(function (sum, number) {
//   console.log("Hai sum", sum , number )
//   return sum + number.amount
// },0);

// console.log(total)

// const totalCash = 1200

let leftOver = numbers.reduce((a, b) => a - b.amount, 1200);

console.log("Left over after an expensive month: ", leftOver)


const randomFunction =  () => {
  return afkjlsjdf;
};