/*
Table autolayout algorithm:
https://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.5.2
*/

export function getColumnMaxMinWidths(tableMatrix) {
    const maxReducer = (max, current) =>  current >= max ? current: max ;
    // Calculate max and min widths
    const auxMatrix = tableMatrix.map(row => {
        return row.map(cell => {
            return {
                content: cell,
                // The minimum width is given by the widest text element
                minWidth: cell.split(' ').map(word => word.length).reduce( maxReducer, 0 ),
                // The maximum width is given by the widest line
                maxWidth: cell.split('\n').map(line => line.length).reduce( maxReducer, 0 )
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
    return columnMaxMinWidths;
}

export function getColumnWidthsByMaxMins(columnMaxMinWidths, availableTableWidth) {
    const sumReducer = (acum, width) => acum + width;
    //Minimum table width is the sum of all the column minimum widths
    const minTableWidth = columnMaxMinWidths.map(col => col.minWidth).reduce(sumReducer, 0);
    //Maximum table width is the sum of all the column maximum widths
    const maxTableWidth = columnMaxMinWidths.map(col => col.maxWidth).reduce(sumReducer, 0);
    // 1. The minimum table width is equal to or wider than the available space. In this case, assign the minimum widths and allow the user to scroll horizontally.
    if(minTableWidth >= availableTableWidth) {
        console.log('Case 1: Minimum table width is lower than the available. Use minimums')
        return columnMaxMinWidths.map(col => col.minWidth);
    }
    // 2. The maximum table width fits within the available space. In this case, set the columns to their maximum widths.
    else if(maxTableWidth < availableTableWidth) {
        console.log('Case 2: Max table width is lower than the available.')
        // return columnMaxMinWidths.map(col => col.maxWidth);  // Original algorithm logic (Minimum space)
        // Here we're deviating from original algorithm and stretching to the availableTableWidth
        return columnMaxMinWidths.map(col => col.maxWidth).map( cw => cw/maxTableWidth * availableTableWidth);
    }
    // 3. The maximum width of the table is greater than the available space, but the minimum table width is smaller
    else {
        console.log('Case 3: Max table width is greater than the available. Calculate')
        // find the difference between the available space and the minimum table width, lets call it W
        const W = availableTableWidth - minTableWidth;
        // Lets also call D the difference between maximum and minimum width of the table.
        const D = maxTableWidth - minTableWidth;

        const colWidths = columnMaxMinWidths.map( col => {
            // For each column, let d be the difference between maximum and minimum width of that column
            const d = col.maxWidth - col.minWidth;
            // Now set the column's width to the minimum width plus d times W over D
            return col.minWidth + d * W / D;
        });
        return colWidths;
    }
}