const availableTableWidth = 100;
const den = (availableTableWidth/2);
const normalizer = cw => cw / den;
const denormalizer = cw => cw * den;

class TableLayoutMLModel {
    // net = null;  // Not valid for Node 8
    constructor(brain, json) {  // TODO: remove brain parameter
        if(json) {
            this.net = new brain.NeuralNetwork();
            this.import(json);
        } else {
            this.net = new brain.NeuralNetwork({ hiddenLayers: [8, 6] });
        }
    }
    normalizeTrainingData(trainingData) {
        return  trainingData.map( entry => ({
            input: entry.input.map(normalizer),
            output: entry.output.map(normalizer)
        }));
    }
    train(trainingData){
        const normalizedTrainingData = this.normalizeTrainingData(trainingData);
        this.net.train(normalizedTrainingData, {
            log: (data) => console.log(data),
            iterations: 1000
        });
    }
    predict(subjectInput) {
        return this.net.run(subjectInput.map(normalizer)).map(denormalizer);
    }
    export() {
        return this.net.toJSON();
    }
    import(json) {
        this.net.fromJSON(json);
    }
}

export default TableLayoutMLModel;
