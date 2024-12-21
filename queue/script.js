// Function to show messages in the message box
function showMessage(message, type) {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = message;
    messageArea.className = 'message-area'; // Reset class
  
    if (type === 'warning') {
      messageArea.classList.add('warning');
    } else if (type === 'operation') {
      messageArea.classList.add('operation');
    }
  
    // Make sure the message box is visible
    messageArea.classList.remove('hidden');
  }
  
  // Function to hide the message box
  function hideMessage() {
    const messageArea = document.getElementById('messageArea');
    messageArea.classList.add('hidden');
  }
  
  // Function to set the column size and initialize the queue
  function setColumnSize() {
    const size = parseInt(document.getElementById('columnSize').value);
    const row = document.getElementById('tableRow');
  
    if (size < 0 || size > 9) {
      showMessage('Column size must be between 0 and 9.', 'warning');
      return;
    }
  
    row.innerHTML = '';
  
    for (let i = 0; i < size; i++) {
      const cell = document.createElement('td');
      cell.setAttribute('data-index', i);
      row.appendChild(cell);
    }
  
    currentColumn = 0;
    elementQueue = [];
    headIndex = 0; // Initialize headIndex to 0
    tailIndex = -1; // Initialize tailIndex to -1
    updateHeadTailDisplay();
  
    // Show operation message about the size
    showMessage(`The size of the queue is set to ${size}.`, 'operation');
  }
  
  // Function to add an element to the queue
  function addElement() {
    const element = document.getElementById('element').value.trim();
    const cells = document.querySelectorAll('#tableRow td');
  
    if (element === '') {
      showMessage('Please enter a valid element.', 'warning');
      return;
    }
  
    if (currentColumn < cells.length) {
      cells[currentColumn].textContent = element;
      elementQueue.push(currentColumn);
      tailIndex = currentColumn;
      moveTailToColumn(tailIndex);
  
      if (headIndex === -1) {
        headIndex = currentColumn;
        moveHeadToColumn(headIndex);
      }
  
      currentColumn++;
  
      // Show operation message
      showMessage(`Element "${element}" is inserted at index ${currentColumn - 1}. The head value now is ${headIndex} and the tail value changed to ${tailIndex}.`, 'operation');
    } else {
      showMessage('All columns are filled. Please reset the table to add more elements.', 'warning');
    }
  
    document.getElementById('element').value = '';
    updateHeadTailDisplay();
  }
  
  // Function to remove the oldest element from the queue
  function removeOldestElement() {
    const cells = document.querySelectorAll('#tableRow td');
  
    if (elementQueue.length === 0) {
      showMessage('No elements to remove.', 'warning');
      return;
    }
  
    const oldestColumnIndex = elementQueue.shift(); // Remove the oldest element from the queue
    cells[oldestColumnIndex].textContent = ''; // Clear the cell content
  
    // Keep the head value the same after removing the element
    if (elementQueue.length > 0) {
      headIndex = elementQueue[0]; // Keep head at the first remaining element in the queue
      moveHeadToColumn(headIndex);  // Move head visually
    } else {
      headIndex = 0; // Reset to 0 when queue is empty
    }
  
    // Show operation message, ensuring headIndex is correctly displayed
    showMessage(`Removed oldest element at index ${oldestColumnIndex}. The head value now is ${headIndex}.`, 'operation');
    updateHeadTailDisplay();
  }
  
  // Function to move the tail to a column visually
  function moveTailToColumn(columnIndex) {
    const cells = document.querySelectorAll('#tableRow td');
    
    // Move the tail to the block +1 position
    const newColumnIndex = Math.min(columnIndex + 1, cells.length - 1);
    
    // Calculate the new position
    const position = newColumnIndex * (document.querySelector('td').offsetWidth);
    const container4 = document.getElementById('container4');
    container4.style.left = position + 'px';
  
    // Update the tail index to the new position
    tailIndex = newColumnIndex;
  
    // Update the tailIndex display with the new value
    document.getElementById('tailIndex').textContent = tailIndex;
  }
  
  // Function to move the head to a column visually
  function moveHeadToColumn(columnIndex) {
    const position = columnIndex * (document.querySelector('td').offsetWidth);
    const container = document.getElementById('container');
    container.style.left = position + 'px';
  }
  
  // Function to update the head and tail display
  function updateHeadTailDisplay() {
    document.getElementById('headIndex').textContent = headIndex !== -1 ? headIndex : '-';
    document.getElementById('tailIndex').textContent = tailIndex !== -1 ? tailIndex : '-';
  }
  
  // Function to reset the queue (reload the page)
  function resetQueue() {
    window.location.reload();
  }
  
  // Set column size when the page loads
  setColumnSize();