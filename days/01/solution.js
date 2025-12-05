import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = path.join(__dirname, 'input.txt')
console.log('filePath, ', filePath)

class Dial {
    count;
    position;
    moves;

    constructor () {
        this.count = 0;
        this.position = 50;
        this.moves = [];
    }

    update_position(position) {
        let value = this.position + position;
        if (value === 100) {
            value = 0;
        }
        let overflow = Math.floor(Math.abs(value)/100)
        if (overflow > 0) {
            this.count += overflow
        } 
        if(value >= 100) {
            value = value % 100;
        }
        if(value < 0) {
            const lastMove = this.moves[this.moves.length - 1] 
            if ( lastMove !== 0 && lastMove !== 100){
                this.count++;
            }
            value = value % 100 + 100;
            if(value === 100) {
                value = 0;
            }
        }
        
        this.position = value;
        if(overflow === 0 && (value === 0 || value === 100)) {
            this.count++
        }

        this.moves.push(this.position);

        console.log('this.position: ', this.position)
        console.log('this.count: ', this.count)
    }

    move(input) {
        if(input.startsWith('L')) {
            const value = Number(input.split('L')[1])
            this.update_position(-value) 
        }
        else if(input.startsWith('R')) {
            const value = Number(input.split('R')[1])
            this.update_position(value) 
        }
    }
}

const main = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = data.split('\n');
    console.log('parsed: ', parsed)
    const dial = new Dial()
    for(const item in parsed){
        console.log('item: ', parsed[item])
        dial.move(parsed[item])
    }
    console.log('result: ', dial.count)
}

main();