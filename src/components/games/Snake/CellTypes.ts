const BLANK = 'blank';
const SNAKE = 'snake';
const FOOD = 'food';
const BOOSTER = 'b';

interface CellObject {
    readonly BLANK: string,
    readonly SNAKE: string,
    readonly FOOD: string,
    readonly BOOSTER: string,
}


const CellTypes: CellObject = {
    BLANK,
    SNAKE,
    FOOD,
    BOOSTER,
};

export function getColorByType(type: string) {
    switch (type) {
        case SNAKE: {
            return 'black';
        }
        case FOOD: {
            return 'red';
        }
        case BOOSTER: {
            return 'blue';
        }
    }
    return '#ffd1a9';
}

export default CellTypes;