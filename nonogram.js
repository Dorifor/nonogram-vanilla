// id ; author_id ; title ; author_name ; is_adult ; column_count ; row_count ; color_count ; colors ; column_cells ; column_colors ; row_cells ; row_colors ;

class Nonogram {
    id;
    author_id;
    title;
    author_name;
    is_adult;
    column_count;
    row_count;
    color_count;
    colors;
    row_cells;
    row_colors;
    column_cells;
    column_colors;

    constructor(row_string) {
        const OFFSET = 9;
        const data = row_string.split(";");

        this.id = parseInt(data.shift());
        this.author_id = parseInt(data.shift());
        this.title = data.shift();
        this.author_name = data.shift();
        this.is_adult = data.shift() == "1";
        this.column_count = parseInt(data.shift());
        this.row_count = parseInt(data.shift());
        this.color_count = parseInt(data.shift());
        this.colors = data.shift().split(",");

        this.column_cells = [];
        this.column_colors = [];
        this.row_cells = [];
        this.row_colors = [];

        this.process_data(data, this.column_count, this.column_cells, this.column_colors);
        this.process_data(data, this.row_count, this.row_cells, this.row_colors);
    }

    process_data(data, count, cells_array, colors_array) {
        for (let _ = 0; _ < count; _++) {
            const d = data.shift();
            if (d === "") {
                cells_array.push([]);
                continue;
            }
            cells_array.push(d.split(',').map(x => parseInt(x)));
        }

        if (this.color_count == 1)
            data.shift();
        else {
            for (let _ = 0; _ < count; _++) {
                const d = data.shift();
                if (d === "") {
                    colors_array.push([]);
                    continue;
                }
                colors_array.push(d.split(',').map(x => parseInt(x)));
            }
        }
    }
}

class Cell {
    x;
    y;
    checkbox;

    constructor(checkbox) {
        this.x = checkbox.dataset.x;
        this.y = checkbox.dataset.y;
        this.checkbox = checkbox;
    }

    init() {
        this.checkbox.addEventListener('click', e => {
            // e.preventDefault();
            console.log(this);
        });

        this.checkbox.addEventListener('contextmenu', e => {
            e.preventDefault();
        });
    }
}

const row = "3;;Equilibrium;;;18;18;1;;6;10;3,3;2,2;2,2;1,3,1;2,5,5,2;3,3,5,2;2,2,5,2;2,3,3,2;2,3,3;3,5,4;16;16;14;11;10;6;;6;10;2,1,4;2,1,3;2,1,5;2,1,5;2,2,7;2,12;2,11;2,9;2,3,7;2,5,6;2,5,5;2,5,5;2,3,5;2,5;10;6;;";
const row2 = "57596;81864;White Dog;Vlan;;5;3;1;;2;;1,1;1;2;;2;1,1;1,1,1;;";

let checkBoxes = document.querySelectorAll('input[name="nonogram"]');

let cells = [];

checkBoxes.forEach(checkbox => {
    let cell = new Cell(checkbox);
    cell.init();
    cells.push(cell);
})

const n1 = new Nonogram(row2);
console.log(n1);

/**
 * Build the DOM with specified Nonogram object
 * 
 * @param {Nonogram} nonogram 
 */
function buildNonogramGrid(nonogram) {
    const gridContainer = document.querySelector('.nonogram-grid');
    // gridContainer.setAttribute('cols', nonogram.column_count);
    gridContainer.style.setProperty('--cols', nonogram.column_count);
    const cells = [];

    const maxConsecutiveColumns = Math.max(nonogram.column_cells.map(i => i.length))
    console.log(maxConsecutiveColumns)

    for (let j = 0; j < nonogram.row_count; j++) {
        for (let i = 0; i < nonogram.column_count; i++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.x = i;
            checkbox.dataset.y = j;
            const cell = new Cell(checkbox);
            cell.init();
            cells.push(cell);

            gridContainer.appendChild(checkbox);
        }
    }
}

buildNonogramGrid(n1);