function autoLayout(tableMatrix, availableTableWidth) {
    const maxReducer = (max, current) =>  current >= max ? current: max ;
    // const maxLengthReducer = (max, current) =>  current.length >= max.length ? current: max ;

    // Calculate max and min widths
    const auxMatrix = tableMatrix.map(row => {
        return row.map(cell => {
            return {
                content: cell,
                // The minimum width is given by the widest text element
                minWidth: cell.split(' ').map(w => w.length).reduce( maxReducer, 0 ),
                // The maximum width is given by the widest line
                maxWidth: cell.split('\n').map(w => w.length).reduce( maxReducer, 0 )
            }
        })
    });
    // Calculate each column's minWidth and maxWidth
    const transposed = auxMatrix[0].map((col, i) => auxMatrix.map(row => row[i]));

    const columnMaxMinWidths = transposed.map( col => {
        return {
            // Maximum of the minimum
            minWidth: col.map(col => col.minWidth).reduce( maxReducer , 0),
            // Maximum of the maximum
            maxWidth: col.map(col => col.maxWidth).reduce( maxReducer , 0),
        }
    });
    return getColumnWidthsByMaxMins(columnMaxMinWidths, availableTableWidth);
}

function getColumnWidthsByMaxMins(columnMaxMinWidths, availableTableWidth) {
    console.log({ columnMaxMinWidths });
    //Maximum table width is the sum of all the column maximum widths
    const sumReducer = (acum, width) => acum + width;
    //Minimum table width is the sum of all the column minimum widths
    const minTableWidth = columnMaxMinWidths.map(col => col.minWidth).reduce(sumReducer, 0);
    const W = minTableWidth;
    const A = availableTableWidth;
    const D = A - W;

    const colWidths = columnMaxMinWidths.map( col => {
        // For each column, let d be the difference between maximum and minimum width of that column
        const d = col.maxWidth - col.minWidth;
        // Now set the column's width to the minimum width plus d times W over D
        return col.minWidth + d * W / D;
    });

    // Shrink/stretch to fit all available with (step added by me)
    const totalCalculatedWidth = colWidths.reduce(sumReducer, 0);
    return colWidths.map(cw => (cw / totalCalculatedWidth) * A);
}