function autoLayout(tableMatrix, availableTableWidth) {
    const maxReducer = (max, current) =>  current >= max ? current: max ;

    // Calculate max and min widths
    const n = tableMatrix.length;
    const m = tableMatrix[0] ? tableMatrix[0].length : 0;

    const auxMatrix = tableMatrix.map(row => {
        return row.map(cell => {
            return {
                content: cell,
                // The minimum width is given by the widest text element
                minWidth: cell.split(' ').reduce( maxReducer ),
                // The maximum width is given by the widest line
                maxWidth: cell.split('\n').reduce( maxReducer )  // TODO: support multiple lines
            }
        })
    });

    // Calculate each column's minWidth and maxWidth
    const transposed = auxMatrix[0].map((col, i) => auxMatrix.map(row => row[i]));


    const columns = transposed.map( col => {
        return {
            // Maximum of the minimum
            minWidth: col.map(col => col.minWidth).reduce( maxReducer , 0),
            // Maximum of the maximum
            maxWidth: col.map(col => col.maxWidth).reduce( maxReducer , 0),
            width: null,
            d: null
        }
    });

    //Maximum table width is the sum of all the column maximum widths
    const sumReducer = (acum, width) => acum + width;
    const maxTableWidth = columns.map(col => col.maxWidth).reduce(sumReducer, 0);
    //Minimum table width is the sum of all the column minimum widths
    const minTableWidth = columns.map(col => col.minWidth).reduce(sumReducer, 0);
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

    // Shrink/stretch to fit all available with
    const totalCalculatedWidth = columns.map(col => col.width).reduce((acum, width) => acum + width, 0);
    columns.forEach(col => {
        col.width = (col.width / totalCalculatedWidth) * A;
    });

    return columns.map(col => col.width);
}