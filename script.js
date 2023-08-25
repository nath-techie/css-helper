document.addEventListener("DOMContentLoaded", function() {
    // Update displayed values when sliders change
    const sliders = document.querySelectorAll("input[type=range]");
    sliders.forEach(slider => {
        slider.addEventListener("input", function() {
            const valueDisplay = this.nextElementSibling;
            valueDisplay.textContent = this.value + (this.classList.contains('colorA') ? '' : 'px');
        });
    });
});

function generateShadow() {
    const shadowSets = document.querySelectorAll('.shadowSet');
    const shadowType = document.querySelector('input[name="shadowType"]:checked').value;
    let shadows = [];

    shadowSets.forEach(set => {
        const horizontal = set.querySelector('.horizontal').value;
        const vertical = set.querySelector('.vertical').value;
        const blur = set.querySelector('.blur').value;
        const spread = set.querySelector('.spread').value;
        const r = set.querySelector('.colorR').value;
        const g = set.querySelector('.colorG').value;
        const b = set.querySelector('.colorB').value;
        const a = set.querySelector('.colorA').value;

        const color = `rgba(${r}, ${g}, ${b}, ${a})`;
        shadows.push(`${horizontal}px ${vertical}px ${blur}px ${spread}px ${color}`);
    });

    let cssValue = shadows.join(', ');

    const preview = document.getElementById('preview');
    if (shadowType == 'text') {
        preview.style.textShadow = cssValue;
        preview.style.boxShadow = '';
    } else {
        preview.style.boxShadow = cssValue;
        preview.style.textShadow = '';
    }

    document.getElementById('output').value = (shadowType === 'text' ? 'text-shadow: ' : 'box-shadow: ') + cssValue + ';';
}
