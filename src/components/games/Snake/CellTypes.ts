const BLANK = 'blank';
const SNAKE = 'snake';
const FOOD = 'food';

interface CellObject {
    readonly BLANK: string,
    readonly SNAKE: string,
    readonly FOOD: string,
}


const CellTypes: CellObject = {
    BLANK,
    SNAKE,
    FOOD,
};

export function getColorByType(type: string) {
    switch (type) {
        case SNAKE: {
            return 'black';
        }
        case FOOD: {
            return 'red';
        }
    }
    return '#ffd1a9';
}

export default CellTypes;