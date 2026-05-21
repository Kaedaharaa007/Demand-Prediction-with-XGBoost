// =========================================
// TRAINING DATA
// x = advertising budget
// y = product demand
// =========================================

const x = [50, 100, 150, 200, 250, 300, 350, 400];
const y = [30, 50, 65, 80, 100, 120, 140, 160];


// =========================================
// SIMPLE LINEAR REGRESSION
// y = mx + b
// =========================================

function linearRegression(x, y) {
    const n = x.length;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    }

    const slope = (n * sumXY - sumX * sumY) /
                (n * sumXX - sumX * sumX);

    const intercept = (sumY - slope * sumX) / n;

    return {
    slope,
    intercept
    };
}

// Train model
const model = linearRegression(x, y);

console.log("Model:", model);
// =========================================
// PREDICTION FUNCTION
// =========================================

function predictDemand() {

    const advertising = Number(
    document.getElementById("advertising").value
    );

    const prediction =
    model.slope * advertising + model.intercept;

    document.getElementById("result").innerHTML =
    `Predicted Demand: ${prediction.toFixed(2)} units`;
}