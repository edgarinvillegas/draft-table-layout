import TableLayoutMLModel from './TableLayoutMLModel.mjs';
import experience from './trainedModels/network-default.mjs';

export function getColumnWidthsML(columnMaxMinWidths, availableTableWidth) {
    const model = new TableLayoutMLModel(window.brain, experience);
    // const subjectInput = columnMaxMinWidths.map(col => [col.minWidth, col.maxWidth]).reduce((acc, val) => acc.concat(val), []);
    // return model.predict(subjectInput);
    return getColumnWidthsMLByMemoryModel(model, columnMaxMinWidths, availableTableWidth)
}

export function getColumnWidthsMLByMemoryModel(trainedModel, columnMaxMinWidths, availableTableWidth) {
    const subjectInput = columnMaxMinWidths.map(col => [col.minWidth, col.maxWidth]).reduce((acc, val) => acc.concat(val), []);
    return trainedModel.predict(subjectInput);
}
