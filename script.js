document.addEventListener("DOMContentLoaded", function() {
    
    // Tool 1: Update displayed values when sliders change 
    const sliders = document.querySelectorAll("input[type=range]");
    const values = document.querySelectorAll('.slider span.value');
    const colorPicker = document.getElementById("colorpicker");
    
    colorPicker.addEventListener("input", generateShadow);

    sliders.forEach((slider, index) => {
        slider.addEventListener('input', () => {
            values[index].textContent = slider.value;
            generateShadow();
        });
    });

    const shadowTypeRadios = document.querySelectorAll('input[name="shadowType"]');
    shadowTypeRadios.forEach(radio => {
        radio.addEventListener('change', generateShadow);
    });

    document.getElementById('output').value = 'box-shadow: 5px 5px 5px 1px #000000;';
    const preview = document.getElementById('preview');
    preview.style.boxShadow = '5px 5px 5px 1px #000000';
  
    // Tool 2: (I believe you will have more code here in the future)

});

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
    const copyText = document.getElementById("output");
    copyText.select();
    copyText.setSelectionRange(0, 99999);  // For mobile devices
    navigator.clipboard.writeText(copyText.value);
}
