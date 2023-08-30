document.addEventListener("DOMContentLoaded", function() {
    initTool1();
    initTool2();
    initTool3();
    // initTool4();
    // initTool5();
    initTool6();
    // initTool7();
    initTabs();
});

// Initialize tab functionality
function initTabs() {
    const tools = document.querySelectorAll('.tool-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Hide all tool contents
            tools.forEach(tool => tool.classList.remove('active'));

            // Deactivate all tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Activate the selected tool and its tab button
            const toolId = e.target.getAttribute('onclick').split("'")[1];
            document.getElementById(toolId).classList.add('active');
            e.target.classList.add('active');
        });
    });
}

// Initialize Tool 1
function initTool1() {
    const sliders = document.querySelectorAll("#tool1 .slider input[type=range]");
    const values = document.querySelectorAll('#tool1 .slider span.value');
    const colorPicker = document.getElementById("colorpicker");
    
    colorPicker.addEventListener("input", generateShadow);
    sliders.forEach((slider, index) => {
        slider.addEventListener('input', () => {
            values[index].textContent = slider.value;
            generateShadow();
        });      
    });

    const shadowTypeRadios = document.querySelectorAll('#tool1 input[name="shadowType"]');
    shadowTypeRadios.forEach(radio => {
        radio.addEventListener('change', generateShadow);
    });

    document.getElementById('output').value = 'box-shadow: 5px 5px 5px 1px #000000;';
    const preview = document.getElementById('preview');
    preview.style.boxShadow = '5px 5px 5px 1px #000000';
}

// Initialize Tool 2
function initTool2() {
    const borderControls = document.getElementById('borderControls');
    borderControls.addEventListener('input', generateBorder);
}

function initTool3(){
    const brControls = document.getElementById('brControls');
    brControls.addEventListener('input', generateBradius);
}

function showTool(toolId) {
    const tools = document.querySelectorAll('.tool-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Hide all tool contents
    tools.forEach(tool => tool.classList.remove('active'));

    // Deactivate all tab buttons
    tabButtons.forEach(button => button.classList.remove('active'));

    // Activate the selected tool and its tab button
    document.getElementById(toolId).classList.add('active');

    const activeButton = Array.from(tabButtons).find(btn => btn.getAttribute('onclick').includes(toolId));
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function box_or_text() {
    const shadowType = document.querySelector('input[name="shadowType"]:checked').value;
    const spreadSlider = document.querySelector('.slider:nth-child(4)');

    if (shadowType === 'box') {
        spreadSlider.removeAttribute('hidden');
    } else {
        spreadSlider.setAttribute('hidden', 'true');
    }
}

function generateShadow() {
    box_or_text();

    const shadowType = document.querySelector('input[name="shadowType"]:checked').value;
    const horizontal = document.querySelector('.horizontal').value;
    const vertical = document.querySelector('.vertical').value;
    const blur = document.querySelector('.blur').value;
    const spread = document.querySelector('.spread').value;
    const color = document.getElementById("colorpicker").value;
    const text_cssValue = `${horizontal}px ${vertical}px ${blur}px ${color}`;
    const box_cssValue = `${horizontal}px ${vertical}px ${blur}px ${spread}px ${color}`;

    const preview = document.getElementById('preview');

    if (shadowType === 'text') {
        preview.style.textShadow = text_cssValue;
        preview.style.boxShadow = '';
    } else {
        preview.style.boxShadow = box_cssValue;
        preview.style.textShadow = '';
    }

    document.getElementById('output').value = shadowType === 'text' 
        ? `text-shadow: ${text_cssValue};` 
        : `box-shadow: ${box_cssValue};`;
}

function copy() {
    const activeTool = document.querySelector('.tool-content.active');
    const output = activeTool.querySelector('textarea').value;

    navigator.clipboard.writeText(output)
        .then(() => {
            console.log('CSS copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy CSS: ', err);
        });
}


function generateBorder() {
    const borderWidth = document.querySelector('#tool2 .width').value;
    const borderStyle = document.getElementById('border-style').value;
    const borderColor = document.getElementById('border-colorpicker').value;
    const bgColor = document.getElementById('bg-colorpicker').value;
    
    
    const borderPreview = document.getElementById('border-preview');
    borderPreview.style.border = `${borderWidth}px ${borderStyle} ${borderColor}`;
    borderPreview.style.backgroundColor = bgColor;
    document.querySelector('#borderControls .border-slider .value').innerText = borderWidth;
    document.querySelector('#border-output').value = `border: ${borderWidth}px ${borderStyle} ${borderColor};\nbackground-color: ${bgColor};`;
}

function initTool6(){
    const btnControls = document.getElementById('btnControls');
    document.getElementById("btn-output").value=
    `button {
        background-color: #65b0e2;
        color: #ffffff;
        border-radius: 12px;
        border: 5px solid #2980b9;
        font-size: 21px;
        padding: 10 20;
        cursor: pointer;
        transition: background-color 0.3s;}
    button:hover {
        background-color: #7FCAFC;
    }`;
    btnControls.addEventListener('input', generateButton);
  
}


function generateButton() {
     
    const buttonText = document.getElementById("buttonText").value;
    const bgColor = document.getElementById("btn-bgColor").value;
    const fontColor = document.getElementById("btn-fontColor").value;
    const borderRadius = document.getElementById("btn-borderRadius").value;
    const borderColor = document.getElementById("btn-borderColor").value;
    const borderWidth = document.getElementById("btn-borderWidth").value;
    const fontSize = document.getElementById("btn-fontSize").value;
    const padding = document.getElementById("btn-padding").value;
    
    const css = `
button {
    background-color: ${bgColor};
    color: ${fontColor};
    border-radius: ${borderRadius}px;
    border: ${borderWidth}px solid ${borderColor};
    font-size: ${fontSize}px;
    padding: ${padding};
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: ${darkenColor(bgColor, 10)};
}
`;

    document.getElementById("btn-output").value = css;
    
    // Preview
    const preview = document.getElementById("btn-preview");
    preview.style.backgroundColor = bgColor;
    preview.style.color = fontColor;
    preview.style.borderRadius = `${borderRadius}px`;
    preview.style.border = `${borderWidth}px solid ${borderColor}`;
    preview.style.fontSize = `${fontSize}px`;
    preview.style.padding = padding;
    preview.textContent = buttonText;
}

function darkenColor(color, percent) {
    var num = parseInt(color.replace("#",""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return "#" + (1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1).toUpperCase();
}

// for border -radius 
function generateBradius() {
    const topLeftInput = document.getElementById("topLeft");
    const topRightInput = document.getElementById("topRight");
    const bottomRightInput = document.getElementById("bottomRight");
    const bottomLeftInput = document.getElementById("bottomLeft");

    const preview = document.getElementById("br-preview");
    const output = document.getElementById("br-output");
    const topLeft = topLeftInput.value;
    const topRight = topRightInput.value;
    const bottomRight = bottomRightInput.value;
    const bottomLeft = bottomLeftInput.value;

    const borderRadiusValue = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
    preview.style.borderRadius = borderRadiusValue;

    output.value = `border-radius: ${borderRadiusValue};`;

    document.getElementById("topLeftValue").textContent = topLeft + "%";
    document.getElementById("topRightValue").textContent = topRight + "%";
    document.getElementById("bottomRightValue").textContent = bottomRight + "%";
    document.getElementById("bottomLeftValue").textContent = bottomLeft + "%";
}





