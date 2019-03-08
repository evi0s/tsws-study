let debug = function (msg: any) {
    if (process.env.DEBUG) {
        console.log(msg);
    }
};

export { debug }