import { MyPromise } from "./my-promise";

class TestablePromise extends MyPromise {
    public TEST_resolve(value) {
        return this.resolve(value);
    }

    public TEST_reject(value) {
        return this.reject(value);
    }
}

const adapter = {
    deferred: () => {
        let promise = new TestablePromise((onFulfilled, onRejected) => {});
        let resolve = promise.TEST_resolve;
        let reject = promise.TEST_reject;
        return { promise, resolve: promise.TEST_resolve, reject: promise.TEST_reject };
    }
}
module.exports = adapter;
