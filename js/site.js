const loanCalculator = {
    getValues: function() {
        const loanAmt = this.getElementValue('loanAmount', 60000.0);
        const loanLength = this.getElementValue('loanLength', 60);
        const interestRate = this.getElementValue('interestRate', 4.0);
      
        this.calculateAndDisplayLoan(loanAmt, loanLength, interestRate);
    },

    getElementValue: function(id, defaultValue = 0.0) {
        const value = document.getElementById(id).value;
        return value === "" ? parseFloat(defaultValue) : parseFloat(value);
    },

    calculateAndDisplayLoan: function(loanAmt, loanLength, interestRate) {
        const monthlyRate = interestRate / 1200;
        const totalMonthlyPayment = (loanAmt * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -loanLength));
        let remainingBalance = loanAmt;
        let totalInterest = 0;
        const monthlyPayments = [];
      
        for (let i = 0; i < loanLength; i++) {
            const interestPayment = remainingBalance * monthlyRate;
            const principal = totalMonthlyPayment - interestPayment;
            totalInterest += interestPayment;
            remainingBalance -= principal;
            monthlyPayments.push({
                month: i + 1,
                payment: totalMonthlyPayment,
                principal: principal,
                interest: interestPayment,
                totalInterest: totalInterest,
                balance: remainingBalance
            });
        }
      
        this.displayResults(loanAmt, monthlyPayments);
    },

    displayResults: function(principalValue, loanPayments) {
        const totalInterestValue = loanPayments[loanPayments.length - 1].totalInterest;
        const totalCostValue = principalValue + totalInterestValue;
      
        const tableBody = document.getElementById('loanTableBody');
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
      
        const tableRowTemplate = document.getElementById('mortgageTableRowTemplate');
      
        loanPayments.forEach(payment => {
            const row = document.importNode(tableRowTemplate.content, true);
            const tableCells = row.querySelectorAll('td');
            tableCells[0].textContent = payment.month;
            tableCells[1].textContent = this.formatCurrency(payment.payment);
            tableCells[2].textContent = this.formatCurrency(payment.principal);
            tableCells[3].textContent = this.formatCurrency(payment.interest);
            tableCells[4].textContent = this.formatCurrency(payment.totalInterest);
            tableCells[5].textContent = this.formatCurrency(Math.abs(payment.balance));
            tableBody.appendChild(row);
        });
      
        document.getElementById("MonthlyPaymentAmountDisplay").textContent = this.formatCurrency(loanPayments[0].payment);
        document.getElementById("principal").textContent = this.formatCurrency(principalValue);
        document.getElementById("totalInterestDisplay").textContent = this.formatCurrency(totalInterestValue);
        document.getElementById("totalCostDisplay").textContent = this.formatCurrency(totalCostValue);
    },
    formatCurrency: function(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
};
