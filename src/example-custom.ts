import { MyPromise } from "./lib/my-promise";

const promise = new MyPromise(((onFulfilled, onRejected) => {
    setTimeout(() => {
        console.log("timeout ended");
        onRejected("I'm promise result")
    }, 100)
}))

console.log("before promise");
promise.then(data => {
    console.log(`Step 1: ${data}`);
    throw new Error("error on step 1");
    return 10;
}).catch(e => {
    console.log("step 2");
    console.dir({error: e});
    return 5;
}).then(data => {
    console.log(`Step 3: ${data}`);
    throw new Error("error on step 3");
}).catch(e => {
    console.log("step 4");
    console.dir({error: e});
})
console.log("after promise");
