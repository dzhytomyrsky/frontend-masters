const calcElement = document.querySelector('.calculator');
const calcDisplay = calcElement.querySelector('.calculator-display')

const calc = {
    x: 0,
    y: 0,
    current: 'x',
    operant: '',
    setOperant (operant) {
        this.operant = operant
        this.current = 'y';
    },
    operation (input) { 
        const current = this.current

        if (!isNaN(parseInt(input))) {
            this[current] === 0
                ? this[current] = parseInt(input)
                : this[current] = parseInt(this[current].toString() + input.toString());

            return this[current];
        }

        switch (input.toLowerCase()) {
            case 'c':
                this[current] = 0;
                break;
            case '←':
                this[current] = this[current] > 9
                    ? parseInt(this[current].toString().slice(0, -1))
                    : 0;
                break;
            case '×':
            case '÷':
            case '-':
            case '+':
                this.setOperant (input)
                break;
            case '=':
                if (this.current !== 'y' || !this.operant.length) return this[current];
                
                let res;

                switch (this.operant) {
                    case '÷': res = this.x / this.y; break;
                    case '×': res = this.x * this.y; break;
                    case '-': res = this.x - this.y; break;
                    case '+': res = this.x + this.y; break;
                }
                
                this.x = 0;
                this.y = 0;
                this.current = 'x';
                this.operant = '';

                return res;
        }
        
        return this[this.current]; // used [this.current] because it must be dynamic value
    },
}



calcElement.addEventListener('click', function (e) {
    const target = e.target;

    if (!target.classList.contains('button')) {
        return
    }

    calcDisplay.innerText = calc.operation(target.innerText);
})