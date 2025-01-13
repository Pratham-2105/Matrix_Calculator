document.addEventListener('DOMContentLoaded', () => {
    const matrixAContainer = document.getElementById('matrixA');
    const matrixBContainer = document.getElementById('matrixB');
    const resultMatrixContainer = document.getElementById('resultMatrix');
    const addButton = document.getElementById('addButton');
    const subtractButton = document.getElementById('subtractButton');
    const multiplyButton = document.getElementById('multiplyButton');
    const rowsAInput = document.getElementById('rowsA');
    const colsAInput = document.getElementById('colsA');
    const rowsBInput = document.getElementById('rowsB');
    const colsBInput = document.getElementById('colsB');

    const addRowAButton = document.getElementById('addRowA');
    const removeRowAButton = document.getElementById('removeRowA');
    const addColAButton = document.getElementById('addColA');
    const removeColAButton = document.getElementById('removeColA');
    const addRowBButton = document.getElementById('addRowB');
    const removeRowBButton = document.getElementById('removeRowB');
    const addColBButton = document.getElementById('addColB');
    const removeColBButton = document.getElementById('removeColB');

    function createMatrixInput(container, rows, cols) {
        container.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `${container.id}-${i}-${j}`;
                cell.appendChild(input);
                row.appendChild(cell);
            }
            container.appendChild(row);
        }
    }

    function getMatrixValues(container, rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                const value = parseFloat(document.getElementById(`${container.id}-${i}-${j}`).value);
                matrix[i][j] = isNaN(value) ? 0 : value;
            }
        }
        return matrix;
    }

    function addMatrices(matrix1, matrix2) {
        const result = [];
        for (let i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix1[i].length; j++) {
                result[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        return result;
    }

    function subtractMatrices(matrix1, matrix2) {
        const result = [];
        for (let i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix1[i].length; j++) {
                result[i][j] = matrix1[i][j] - matrix2[i][j];
            }
        }
        return result;
    }

    function multiplyMatrices(matrix1, matrix2) {
        const result = [];
        for (let i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix2[0].length; j++) {
                result[i][j] = 0;
                for (let k = 0; k < matrix1[0].length; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        return result;
    }

    function displayResultMatrix(matrix) {
        resultMatrixContainer.innerHTML = '';
        const table = document.createElement('table');
        for (let i = 0; i < matrix.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement('td');
                cell.textContent = matrix[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        resultMatrixContainer.appendChild(table);
    }

    function updateMatrixInputs() {
        const rowsA = parseInt(rowsAInput.value);
        const colsA = parseInt(colsAInput.value);
        const rowsB = parseInt(rowsBInput.value);
        const colsB = parseInt(colsBInput.value);
        createMatrixInput(matrixAContainer, rowsA, colsA);
        createMatrixInput(matrixBContainer, rowsB, colsB);
    }

    function handleKeyNavigation(event) {
        const activeElement = document.activeElement;
        if (activeElement.tagName.toLowerCase() === 'input') {
            const [containerId, row, col] = activeElement.id.split('-');
            let newRow = parseInt(row);
            let newCol = parseInt(col);
            let newContainerId = containerId;

            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    newRow = Math.max(newRow - 1, 0);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    newRow = Math.min(newRow + 1, containerId === 'matrixA' ? parseInt(rowsAInput.value) - 1 : parseInt(rowsBInput.value) - 1);
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    newCol = Math.max(newCol - 1, 0);
                    if (newCol < 0 && containerId === 'matrixB') {
                        newContainerId = 'matrixA';
                        newCol = parseInt(colsAInput.value) - 1;
                    }
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    newCol = Math.min(newCol + 1, containerId === 'matrixA' ? parseInt(colsAInput.value) - 1 : parseInt(colsBInput.value) - 1);
                    if (newCol >= parseInt(colsAInput.value) && containerId === 'matrixA') {
                        newContainerId = 'matrixB';
                        newCol = 0;
                    }
                    break;
            }

            const newInput = document.getElementById(`${newContainerId}-${newRow}-${newCol}`);
            if (newInput) {
                newInput.focus();
            }
        }
    }

    document.addEventListener('keydown', handleKeyNavigation);

    function addRow(input, container) {
        input.value = parseInt(input.value) + 1;
        updateMatrixInputs();
    }

    function removeRow(input, container) {
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            updateMatrixInputs();
        }
    }

    function addCol(input, container) {
        input.value = parseInt(input.value) + 1;
        updateMatrixInputs();
    }

    function removeCol(input, container) {
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            updateMatrixInputs();
        }
    }

    rowsAInput.addEventListener('change', updateMatrixInputs);
    colsAInput.addEventListener('change', updateMatrixInputs);
    rowsBInput.addEventListener('change', updateMatrixInputs);
    colsBInput.addEventListener('change', updateMatrixInputs);
    document.addEventListener('keydown', handleKeyNavigation);

    addButton.addEventListener('click', () => {
        const rowsA = parseInt(rowsAInput.value);
        const colsA = parseInt(colsAInput.value);
        const rowsB = parseInt(rowsBInput.value);
        const colsB = parseInt(colsBInput.value);
        if (rowsA !== rowsB || colsA !== colsB) {
            alert('Matrices must have the same dimensions for addition or subtraction.');
            return;
        }
        const matrixA = getMatrixValues(matrixAContainer, rowsA, colsA);
        const matrixB = getMatrixValues(matrixBContainer, rowsB, colsB);
        const resultMatrix = addMatrices(matrixA, matrixB);
        displayResultMatrix(resultMatrix);
    });

    subtractButton.addEventListener('click', () => {
        const rowsA = parseInt(rowsAInput.value);
        const colsA = parseInt(colsAInput.value);
        const rowsB = parseInt(rowsBInput.value);
        const colsB = parseInt(colsBInput.value);
        if (rowsA !== rowsB || colsA !== colsB) {
            alert('Matrices must have the same dimensions for addition or subtraction.');
            return;
        }
        const matrixA = getMatrixValues(matrixAContainer, rowsA, colsA);
        const matrixB = getMatrixValues(matrixBContainer, rowsB, colsB);
        const resultMatrix = subtractMatrices(matrixA, matrixB);
        displayResultMatrix(resultMatrix);
    });

    multiplyButton.addEventListener('click', () => {
        const rowsA = parseInt(rowsAInput.value);
        const colsA = parseInt(colsAInput.value);
        const rowsB = parseInt(rowsBInput.value);
        const colsB = parseInt(colsBInput.value);
        if (colsA !== rowsB) {
            alert('Number of columns in Matrix A must equal number of rows in Matrix B for multiplication.');
            return;
        }
        const matrixA = getMatrixValues(matrixAContainer, rowsA, colsA);
        const matrixB = getMatrixValues(matrixBContainer, rowsB, colsB);
        const resultMatrix = multiplyMatrices(matrixA, matrixB);
        displayResultMatrix(resultMatrix);
    });

    addRowAButton.addEventListener('click', () => addRow(rowsAInput, matrixAContainer));
    removeRowAButton.addEventListener('click', () => removeRow(rowsAInput, matrixAContainer));
    addColAButton.addEventListener('click', () => addCol(colsAInput, matrixAContainer));
    removeColAButton.addEventListener('click', () => removeCol(colsAInput, matrixAContainer));

    addRowBButton.addEventListener('click', () => addRow(rowsBInput, matrixBContainer));
    removeRowBButton.addEventListener('click', () => removeRow(rowsBInput, matrixBContainer));
    addColBButton.addEventListener('click', () => addCol(colsBInput, matrixBContainer));
    removeColBButton.addEventListener('click', () => removeCol(colsBInput, matrixBContainer));

    updateMatrixInputs();
});
