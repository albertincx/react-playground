import * as React from "react";
import config from "Playground/config";
import {CustomGameProps} from "Playground/interfaces/game";

interface SnakeStateValues {
    cells: any[],
    snake: number[][],
    foodCell: number[],
    direction?: string
}

interface SnakeState {
    values: SnakeStateValues
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
    private timer: number = 2;

    constructor(props: any) {
        super(props);
    }

    public loop() {
        const timeout = 100;

        clearInterval(this.running);
        this.running = setInterval(() => {
            this.timer++;
            if (this.timer >= 5) {
                this.timer = 2;
            }
            this.fillCells();
        }, timeout * 5);
    }

    public componentDidMount() {
        if (this.props.isGameStarted) {
            this.run();
        } else {
            clearInterval(this.running);
        }
    }

    public render() {
        const {width, height} = this.props;
        return (
            <canvas ref={el => this.canvas = el} width={width} height={height}/>
        );
    }

    private run(force: boolean = false) {

        if (force) {
            return this.fillCells(true);
        }

        this.loop();
    }


    private fillCells(startLoop: boolean = false): void {

        if (startLoop) {
            this.loop();
        }

        this.draw('Snake running' + Array(this.timer).join('.') + this.props.keys.key);
    }

    private draw(str: string) {
        const {width, height} = this.props;

        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#000';
            ctx.font = '31px sans-serif';
            ctx.fillText(str, 10, 50);
        }
    }
}

export default Snake;