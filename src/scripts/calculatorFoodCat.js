export function calculatePE(weight) {
    if (weight <= 2) {
        return 1.4 * (70 * Math.pow(weight, 0.75));
    } else {
        return 1.4 * (30 * weight + 70);
    }
}

export function calculateEnergyRequirement(pe, activityLevel, age) {
    let multiplier = 1;
    if (activityLevel === 'активная') {
        multiplier *= 1.2;
    }
    if (age === 'котенок до 6 месяцев') {
        multiplier *= 1.6;
    } else if (age === 'котенок после 6 месяцев') {
        multiplier *= 1.2;
    }
    return pe * multiplier;
}

export function calculateDailyFoodRequirement(energyRequirement, caloriesPerGram) {
    return energyRequirement / caloriesPerGram;
}