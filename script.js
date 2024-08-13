let fields = [
    null, //0
    'circle', //1
    'circle', //2
    null, //3
    'cross', //4
    null, //5
    null, //6
    'cross', //7
    null  //8
];

// Die render() Funktion
function render() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Vorherige Inhalte löschen

    const table = document.createElement('table');

    for (let row = 0; row < 3; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < 3; col++) {
            const td = document.createElement('td');
            const fieldIndex = row * 3 + col;

            if (fields[fieldIndex] === 'circle') {
                td.innerHTML = 'O';
            } else if (fields[fieldIndex] === 'cross') {
                td.innerHTML = 'X';
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    gameBoard.appendChild(table);
}

// Rendern des Spielfelds
render();