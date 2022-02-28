const sleep = (time: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(null), time);
    });
};

export default sleep;
