import fs from 'fs';
// import trainingData from './trainingData/trainingFromAlgorithm01.mjs';
// import trainingData from './trainingData/trainingFromBrowser01';
import trainingData from './trainingData/trainingData-default';
import brain from 'brain.js'
import TableLayoutMLModel from './TableLayoutMLModel';

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

const model = new TableLayoutMLModel(brain);

model.train(trainingData);

function saveModel() {
    //const modelPath = './trainedModels/networkFromBrowser01.json';
    const modelPath = './trainedModels/network-default.mjs';
    try {
        fs.writeFileSync( modelPath, 'export default ' + JSON.stringify(model.export()) );
        console.log(`${modelPath} saved succesfully!`);
    } catch (exc) {
        console.log(`Could not save ${modelPath}`);
        console.log(exc);
    }
}

// const subjectInput = [13,36,11,46,0,0,3,3,10,29];
// const predictedOutput = model.predict(subjectInput)
// console.log('predictedOutput: ', predictedOutput);
// console.log(`columnWidths = [${predictedOutput.join(',')}]`);
saveModel();
