const MONTHS = {
    january: { label: 'January', days: 31 },
    february: { label: 'February', days: 28 },
    march: { label: 'March', days: 31 },
    april: { label: 'April', days: 30 },
    may: { label: 'May', days: 31 },
    june: { label: 'June', days: 30 },
    july: { label: 'July', days: 31 },
    august: { label: 'August', days: 31 },
    september: { label: 'September', days: 30 },
    october: { label: 'October', days: 31 },
    november: { label: 'November', days: 30 },
    december: { label: 'December', days: 31 }
};

// Get form elements
const form = document.getElementById('salaryForm');
const resetBtn = document.getElementById('resetBtn');
const resultCard = document.getElementById('resultCard');

// Get input elements
const employeeNameInput = document.getElementById('employeeName');
const monthInput = document.getElementById('month');
const perDaySalaryInput = document.getElementById('perDaySalary');
const overtimeSalaryPerHourInput = document.getElementById('overtimeSalaryPerHour');
const totalDaysWorkedInput = document.getElementById('totalDaysWorked');
const overtimeHoursInput = document.getElementById('overtimeHours');

// Get error message elements
const employeeNameError = document.getElementById('employeeNameError');
const monthError = document.getElementById('monthError');
const perDaySalaryError = document.getElementById('perDaySalaryError');
const overtimeSalaryPerHourError = document.getElementById('overtimeSalaryPerHourError');
const totalDaysWorkedError = document.getElementById('totalDaysWorkedError');
const overtimeHoursError = document.getElementById('overtimeHoursError');

// Get result elements
const resultName = document.getElementById('resultName');
const resultDaysLabel = document.getElementById('resultDaysLabel');
const regularSalary = document.getElementById('regularSalary');
const overtimeSalary = document.getElementById('overtimeSalary');
const totalSalary = document.getElementById('totalSalary');

// Clear error for a specific input
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Show error for a specific input
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

