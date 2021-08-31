module.exports = (num = 4) => {
    return new Promise((resolve, reject) => {
        resolve(Math.random().toFixed(num).substr(`-${num}`))
    });
}