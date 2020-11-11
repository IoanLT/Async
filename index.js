// console.log('Start the process');

// setTimeout(function(){
//     console.log('Executing stuff');
//     setTimeout(function(){
//         console.log('show result');
//     }, 2000);
// }, 3000);

// console.log('show result');

// Promises

const makePizza = (ingredient1, ingredient2) => {
    const pizzaPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Your pizza with ${ingredient1} and ${ingredient2} is ready!`);
        }, 2000);        
    });
    return pizzaPromise;
}
console.log(makePizza('tomatoes', 'cheese'));

makePizza('chesse', 'bacon')
    .then(function(pizza){
        console.log('1st pizza');
        console.log(pizza);
        return makePizza('ham', 'pineapple');
    })







