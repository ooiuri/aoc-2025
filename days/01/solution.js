import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'input.txt')
console.log('filePath, ', filePath)

class Dial {
    count;
    position;

    constructor () {
        this.count = 0;
        this.position = 50;
    }

    update_position(position) {
        let value = this.position + position;

        if(value >= 100) {
            value = value % 100;
            // const timesOverZero = Math.floor(position / 100);
            // if (timesOverZero > 0) {
            //     this.count += timesOverZero - 1;
            // } 
        }
        if(value < 0) {
            value = value % 100 + 100;
        }

        this.position = value;
        
        
        if(value === 0) {
            this.count++
        }
        console.log('this.position: ', this.position)
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