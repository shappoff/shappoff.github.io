export function throttle(func: Function, ms: number) {

    let isThrottled = false;
    let savedArgs: unknown;
    let savedThis: unknown;

    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis as any, savedArgs as any);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}
