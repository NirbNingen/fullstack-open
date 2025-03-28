var animals = [
  { name: "Roosje", species: "rabbit" },
  { name: "Negrut", species: "dog" },
  { name: "Benito", species: "cat" },
  { name: "Boris", species: "rabbit" },
  { name: "Fado", species: "dog" },
  { name: "mr. Kitty", species: "cat" },
];

// var name = 

var names = animals.map((x)=> x.name )


console.log(names)


// var names=[];for(var i=0;i< animals.length;i++){names.push(animals[i].name)}

// console.log(names)  

var names=[];animals.forEach((x)=>names.push(x.name))

