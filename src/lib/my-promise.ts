type OnFulfilledFn = (data: any) => void;
type OnRejectedFn = (reason: any) => void
type ExecuteFunction = (onFulfilled?: OnFulfilledFn, onRejected?: OnRejectedFn) => void;

enum PromiseStates {
    Pending = "pending",
    Fulfilled = "fulfilled",
    Rejected = "rejected"
}

export class MyPromise {
    private state: PromiseStates;
    private callbackFn: ExecuteFunction;
    private value: any;
    private nextResolveCallback: OnFulfilledFn;
    private nextRejectCallback: OnRejectedFn;
    private next: MyPromise;

    constructor(callbackFn: ExecuteFunction) {
        this.state = PromiseStates.Pending;
        this.callbackFn = callbackFn;
        try {
            this.callbackFn(this.resolve.bind(this), this.reject.bind(this))
        }
        catch (e) {
            this.reject.bind(this)(e);
        }
    }

    public then(onFulfilled?: OnFulfilledFn, onRejected?: OnRejectedFn) {
        this.next = new MyPromise(() => {});
        this.next.nextResolveCallback = onFulfilled;
        this.next.nextRejectCallback = onRejected;
        return this.next;
    }

    public catch(onReject?: OnRejectedFn) {
        if (onReject) {
            return this.then(undefined, onReject);
        }
    }

    protected resolve(data) {
        if (this.state !== PromiseStates.Pending) {
            return;
        }
        this.value = data;
        if (this.next && this.next.nextResolveCallback) {
            let nextResult;
            try {
                nextResult = this.next.nextResolveCallback.bind(this.next)(this.value);
                this.next.resolve.bind(this.next)(nextResult);
            } catch (e) {
                this.next.reject.bind(this.next)(e);
            }
            // setImmediate(() => {
            //     let nextResult;
            //     try {
            //         nextResult = this.next.nextResolveCallback.bind(this.next)(this.value);
            //         this.next.resolve.bind(this.next)(nextResult);
            //     } catch (e) {
            //         this.next.reject.bind(this.next)(e);
            //     }
            // })
        }
        this.state = PromiseStates.Fulfilled;
    }

    protected reject(reason) {
        if (this.state !== PromiseStates.Pending) {
            return;
        }
        this.value = reason;
        let next = this.next;
        while (next && !next.nextRejectCallback) {
            next = next.next;
        }
        if (next) {
            const result = next.nextRejectCallback.bind(next)(reason);
            next.resolve.bind(next)(result);
            // setImmediate(() => {
            //     const result = next.nextRejectCallback.bind(next)(reason);
            //     next.resolve.bind(next)(result);
            // })
        }
        this.state = PromiseStates.Rejected;
    }
}
