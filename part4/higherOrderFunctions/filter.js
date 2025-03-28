var animals = [
  { name: "Roosje", species: "rabbit" },
  { name: "Negrut", species: "dog" },
  { name: "Benito", species: "cat" },
  { name: "Boris", species: "rabbit" },
  { name: "Fado", species: "dog" },
  { name: "mr. Kitty", species: "cat" },
];


var stage = "dev";

const argument = stage === "dev" ? "dog" : "cat";

var isDog = function (animal) {
  return animal.species === argument;
};

var dogs = animals.filter(isDog);
var anotherNonDogs = _.reject(animals, isDog);

console.log("dogs:", dogs);

console.log("other animals:", anotherNonDogs);




// var dict = [];
// animals.forEach((animal) => {
//   if (animal.species === "dog") {
//     dict.push(animal);
//   }
// });

// animals.forEach((animal) =>
//   animal.species === argument ? dict.push(animal) : ""
// );

// console.log(dict);

// var dogs = [];
// for (var i = 0; i < animals.length; i++) { 
//   if (animals[i].species === "dog") {
//     dogs.push(animals[i]);
//   }
// }
// console.log(dogs);
