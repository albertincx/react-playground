import * as React from "react";
import config from "Playground/config";
import {CustomGameProps} from "Playground/interfaces/game";
import {compareArrays, getRandomCellPoint} from "Playground/components/games/Snake/utils";
import CellTypes, {getColorByType} from "Playground/components/games/Snake/CellTypes";

interface SnakeStateValues {
    cells?: any[],
    snake?: number[][],
    foodCell?: number[],
    direction?: string,
    boosterCell?: number[],
    currentSpeed?: number
}

interface SnakeStateScore {
    [key: string]: any
}

interface SnakeState {
    score?: SnakeStateScore,
    values?: SnakeStateValues,
}

const allowedKeys = [
    'w', config.KEY_UP,
    'd', config.KEY_RIGHT,
    's', config.KEY_DOWN,
    'a', config.KEY_LEFT,
    config.KEY_ESCAPE, config.KEY_SPACE
];

class Snake extends React.Component<CustomGameProps, SnakeState> {
    private canvas: HTMLCanvasElement;
    private running: any;
    private boosterTimeout: any;

    constructor(props: CustomGameProps) {
        super(props);
        this.state = {
            score: {
                apples: 0
            },
            values: {
                cells: [],
                snake: [[0], [0]],
                foodCell: null,
                boosterCell: null,
                direction: config.KEY_DOWN,
                currentSpeed: 0,
            }
        };

        this.gameOver = this.gameOver.bind(this);
    }

    public componentWillUnmount() {
        clearInterval(this.running);
        clearTimeout(this.boosterTimeout);
    }

    public componentDidMount() {
        const {isGameStarted, isGameOver} = this.props;
        if (isGameStarted && !isGameOver) {
            this.run();
        } else {
            clearTimeout(this.boosterTimeout);
            clearInterval(this.running);
        }
    }

    public shouldComponentUpdate(props: any) {
        return !(this.props.isGameStarted && !props.isGameOver);
    }

    public render() {
        const {width, height} = this.props.setting;
        return (
            <div>
                <canvas
                    ref={el => this.canvas = el}
                    width={width + config.CELL_BOX}
                    height={height + config.CELL_BOX}
                />
            </div>
        );
    }

    private run(force: boolean = false) {

        if (force) {
            return this.fillCells(true);
        }

        this.loop();
    }

    private gameOver() {
        const score = this.state.score;
        score.speed = this.state.values.currentSpeed;
        score.dimensions = [this.props.setting.width,
            this.props.setting.height];
        this.props.gameOver(this.state.score);
    }

    private loop(newSpeed: number = 0) {
        if (!newSpeed) {
            newSpeed = this.props.setting.speed;
        }
        let timeout = config.MAX_SPEED - newSpeed;
        if (newSpeed >= config.MAX_SPEED) {
            // max GameSpeed
            timeout = 0.5;
        }

        clearInterval(this.running);
        this.running = setInterval(() => {
            this.fillCells();
        }, timeout * 30);
    }

    private isSnakeBody(cell: number[], snake: number[][]): boolean {
        let xIndex = snake[0].indexOf(cell[0]);
        if (xIndex === -1) {
            return false;
        }

        let found = false;
        while (xIndex >= 0) {
            if (snake[1][xIndex] === cell[1]) {
                found = true;
            }
            xIndex = snake[0].indexOf(cell[0], xIndex + 1);
        }

        return found;
    }

    private getPressedKey(keyPressed: string): string {

        const {values} = this.state;
        const {direction: prevDirection} = values;

        if (prevDirection === keyPressed
            || allowedKeys.indexOf(keyPressed) === -1
            || this.props.isGameStarted && keyPressed === ' '
            || (prevDirection === config.KEY_RIGHT && keyPressed === config.KEY_LEFT)
            || (prevDirection === config.KEY_LEFT && keyPressed === config.KEY_RIGHT)
            || (prevDirection === config.KEY_UP && keyPressed === config.KEY_DOWN)
            || (prevDirection === config.KEY_DOWN && keyPressed === config.KEY_UP)
        ) {
            return prevDirection;
        }
        if (keyPressed === config.KEY_SPACE) {
            keyPressed = prevDirection;
        }

        return keyPressed;
    }


    private destroyBooster(): void {
        const {boosterCell, ...newValues} = this.state.values;
        this.setState({
            values: newValues
        });
    }

