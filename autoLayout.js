function autoLayout(tableMatrix, availableTableWidth) {
    // Calculate max and min widths
    const n = tableMatrix.length;
    const m = tableMatrix[0] ? tableMatrix[0].length : 0;

    const auxMatrix = tableMatrix.map(row => {
        return row.map(cell => {
            return {
                content: cell,
                minWidth: cell.split(' ').reduce( (maxWord, word) => {
                    return word.length >= maxWord.length ? word: maxWord
                }, '').length,
                // The maximum width is given by the widest line
                maxWidth: cell.length  // TODO: support multiple lines
            }
        })
    });

    // Calculate each column's minWidth and maxWidth
    const columns = [];
    for (let j=0; j < m; j++){
        columns[j] = {
            minWidth: 0,    // Will be the maximum of the minimum
            maxWidth: 0,     // Will be the maximum of the maximum
            width: null,
            d: null
        };
        for(let i=0; i < n; i++){
            const cell = auxMatrix[i][j];
            // Maximum of the minimum
            if (cell.minWidth > columns[j].minWidth) {
                columns[j].minWidth = cell.minWidth;
            }
            // Maximum of the maximum
            if (cell.maxWidth > columns[j].maxWidth) {
                columns[j].maxWidth = cell.maxWidth;
            }
        }
    }

    //Maximum table width is the sum of all the column maximum widths
    const maxTableWidth = columns.map(col => col.maxWidth).reduce((acum, width) => acum + width, 0);
    //Minimum table width is the sum of all the column minimum widths
    const minTableWidth = columns.map(col => col.minWidth).reduce((acum, width) => acum + width, 0);
    const W = minTableWidth;
    const A = availableTableWidth;
    const D = A - W;

    // For each column, let d be the difference between maximum and minimum width of that column
    columns.forEach(col => {
        col.d = col.maxWidth - col.minWidth;
    })
    // Now set the column's width to the minimum width plus d times W over D
    columns.forEach(col => {
        col.width = col.minWidth + col.d * W / D;
    });

    const totalCalculatedWidth = columns.map(col => col.width).reduce((acum, width) => acum + width, 0);
    columns.forEach(col => {
        col.width = (col.width / totalCalculatedWidth) * A;
    });

    return columns.map(col => col.width);
}