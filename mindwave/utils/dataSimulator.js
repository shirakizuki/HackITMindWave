export function simulateWearableData() {
    const acc = [], bvp = [], eda = [], temp = [];

    for (let i = 0; i < 60; i++) {
        acc.push([
            +(Math.random() * 4 - 2).toFixed(4),
            +(Math.random() * 4 - 2).toFixed(4),
            +(Math.random() * 4 - 2).toFixed(4),
        ]);
        bvp.push([+(-2 + Math.random() * 7).toFixed(4)]);
        eda.push([+(0.1 + Math.random() * 2.9).toFixed(4)]);
        temp.push([+(28 + Math.random() * 10).toFixed(4)]);
    }

    const avg = (arr) => arr.reduce((sum, [val]) => sum + val, 0) / arr.length;
    const avgAcc = (index) => acc.reduce((sum, row) => sum + row[index], 0) / acc.length;

    const averages = {
        accX: avgAcc(0),
        accY: avgAcc(1),
        accZ: avgAcc(2),
        bvp: avg(bvp),
        eda: avg(eda),
        temp: avg(temp),
    };

    return {
        data: [acc, bvp, eda, temp],
        averages,
    };
}