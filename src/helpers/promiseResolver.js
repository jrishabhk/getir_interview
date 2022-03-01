const awaitPromise = async (promise) => {
    try {
        let data = await promise;
        return [null, data];
    }
    catch(error) {
        console.log(error);
        return [error, null];
    }
}

module.exports = {
    awaitPromise : awaitPromise
}