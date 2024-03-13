


"use strict";


// Constants
const GWINDOW_WIDTH = 1600
const GWINDOW_HEIGHT = 800
const N_COLUMNS = 40
const TIME_STEP = 10
const LABEL_FONT = "30px 'Sans-Serif'"
const LABEL_COLOR = "#66CC66"
const KATAKANA_START = 12448
const KATAKANA_END = 12544
const COLUMN_WIDTH = GWINDOW_WIDTH / N_COLUMNS

function MatrixDropDemo() {
    new MatrixDropSim();
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

class MatrixDropSim extends CodeTrace {
    constructor() {
        super("MatrixDropSim")
        let gw = this.installGWindow("MatrixDropCanvas");
        this._gw = gw;
        this.reset();
        let timer = gw.setInterval(step, 20);

        function step() {
            let col = getRandomInt(0, N_COLUMNS);
            gw._counts[col] += 1
            let label = GLabel(String.fromCharCode(getRandomInt(KATAKANA_START, KATAKANA_END)));
            label.setFont(LABEL_FONT);
            label.setColor(LABEL_COLOR);
            let x = (col + 0.5) * COLUMN_WIDTH - label.getWidth() / 2;
            let y = gw._counts[col] * label.getHeight()
            if (y >= GWINDOW_HEIGHT) {
                window.clearInterval(timer)
            } else {
                gw.add(label, x, y);
            }
        }

    }



    reset() {
        let gw = this._gw;
        gw.clear();
        let bg = GRect(GWINDOW_WIDTH, GWINDOW_HEIGHT);
        bg.setFilled(true);
        gw.add(bg)
        gw._counts = new Array(N_COLUMNS).fill(0);
    }
}
