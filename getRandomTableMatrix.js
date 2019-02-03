function getRandomTableMatrix(n, m) {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const randomWords = lorem.split(' ');
    function getRandomExp(miu){
        return -Math.log(Math.random())*miu;
    }
    function getRandomWords(miu) {
        if(Math.random() < 0.2) return '';
        const numberOfWords = getRandomExp(miu);     // exponential
        // const numberOfWords = Math.random()*(miu*2);     // uniform
        const ret = [];
        for(let i = 0; i < numberOfWords; i++){
            const randomIndex = Math.floor(Math.random()*randomWords.length);
            ret.push(randomWords[randomIndex]);
        }
        //return randomWords.filter(word => Math.random() < n/ ).join(' ');
        return ret.join(' ');
    }

    function getTableMatrix(){
        // Initialize n x m matrix
        const tableMatrix = new Array(n).fill(null).map( () => new Array(m));
        for(let j = 0; j < m; j++) {
            const colAvgWidth = Math.random()*10;
            for(let i = 0; i < n; i++) {
                const content = getRandomWords(colAvgWidth);
                tableMatrix[i][j] = content;
            }
        }
        return tableMatrix;
    }

    return getTableMatrix();
}