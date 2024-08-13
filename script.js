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

function init() {
    // Rendern des Spielfelds
    render();
}

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
                td.innerHTML = createCircleSVG();
            } else if (fields[fieldIndex] === 'cross') {
                td.innerHTML = createCrossSVG();
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    gameBoard.appendChild(table);
}


function createCircleSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <!-- Hintergrundkreis (optional) 
            <circle cx="35" cy="35" r="30" fill="none" stroke="#ddd" stroke-width="5"></circle> -->

            <!-- Animierter Kreis -->
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5"
                    stroke-dasharray="188.4" stroke-dashoffset="188.4">
                <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="0.2s" fill="freeze" begin="0s"/>
            </circle>
        </svg>
    `;

    return svgHTML;
}

function createCrossSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <!-- Linie 1 des Kreuzes -->
            <line x1="15" y1="15" x2="55" y2="55" stroke="#FFC000" stroke-width="5" stroke-linecap="round">
                <animate attributeName="x2" from="15" to="55" dur="0.2s" fill="freeze" begin="0s" />
                <animate attributeName="y2" from="15" to="55" dur="0.2s" fill="freeze" begin="0s" />
            </line>
            
            <!-- Linie 2 des Kreuzes -->
            <line x1="55" y1="15" x2="15" y2="55" stroke="#FFC000" stroke-width="5" stroke-linecap="round">
                <animate attributeName="x2" from="55" to="15" dur="0.2s" fill="freeze" begin="0s" />
                <animate attributeName="y2" from="15" to="55" dur="0.2s" fill="freeze" begin="0s" />
            </line>
        </svg>
    `;
    
    return svgHTML;
}
