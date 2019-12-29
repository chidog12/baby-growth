
export function calcBabyWeightNextMonth(currentWeight, age){
// 6 ounces per week in (0-6)
// 4 ounces per week in (6-12)

    if(age < 6){
        return (currentWeight + (24/16));
    } else if (age >= 6) {
        return (currentWeight + (16/16));
    }

}

export function calcBabyHeightNextMonth(currentHeight, age){
// .75 in (0-6)
// 3/8 in (6-12)

    if(age < 6){
        return(currentHeight + .75);
    } else if (age >= 6) {
        return(currentHeight + .375);
    }
}

export function calcCurrentDiaperSize(currentWeight){
    // Newborn diapers: Up to 10 lbs
    // Size 1: 8 - 14 lbs
    // Size 2: 12 - 18 lbs
    // Size 3: 16 - 24 lbs
    // Size 4: 22 - 32 lbs
    // Size 5: 27 - 35 lbs
    // Size 6: Over 35 lbs

    if(currentWeight < 8){
        return 0;
    } else if (currentWeight >= 8 && currentWeight < 12) {
        return 1;
    } else if (currentWeight >= 12 && currentWeight < 16) {
        return 2;
    } else if (currentWeight >= 16 && currentWeight < 22) {
        return 3;
    } else if (currentWeight >= 22 && currentWeight < 27) {
        return 4;
    } else if (currentWeight >= 27 && currentWeight < 35) {
        return 5;
    } else {
        return 6;
    }
}