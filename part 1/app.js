// Part 1: Number Facts
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

let baseURL = 'http://numbersapi.com'

// 1.
$.getJSON(`${baseURL}/14?json`)
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})

// 2.
$.getJSON(`${baseURL}/1,5,10,15?json`)
    .then(res => {
        console.log(res)
        for (fact in res) {
            $('.exercise-2').append(`<p>${res[fact]}</p>`)
        }
    })
    .catch(err => {console.log(err)})

// 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/23?json`)
  })
).then(res => {
    console.log(res)
    for (fact in res) {
        $('.exercise-3').append(`<p>${res[fact].text}</p>`)
    }
})