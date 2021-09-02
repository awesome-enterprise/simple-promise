const promise = new Promise(((onFulfilled, onRejected) => {
    setTimeout(() => {
        onFulfilled("I'm promise result")
    }, 100)
}))

promise.then(data => {
    console.log(data);
})
