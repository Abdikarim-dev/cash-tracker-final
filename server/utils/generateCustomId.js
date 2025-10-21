const Counter = require("../models/Counter");

async function generateCustomId(prefix) {
    const [counter] = await Counter.findOrCreate({
        where: { prefix },
        defaults: { lastNumber: 0 },
    });

    counter.lastNumber += 1;
    await counter.save();

    const paddedNumber = counter.lastNumber.toString().padStart(3, "0");
    return `${prefix}-${paddedNumber}`;
}

module.exports = generateCustomId;