// Format currency in INR
function formatCurrency(amount) {
    return '₹' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Validate form
function validateForm() {
    let isValid = true;

    // Clear all errors first
    clearError(employeeNameInput, employeeNameError);
    clearError(monthInput, monthError);
    clearError(perDaySalaryInput, perDaySalaryError);
    clearError(overtimeSalaryPerHourInput, overtimeSalaryPerHourError);
    clearError(totalDaysWorkedInput, totalDaysWorkedError);
    clearError(overtimeHoursInput, overtimeHoursError);

    // Validate Employee Name
    const employeeName = employeeNameInput.value.trim();
    if (!employeeName) {
        showError(employeeNameInput, employeeNameError, 'Employee name is required');
        isValid = false;
    }

    // Validate Month
    const month = monthInput.value;
    if (!month) {
        showError(monthInput, monthError, 'Please select a month');
        isValid = false;
    }

    // Validate Per Day Salary
    const perDaySalary = parseFloat(perDaySalaryInput.value);
    if (!perDaySalaryInput.value || isNaN(perDaySalary)) {
        showError(perDaySalaryInput, perDaySalaryError, 'Please enter a valid salary');
        isValid = false;
    } else if (perDaySalary <= 0) {
        showError(perDaySalaryInput, perDaySalaryError, 'Salary must be greater than 0');
        isValid = false;
    }

    // Validate Overtime Salary Per Hour
    const overtimeSalaryPerHour = parseFloat(overtimeSalaryPerHourInput.value);
    if (!overtimeSalaryPerHourInput.value || isNaN(overtimeSalaryPerHour)) {
        showError(overtimeSalaryPerHourInput, overtimeSalaryPerHourError, 'Please enter a valid overtime salary');
        isValid = false;
    } else if (overtimeSalaryPerHour < 0) {
        showError(overtimeSalaryPerHourInput, overtimeSalaryPerHourError, 'Overtime salary cannot be negative');
        isValid = false;
    }

    // Validate Total Days Worked
    const totalDaysWorked = parseFloat(totalDaysWorkedInput.value);
    const maxDays = month ? MONTHS[month].days : 31;
    if (!totalDaysWorkedInput.value || isNaN(totalDaysWorked)) {
        showError(totalDaysWorkedInput, totalDaysWorkedError, 'Please enter number of days worked');
        isValid = false;
    } else if (totalDaysWorked < 0) {
        showError(totalDaysWorkedInput, totalDaysWorkedError, 'Days worked cannot be negative');
        isValid = false;
    } else if (totalDaysWorked > maxDays) {
        const monthLabel = MONTHS[month].label;
        showError(totalDaysWorkedInput, totalDaysWorkedError, `Cannot exceed ${maxDays} days for ${monthLabel}`);
        isValid = false;
    }

    // Validate Overtime Hours
    const overtimeHoursValue = parseFloat(overtimeHoursInput.value);
    if (!overtimeHoursInput.value || isNaN(overtimeHoursValue)) {
        showError(overtimeHoursInput, overtimeHoursError, 'Please enter overtime hours');
        isValid = false;
    } else if (overtimeHoursValue < 0) {
        showError(overtimeHoursInput, overtimeHoursError, 'Overtime hours cannot be negative');
        isValid = false;
    }

    return isValid;
}

// Calculate salary
function calculateSalary(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Get values
    const employeeName = employeeNameInput.value.trim();
    const month = monthInput.value;
    const perDaySalary = parseFloat(perDaySalaryInput.value);
    const totalDaysWorked = parseFloat(totalDaysWorkedInput.value);
    const overtimeSalaryPerHour = parseFloat(overtimeSalaryPerHourInput.value);
    const overtimeHoursValue = parseFloat(overtimeHoursInput.value);

    // Calculate
    const regularSalaryAmount = perDaySalary * totalDaysWorked;
    const overtimeSalaryAmount = overtimeSalaryPerHour * overtimeHoursValue;
    const totalSalaryAmount = regularSalaryAmount + overtimeSalaryAmount;

    // Display results
    const monthLabel = MONTHS[month].label;
    const daysText = totalDaysWorked === 1 ? 'day' : 'days';
    
    resultName.textContent = `for ${employeeName}`;
    resultDaysLabel.textContent = `Salary for ${totalDaysWorked} ${daysText} in ${monthLabel}`;
    regularSalary.textContent = formatCurrency(regularSalaryAmount);
    overtimeSalary.textContent = formatCurrency(overtimeSalaryAmount);
    totalSalary.textContent = formatCurrency(totalSalaryAmount);

    // Show result card
    resultCard.style.display = 'block';
    
    // Smooth scroll to results
    setTimeout(() => {
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Reset form
function resetForm() {
    form.reset();
    resultCard.style.display = 'none';
    
    // Clear all errors
    clearError(employeeNameInput, employeeNameError);
    clearError(monthInput, monthError);
    clearError(perDaySalaryInput, perDaySalaryError);
    clearError(overtimeSalaryPerHourInput, overtimeSalaryPerHourError);
    clearError(totalDaysWorkedInput, totalDaysWorkedError);
    clearError(overtimeHoursInput, overtimeHoursError);
}

// Add input listeners to clear errors on input
employeeNameInput.addEventListener('input', () => clearError(employeeNameInput, employeeNameError));
monthInput.addEventListener('change', () => clearError(monthInput, monthError));
perDaySalaryInput.addEventListener('input', () => clearError(perDaySalaryInput, perDaySalaryError));
overtimeSalaryPerHourInput.addEventListener('input', () => clearError(overtimeSalaryPerHourInput, overtimeSalaryPerHourError));
totalDaysWorkedInput.addEventListener('input', () => clearError(totalDaysWorkedInput, totalDaysWorkedError));
overtimeHoursInput.addEventListener('input', () => clearError(overtimeHoursInput, overtimeHoursError));

// Event listeners
form.addEventListener('submit', calculateSalary);
resetBtn.addEventListener('click', resetForm);

// Prevent negative values on number inputs (extra safety)
const numberInputs = [perDaySalaryInput, overtimeSalaryPerHourInput, totalDaysWorkedInput, overtimeHoursInput];
numberInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
        // Prevent minus key
        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
            e.preventDefault();
        }
    });
});
