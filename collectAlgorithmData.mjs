import autoLayout from './autoLayout.mjs';
const { getColumnMaxMinWidths, getColumnWidthsByMaxMins } = autoLayout;

import grtm from './getRandomTableMatrix';
const { getRandomTableMatrix } = grtm;

//stands for 'Random integer in range'
function riir(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomInputs() {
    const n = riir(1, 6);  //Number of rows
    const m = 5;
    // const m = riir(1, 10);  //Number of columns
    // const availableTableWidth = riir(80, 140);
    const availableTableWidth = 100;
    return { n, m, availableTableWidth };
}

function main() {
    const inputs = getRandomInputs();
    const tableMatrix = getRandomTableMatrix(inputs.n, inputs.m);
    const columnMaxMinWidths = getColumnMaxMinWidths(tableMatrix);
    const output = getColumnWidthsByMaxMins(columnMaxMinWidths, inputs.availableTableWidth);
    console.log(columnMaxMinWidths);
    const dataToLog = {
        input: columnMaxMinWidths.map(col => [col.minWidth, col.maxWidth]).reduce((acc, val) => acc.concat(val), []),
        output: output.map( cw => cw.toFixed(2))
    };
    console.log(`${JSON.stringify(dataToLog)}`);
}

main();