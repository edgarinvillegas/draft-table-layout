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
            this.net = new brain.NeuralNetwork({ hiddenLayers: [7] });
            this.trained = false;
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
        this.trained = true;
    }
    predict(subjectInput) {
        return this.net.run(subjectInput.map(normalizer)).map(denormalizer);
    }
    export() {
        return this.net.toJSON();
    }
    import(json) {
        this.net.fromJSON(json);
        this.trained = true;
    }
    isTrained() {
        return !!this.trained;
    }
}

export default TableLayoutMLModel;
