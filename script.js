let fields = [
    null, //0
    null, //1
    null, //2
    null, //3
    null, //4
    null, //5
    null, //6
    null, //7
    null  //8
];

let currentPlayer = 'circle'; // Startspieler
let gameWon = false; // Spielstatus

function init() {
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
            } else {
                // Nur leere Felder sind klickbar, wenn das Spiel nicht gewonnen wurde
                if (!gameWon) {
                    td.onclick = function () {
                        handleMove(td, fieldIndex);
                    };
                }
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    gameBoard.appendChild(table);
}

// Funktion, um einen Zug zu machen
function handleMove(td, index) {
    // Setze das aktuelle Feld im Array auf den aktuellen Spieler
    fields[index] = currentPlayer;

    // Füge das entsprechende SVG in das td-Element ein
    if (currentPlayer === 'circle') {
        td.innerHTML = createCircleSVG();
    } else if (currentPlayer === 'cross') {
        td.innerHTML = createCrossSVG();
    }

    // Entferne das onclick-Attribut, um weitere Klicks zu verhindern
    td.onclick = null;

    // Überprüfe, ob das Spiel vorbei ist
    if (checkWin()) {
        gameWon = true;
        drawWinningLine();
        removeAllOnclickAttributes();
    } else {
        // Wechsle den Spieler, wenn das Spiel nicht gewonnen wurde
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

// Funktion zur Überprüfung, ob ein Spieler gewonnen hat
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von links oben nach rechts unten
        [2, 4, 6]  // Diagonale von rechts oben nach links unten
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Rückgabe der Gewinnkombination
        }
    }

    return null; // Kein Gewinn
}

// Funktion, die die Gewinnlinie zeichnet
function drawWinningLine() {
    const winningCombination = checkWin();
    if (winningCombination) {
        const gameBoard = document.getElementById('game-board');
        
        // SVG für die Linie erstellen
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.position = "absolute";
        svg.style.pointerEvents = "none"; // SVG soll nicht das Spieler-Event blockieren

        // Berechne die Koordinaten für die Gewinnlinie basierend auf den gewonnenen <td> Elementen
        const [start, middle, end] = winningCombination;
        
        // Berechne die Position der <td> Elemente
        const cellSize = 70;
        let offset = cellSize / 2 + 15;

        let x1, y1, x2, y2;

        // Bestimme die Koordinaten für die Gewinnlinie
        if (start % 3 === end % 3) {
            // Vertikale Linie (Spalte)
            const column = start % 3;

            if(start == 1 && end == 7){
                offset = offset + 35;
            }else if(start == 2 && end == 8) {
                offset = offset + 75;
            }

            x1 = column * cellSize + offset;
            y1 = 0;
            x2 = column * cellSize + offset;
            y2 = 3 * cellSize + 105;
        } else if (Math.floor(start / 3) === Math.floor(end / 3)) {
            // Horizontale Linie (Reihe)
            const row = Math.floor(start / 3);

            if(start == 3 && end == 5){
                offset = offset + 35;
            }else if(start == 6 && end == 8) {
                offset = offset + 70;
            }

            x1 = 0;
            y1 = row * cellSize + offset;
            x2 = 3 * cellSize + 105;
            y2 = row * cellSize + offset;
        } else if (start === 0 && end === 8) {
            // Diagonale von oben links nach unten rechts
            x1 = 0;
            y1 = 0;
            x2 = 3 * cellSize + 105;
            y2 = 3 * cellSize + 105;
        } else if (start === 2 && end === 6) {
            // Diagonale von oben rechts nach unten links
            x1 = 3 * cellSize + 105;
            y1 = 0;
            x2 = 0;
            y2 = 3 * cellSize + 105;
        }

        // Erstelle die Linie
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "white");
        line.setAttribute("stroke-width", "5");
        line.setAttribute("stroke-linecap", "round");

        svg.appendChild(line);
        gameBoard.insertAdjacentElement("afterbegin",svg);

        // Animation der Linie
        line.animate([
            { x2: x1, y2: y1 },
            { x2: x2, y2: y2 }
        ], {
            duration: 500,
            fill: "forwards"
        });
    }
}

function removeAllOnclickAttributes() {
    // Hole das Spielfeld-Element
    const gameBoard = document.getElementById('game-board');
    
    // Hole alle <td> Elemente im Spielbrett
    const tdElements = gameBoard.getElementsByTagName('td');
    
    // Durchlaufe alle <td> Elemente und entferne das onclick Attribut
    for (let td of tdElements) {
        td.onclick = null;
    }
}

// SVG für Kreis
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

// SVG für Kreuz
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
