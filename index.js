// console.log('start loading resources')
// console.log('execute stuff')
// console.log('show results')
// console.log('start loading resources')
// setTimeout(function(){
//   console.log('executing stuff')
// }, 2000)
// console.log('done')
// console.log('start loading resources')
// setTimeout(function(){
//   console.log('executing stuff', this)
//   setTimeout(function() {
//     console.log('done', this)
//   },3000)
// }, 2000)
// let myTimer = {
//   name: 'Marc',
//   run: function(){
//     let that = this
//     setTimeout(function(){
//       console.log('hey inside the timer, your name is ' + that.name)
//     },2000)
//   }
// }
// console.log(myTimer.run())
// example of callback hell
const go = document.querySelector('.go');
// // This element is a button that will change during the time
// // Change the text to GO when clicked
go.addEventListener('click', function(e) {
    const el = e.currentTarget;
    el.textcontent = 'GO!';
    // Convert it to a Circle after 2 seconds
    setTimeout(function() {
        el.classList.add('circle');
        // Make it red after 0.5 seconds
        setTimeout(function(){
            el.classList.add('red');
            // Convert it to a square after 0.25s
            setTimeout(function(){
                el.classList.remove('circle');
                // Make it purple after 0.3s
                setTimeout(function(){
                    el.classList.remove('red');
                    el.classList.add('purple');
                    // Add a fadeout animation after 0.5s
                    setTimeout(function(){
                        el.classList.add('fadeout');
                    }, 500)
                }, 300)
            }, 250)
        }, 500);
    }, 2000);
});
// explain why this is awful, give Rut exemple with Bootstrap scripts about having the need to wait for something to happen, but maybe you don't know the exact time so you can't use a setTimeout
// ## Using Promises
// The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
// Think of a promise as like the request you make to an API or any service, or a timer, that after you finish requesting this thing I asked for, you will give me back the data I wanted or maybe an error or a certain status
// let's make some pizzas, sadly they need time to be prepared, cooked and ready, we can think of them as promises so if we have a normal js function:
function makePizza1() {
    const pizzaPromise = new Promise() // new data type, surprise!
    return pizzaPromise; // I return the promise inmediatly but I am still not resolving it
    // I just created the promise of making a pizza but still don't know
    // how long it's gonna take and if something will come back or not
    // the idea of this being returned inmediatly (the promise) but the
    // resolve taking some time is the mos important thing
}
// from there we have:
function makePizza2() {
    const pizzaPromise = new Promise(function (resolve, reject) {
        // the promise takes a callback function with 2 arguments, the 1st one is what happens if it resolves and the 2nd what happens if it fails so you can have those 2 options like
        // when you are ready, resolve it
        resolve("Pizza is ready!")
        // if it fails, let me know
    })
    return pizzaPromise;
}
// So if we create a variable and console.log it that calls the function, what we will get? the resolve?
const pizza2 = makePizza2();
console.log(pizza2)
// we got a promise, with the status marked as resolved and the value of the pizza
// IMPORTANT the function is not giving us the pizza, it gives us a PROMISE of the pizza, that maybe it will resolve good or reject
// lets add some extra stuff like ingredients and diferents pizzas:
function makePizza2(ingredient1, ingredient2) {
    const pizzaPromise = new Promise(function (resolve, reject) {
        // when you are ready, resolve it
        resolve(`Your ${ingredient1} and ${ingredient2} pizza is ready!`)
        // if it fails, let me know
    })
    return pizzaPromise;
}
const goodPizza = makePizza2('cheese', 'bacon');
const badPizza = makePizza2('ham', 'pineapple');
console.log(goodPizza, badPizza)
// So how to finally get the VALUE?? We need to use the .then in the promise
goodPizza.then(function (pizza) { //goodPizza is a promise, we can use the .then method
    // again, the pizza is just a placeholder!
    console.log(pizza) // and get the value we wanted
})
// But wait, is all this worth it? Why do we do all that extra new stuff???
// Well, we still didn't introduce any time waiting here, let's do it now to seem real
// CHECK THE CONSOLE AFTER THAT TO SEE THAT PROMISE IS RETURNED INMEDIATELLY AND RESOLVES LATER
function makePizza3(ingredient1, ingredient2) {
    const pizzaPromise = new Promise(function(resolve, reject) {
        // wait 1 second for the pizza to be cooked
        setTimeout(function() {
        // when you are ready, resolve it
            resolve(`Your ${ingredient1} and ${ingredient2} pizza is ready!`)
        }, 2000)
        // if it fails, let me know
    })
    return pizzaPromise;
}
const goodPizza2 = makePizza3('cheese', 'bacon');
console.log(goodPizza2) // this appears inmediatelly
goodPizza2.then(function(pizza){
    console.log(pizza) // this will appear when the Promise is resolved
})
// Final thing, WHY IS THIS USEFUL; BECAUSE WE CAN CHAIN IT IN A LEGIBLE WAY
// let's say we have only 1 oven, so we can only cook one pizza at a time, we will do:
function makePizza4(ingredient1, ingredient2) {
    const pizzaPromise = new Promise(function (resolve, reject) {
        // wait 1 second for the pizza to be cooked
        setTimeout(function () {
            // when you are ready, resolve it
            resolve(`Your ${ingredient1} and ${ingredient2} pizza is ready!`)
        }, 2000)
        // if it fails, let me know
    })
    return pizzaPromise;
}
makePizza4('cheese', 'bacon') //this returns a promise so we can directly chain .then method
    .then(function (pizza) { // have it in a separate line to better read
        console.log("1st Pizza");
        console.log(pizza);
        return makePizza4('ham', 'pineapple') // we are returning a function that returns promise
    })
    .then(function (pizza) { // so we can chain a .then again
        console.log("2nd Pizza");
        console.log(pizza);
        return makePizza4('veggies', 'mozzarella')
    })
    .then(function (pizza) {
        console.log("3rd Pizza");
        console.log(pizza)
    })
