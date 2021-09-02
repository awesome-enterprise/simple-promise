import { MyPromise } from "./lib/my-promise";

const promise = new MyPromise(((onFulfilled, onRejected) => {
    setTimeout(() => {
        onFulfilled("I'm promise result")
    }, 100)
}))

promise.then(data => {
    console.log(data);
})
