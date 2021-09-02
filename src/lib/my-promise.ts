type ExecuteFunction = (onFulfilled: (arg: any) => void, onRejected: (reason: any) => void) => void;

enum PromiseStates {
    Pending = "pending",
    Fulfilled = "fulfilled",
    Rejected = "rejected"
}

export class MyPromise {
    private state: PromiseStates;
    private callbackFn: ExecuteFunction;
    private value: any;

    constructor(callbackFn: ExecuteFunction) {
        this.state = PromiseStates.Pending;
        this.callbackFn = callbackFn;
    }

    public then(onFulfilled?, onRejected?) {

    }
}
