function changeText(container) {
    const template = document.getElementById("Template");
    const elems = container.getElementsByClassName("writable");

    for (const elem of elems) {
        elem.ondblclick = function() {
            if (elem.getAttribute("data-inputMode") == null) {
                elem.setAttribute("data-inputMode", "");
                var val = this.innerText;
                var input = document.createElement("input");
                input.value = val;
                template.addEventListener("click", textOutFocus);
                this.innerText="";
                this.appendChild(input);
                input.focus();
            }
    
            function textOutFocus(event) {
                if (!elem.contains(event.target)) {
                    var val = input.value;
                    elem.innerText = val;
                    elem.removeAttribute("data-inputMode");
                }
                else {

                }
            }
        }
    }
}

function changeColor() {
    console.log("Changing");
    const template = document.getElementById("Template");
    const colorPicker = document.getElementById("clr-picker");

    colorPicker.addEventListener("mousedown", () => {
        document.addEventListener("mouseup", pickColor);
    });

    function pickColor() {
        setTimeout(function(){
            console.log("Picking");
            const id = template.getAttribute("data-selected");
            if (id == null || id == "null") {
                const color = document.getElementById("color-picker").value;
                template.style.backgroundColor = color;
            }
            else {
                const elem = document.getElementById(id);
                const color = document.getElementById("color-picker").value;
                elem.style.backgroundColor = color;
            }
            document.removeEventListener("mouseup", pickColor);
        }, 10);
    }
}

export { changeText, changeColor };