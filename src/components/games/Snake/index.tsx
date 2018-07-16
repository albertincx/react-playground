import * as React from "react";

class Snake extends React.Component<{}, {}> {
    private canvas: HTMLCanvasElement;
    private running: any;
    private timer: number = 2;

    constructor(props: any) {
        super(props);
    }

    public loop() {
        let timeout = 100;

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
        if (true) {
            this.run();
        } else {
            clearInterval(this.running);
        }
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

        this.draw('Snake running' + Array(this.timer).join('.') + this.props.setting.key);
    }

    private draw(str: string) {
        const width = 500;
        const height = 100;
        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#000';
            ctx.font = '31px sans-serif';
            ctx.fillText(str, 10, 50);

        }
    }

    public render() {
        const width = 500;
        const height = 100;

        return (
            <canvas ref={el => this.canvas = el} width={width} height={height}/>
        );
    }
}

export default Snake;