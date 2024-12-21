// Variable Declaration
const push = document.querySelector(".push");
const pop = document.querySelector(".pop");
const reset = document.querySelector(".reset");
const bucket = document.querySelector(".main-stack-bucket");
const input = document.querySelector(".text");
const message = document.querySelector(".message");
const messageBox = document.querySelector(".message-box");
const box = document.querySelectorAll(".box");
const stack = [];

// Disable all buttons
const buttonDisable = () => {
    push.disabled = true;
    push.classList.add("disable-button");
    pop.disabled = true;
    pop.classList.add("disable-button");
    reset.disabled = true;
    reset.classList.add("disable-button");
    input.disabled = true;
};

// Enable all buttons
const buttonEnable = () => {
    push.disabled = false;
    push.classList.remove("disable-button");
    pop.disabled = false;
    pop.classList.remove("disable-button");
    reset.disabled = false;
    reset.classList.remove("disable-button");
    input.disabled = false;
};

// When the push button is clicked
push.addEventListener("click", () => {
    // If input box is empty
    if (input.value === "") {
        message.innerHTML = "Please Enter a value.";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    // If the stack is full
    if (stack.length === 5) {
        input.value = "";
        message.innerHTML = "Stack Overflow";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    const itemValue = input.value; // Store the input value
    stack.push(itemValue); // Push the value into the stack

    const currentIndex = stack.length - 1; // Get the current index

    // Creating a new element with index label
    const element = document.createElement("div");
    element.classList.add("ele");

    // Create a div for the index
    const indexLabel = document.createElement("div");
    indexLabel.classList.add("index-label");
    indexLabel.innerText = `Index ${currentIndex}`;

    // Create a div for the value
    const valueDiv = document.createElement("div");
    valueDiv.classList.add("value-div");
    valueDiv.innerText = itemValue;

    // Append index label and value to the element
    element.appendChild(indexLabel);
    element.appendChild(valueDiv);

    // Append the element to the bucket
    bucket.appendChild(element);

    // Update the top
    box[0].innerHTML = `Top: ${itemValue} (Index ${currentIndex})`;

    // Clear the input box
    input.value = "";

    // Adding the animation for a new pushed element
    element.classList.add("ele-add");

    // Animate the stack element appearing
    element.style.transform = "translateY(-50px)";
    element.style.opacity = "0";
    setTimeout(() => {
        element.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";
    }, 100);

    // Disable all buttons
    buttonDisable();

    // After pushing the element
    setTimeout(() => {
        // Remove the animation class
        element.classList.remove("ele-add");

        // Update the Last Pushed Item Value
        box[1].innerHTML = `${itemValue} (Index ${currentIndex})`;

        // Display the message
        message.innerHTML = `Item ${itemValue} is Pushed (into Index ${currentIndex})`;

        // Enable all buttons
        buttonEnable();
    }, 1500);
});

// When the pop button is clicked
pop.addEventListener("click", () => {
    // if Stack is Empty
    if (stack.length === 0) {
        messageBox.classList.add("error-message");
        message.innerHTML = "Stack Underflow (Stack is empty)";
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    // Adding the popping animation
    const lastElement = bucket.lastElementChild;
    lastElement.classList.add("ele-remove");

    // Animate the stack element disappearing
    lastElement.style.transform = "translateY(0)";
    lastElement.style.opacity = "1";
    setTimeout(() => {
        lastElement.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        lastElement.style.transform = "translateY(-100px)";
        lastElement.style.opacity = "0";
    }, 100);

    // Disable all buttons
    buttonDisable();

    // Start popping the element
    setTimeout(() => {
        // Delete the element from the bucket
        bucket.removeChild(bucket.lastElementChild);

        // Storing the popped value
        const itemValue = stack.pop();
        const itemIndex = stack.length; // Index of the popped item

        // Updating the last popped item
        box[2].innerHTML = `${itemValue} (Index ${itemIndex})`;

        // Updating the Top
        if (stack.length === 0) {
            box[0].innerHTML = "Empty";
        } else {
            box[0].innerHTML = `Top: ${stack[stack.length - 1]} (Index ${stack.length - 1})`;
        }

        // Adding the message
        message.innerHTML = `Item ${itemValue} is Popped (from Index ${itemIndex})`;

        // Enable all buttons
        buttonEnable();
    }, 1500);
});

// When the reset button is clicked
reset.addEventListener("click", () => {
    // Clear the full array
    while (stack.length > 0) {
        stack.pop();
    }

    // Clear all fields
    box[0].innerHTML = "Top: None";
    box[1].innerHTML = "";
    box[2].innerHTML = "";
    message.innerHTML = "";

    // Clear all elements from the bucket
    while (bucket.firstChild) {
        bucket.removeChild(bucket.firstChild);
    }
});