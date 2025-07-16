 // Calculator state
        let currentOperand = '0';
        let previousOperand = '';
        let operation = undefined;
        let resetScreen = false;

        // DOM elements
        const currentOperandElement = document.getElementById('currentOperand');
        const previousOperandElement = document.getElementById('previousOperand');

        // Button click ripple effect
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const x = e.clientX - this.getBoundingClientRect().left;
                const y = e.clientY - this.getBoundingClientRect().top;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        function appendNumber(number) {
            if (currentOperand === '0' || resetScreen) {
                currentOperand = '';
                resetScreen = false;
            }
            currentOperand += number;
            updateDisplay();
        }

        function appendDecimal() {
            if (resetScreen) {
                currentOperand = '0.';
                resetScreen = false;
                updateDisplay();
                return;
            }
            if (currentOperand.includes('.')) return;
            if (currentOperand === '') currentOperand = '0';
            currentOperand += '.';
            updateDisplay();
        }

        function toggleSign() {
            if (currentOperand === '0') return;
            currentOperand = (parseFloat(currentOperand) * -1).toString();
            updateDisplay();
        }

        function percentage() {
            if (currentOperand === '0') return;
            currentOperand = (parseFloat(currentOperand) / 100).toString();
            updateDisplay();
        }

        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
        }

        function chooseOperation(op) {
            if (currentOperand === '' && previousOperand !== '') {
                operation = op;
                updateDisplay();
                return;
            }
            
            if (currentOperand === '') return;
            
            if (previousOperand !== '') {
                compute();
            }
            
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        }

        function compute() {
            if (operation === undefined) return;
            
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            
            currentOperand = computation.toString();
            operation = undefined;
            previousOperand = '';
            resetScreen = true;
            updateDisplay();
        }

        function updateDisplay() {
            currentOperandElement.textContent = currentOperand;
            
            if (operation != null) {
                previousOperandElement.textContent = `${previousOperand} ${operation}`;
            } else {
                previousOperandElement.textContent = previousOperand;
            }
            
            // Adjust font size for large numbers
            if (currentOperand.length > 8) {
                currentOperandElement.style.fontSize = '2.2rem';
            } else {
                currentOperandElement.style.fontSize = '2.8rem';
            }
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            else if (e.key === '.') appendDecimal();
            else if (e.key === '+') chooseOperation('+');
            else if (e.key === '-') chooseOperation('-');
            else if (e.key === '*') chooseOperation('*');
            else if (e.key === '/') chooseOperation('/');
            else if (e.key === 'Enter' || e.key === '=') compute();
            else if (e.key === 'Escape') clearAll();
            else if (e.key === '%') percentage();
        });