    private fillCells(startLoop: boolean = false): void {

        const {setting: {key, cellBox: currentCellBox}} = this.props;
        const {width, height} = this.props.setting;
        const direction = this.getPressedKey(key);
        const {values: {snake}, score} = this.state;
        let {foodCell, boosterCell, currentSpeed} = this.state.values;
        if (!currentSpeed) {
            currentSpeed = this.props.setting.speed;
        }
        const cells = [];

        let currentDirectionAxis = config.AXIS_X;
        const cellBox = currentCellBox ? currentCellBox : config.CELL_BOX;
        let reverse = false;

        switch (direction) {
            case config.KEY_UP:
            case config.KEY_DOWN:
                reverse = direction === config.KEY_UP;
                currentDirectionAxis = config.AXIS_Y;
                break;
            case config.KEY_LEFT:
            case config.KEY_RIGHT:
                reverse = direction === config.KEY_LEFT;
                break;
        }

        // Has eaten? Get new food
        if (!foodCell) {
            let randX = getRandomCellPoint(width, 0);
            let randY = getRandomCellPoint(0, height);
            // floor to cellBox
            randX = randX - (randX % cellBox);
            randY = randY - (randY % cellBox);
            foodCell = [randX, randY];
        }

        if (!boosterCell) {
            let randX = getRandomCellPoint(width, 0);
            let randY = getRandomCellPoint(0, height);
            // floor to cellBox
            randX = randX - (randX % cellBox);
            randY = randY - (randY % cellBox);
            boosterCell = [randX, randY];
            clearTimeout(this.boosterTimeout);
            this.boosterTimeout = setTimeout(() => {
                this.destroyBooster();
            }, 5000);
        }

        let growSnake: any | number[] = null;
        const length = snake[0].length;
        const snakeHead = [snake[0][0], snake[1][0]];
        if (reverse) {
            snakeHead[currentDirectionAxis] -= cellBox;
        } else {
            snakeHead[currentDirectionAxis] += cellBox;
        }

        if (this.isSnakeBody(snakeHead, snake)) {
            return this.gameOver();
        }
        if (length > 1) {
            const oldY = snake[0].slice();
            const oldX = snake[1].slice();
            for (let i = 1; i < length; i++) {
                snake[0][i] = oldY[i - 1];
                snake[1][i] = oldX[i - 1];
            }
        }

        snake[0][0] = snakeHead[0];
        snake[1][0] = snakeHead[1];
        if (snake[0][0] < 0) {
            snake[0][0] = width;
        }
        if (snake[0][0] > width) {
            snake[0][0] = 0;
        }

        if (snake[1][0] < 0) {
            snake[1][0] = height;
        }
        if (snake[1][0] > height) {
            snake[1][0] = 0;
        }
        let boostGame = false;
        for (let i = 0; i < width + 1; i++) {
            const rowCells = [];
            for (let j = 0; j < height + 1; j++) {
                const cellSpace = i % cellBox === 0 && j % cellBox === 0;
                if (cellSpace) {

                    let type = CellTypes.BLANK;
                    const currentCell = [i, j];
                    const isFoodCell = compareArrays(foodCell, currentCell);
                    if (isFoodCell) {
                        type = CellTypes.FOOD;
                    }
                    const isBooster = compareArrays(boosterCell, currentCell);
                    if (isBooster) {
                        type = CellTypes.BOOSTER;
                    }

                    if (this.isSnakeBody(currentCell, snake)) {
                        type = CellTypes.SNAKE;
                        if (isFoodCell) {
                            growSnake = currentCell;
                        }
                        if (isBooster) {
                            boostGame = true;
                        }
                    }
                    rowCells.push(type);
                }
            }
            if (rowCells.length) {
                cells.push(rowCells);
            }
        }

        if (growSnake) {
            snake[0].push(growSnake[0]);
            snake[1].push(growSnake[1]);
            foodCell = null;
            score.apples++;
        }
        if (startLoop) {
            this.loop();
        } else if (boostGame) {
            boosterCell = null;
            if (currentSpeed >= 6) {
                currentSpeed += 0.5;
            } else {
                currentSpeed += config.SPEED_STEP;
            }
            this.loop(currentSpeed);
        }
        this.setState({
            score,
            values: {
                cells,
                foodCell,
                boosterCell,
                snake,
                direction,
                currentSpeed
            }
        });


        this.draw(cells);
    }

    private draw(cells: string[][]) {
        if (this.canvas) {
            const cellBox = this.props.setting.cellBox;
            const ctx = this.canvas.getContext('2d');
            cells.map((row: string[], rowIndex: number) => {
                row.map((col: string, colIndex: number) => {
                    ctx.fillStyle = getColorByType(col);
                    ctx.strokeStyle = '#000';
                    const x = rowIndex === 0 ? 0 : (rowIndex * cellBox);
                    const y = colIndex === 0 ? 0 : (colIndex * cellBox);
                    ctx.fillRect(x, y, cellBox - 1, cellBox - 1);
                });
            });
        }
    }
}

export default Snake;