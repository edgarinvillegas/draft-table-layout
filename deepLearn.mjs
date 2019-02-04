import brain from 'brain.js'
import trainingData from './trainingData/training01.mjs';

/*
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
const trainingData = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
];
net.train(trainingData);
console.log(net.run([0, 0]));
*/

const availableTableWidth = 100;
const m = 5;
const den = (availableTableWidth/2);
const normalizer = cw => cw / den;
const denormalizer = cw => cw * den;

const normalizedTrainingData =  trainingData.map( entry => ({
    input: entry.input.map(normalizer),
    output: entry.output.map(normalizer)
}));

const net = new brain.NeuralNetwork({ hiddenLayers: [7] });
net.train(normalizedTrainingData, {
    log: (data) => console.log(data),
    iterations: 200
});
const subjectInput = [7,23,10,84,9,26,7,19,11,134];
const predictedOutput = net.run(subjectInput.map(normalizer)).map(denormalizer);
console.log('predictedOutput: ', predictedOutput);
console.log(`columnWidths = [${predictedOutput.join(',')}]`);