// from there show there are methods to wait till all promises are resolved, to give the 1st one, etc etc
// REJECTING PROMISES
// if they include pizza, it is automatically rejected
function makePizza5(ingredient1, ingredient2) {
    const pizzaPromise = new Promise(function (resolve, reject) {
        //reject if pineapple
        if (ingredient1 === 'pineapple' || ingredient2 === 'pineapple') {
            reject("We don't like pineapple in pizza here")
        }
        // wait 1 second for the pizza to be cooked
        setTimeout(function () {
            // when you are ready, resolve it
            resolve(`Your ${ingredient1} and ${ingredient2} pizza is ready!`)
        }, 2000)
        // if it fails, let me know
    })
    return pizzaPromise;
}
makePizza5('ham', 'pineapple').then(pizza => console.log(pizza))
// show what happens in the console, say that we are rejecting the promise but we are still
// not handling that error anywhere, we are not CATCHING it anywhere.
// the way to do it is adding the .catch method
makePizza5('pineapple', 'bacon')
    .then(pizza => console.log(pizza))
    .catch(error => {
        console.log(`We have a problem here: ${error}`)
    })
// If we go back to the long list of .then we had before, we ONLY NEED to add 1 .catch at the end to handle that. but if there is an error in the 2 one, the whole list won't be executed, because there was already an error. Sometimes thats good, because if something breaks, myabe you don't want the whole app to run. But if you want to keep doing pizzas, maybe you should use one of the extra methods, like .all or .race
// ASYNC AWAIT
// even tho the .then is better than callback hell it's still a bit meh, we will have a nicer way with async and await.
// The way we create promises is still the same, no changes. Async await are used to handle those promises
function waitForIt(milliseconds) { // a new function that returns a Promise that will resolve
    return new Promise(resolve => { // after an XXX number of milliseconds
        setTimeout(resolve, milliseconds)
    })
}
// What we want to do now is show diferent status depending on how much time we've been waiting
// with async we tell javascript that he needs to treat next function in an asynchronous way
// so he will need to wait at some point for a promise to be either resolved or rejected
// with await, we say that he needs to wait there, till the next function (that returns a promise) is resolved or rejected, and then keep going with the code
// YOU ALWAYS NEED TO INCLUDE THE AWAIT KEYWORD INSIDE OF A ASYNC FUNCTION
async function startThis() {
    console.log("Start!")
    await waitForIt(1000)
    console.log("Executing some API calls to somewhere");
    await waitForIt(3000);
    console.log("DONE!")
}
startThis()
// If we go back to our pizzas:
async function makeDinner() { // we call the function to be async
    const pizza1 = await makePizza5('bacon', 'meat') // we are waiting that makePizza comes back with the result of the promise and store it in a variable
    console.log(`yoooo ${pizza1}`);
}
makeDinner()
// you could have a big one like
async function makeDinner2() {
    const pizza1 = await makePizza5('bacon', 'meat')
    console.log(`yoooo ${pizza1}`);
    const pizza2 = await makePizza5('bacon', 'meat')
    console.log(`yoooo ${pizza2}`);
    const pizza3 = await makePizza5('bacon', 'meat')
    console.log(`yoooo ${pizza3}`);
    const pizza4 = await makePizza5('bacon', 'meat')
    console.log(`yoooo ${pizza4}`);
}
makeDinner2()
// if you prefer to wait till all pizzas are done, you could look for the .all method
// HOW TO HANDLE ERRORS WITH ASYNC AWAIT
// TRY CATCH
// the easy way, you can wrap it in a try and catch. TRY will just try to do that code, but if it cant do it, will just go to catch and return the error it found, but your program wont be broken
async function giveMePizza() {
    try {
        const pizza = await makePizza5('pineapple', 'cheese')
        console.log(pizza)
    } catch (error) {
        console.log(`We have a problem here: ${error}`)
    }
}
giveMePizza();
// you can still add a .catch to the await instead of all that
// FETCH FROM API
// use github api https://api.github.com/users/marcllopis
// show this is a normal object, this object is in this url and we have to get it with:
const endpoint = 'https://api.github.com/users/marcllopis';
// we will use a javascript build in library called fetch
const githubPromise = fetch(endpoint);
console.log(githubPromise)
// with this we have a Promise of some data coming back, we can check console network to show it
// since its a promise, we can go with the old .then
githubPromise.then(response => {
    console.log(response)
}).catch(err => {
    console.log(err)
})
// show how this is not returning the data you want, it's only giving you some headers an extra stuff but not the data.
// The data is not fully there is kinda being streamed and you only get some references cause you might want diferent things depending on what you are doing. If you want the data we want, we can use a method built in like .json (we could want a txt file or csv, doesnt need to be a json)
githubPromise.then(response => {
    return response.json() // this returns a new promise, so we can use again the .then
}).then(data => {
    console.log(data) // just get our data
}).catch(err => {
    console.log(err)
})
async function giveMeData() {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data.name)
    document.getElementById('data').innerHTML = data.name
}
giveMeData()





