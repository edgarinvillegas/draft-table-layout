function getRandomTableMatrix(n, m) {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const randomWords = lorem.split(' ');
    function getRandomWords() {
        //const prob = Math.random();
        const miu = 5; // 5 words in average
        const numberOfWords = -Math.log(Math.random())*miu;     // exponential
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
        const tableMatrix = [];
        for(let i = 0; i < n; i++) {
            const newRow = [];
            for(let j = 0; j < m; j++) {
                const content = getRandomWords();
                newRow.push(content);
            }
            tableMatrix.push(newRow);
        }
        return tableMatrix;
    }

    return getTableMatrix();
}