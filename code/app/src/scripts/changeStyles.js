function changeText(container) {
    const template = document.getElementById("Template");
    const elems = container.getElementsByClassName("writable");

    for (const elem of elems) {
        elem.ondblclick = function() {
            if (elem.getAttribute("data-inputMode") == null) {
                container.setAttribute("data-inputMode", "");
                elem.setAttribute("data-inputMode", "");
                var val = this.innerText;
                var input = document.createElement("textarea");
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
                    container.removeAttribute("data-inputMode");
                    elem.removeAttribute("data-inputMode");
                    template.removeEventListener("click", textOutFocus);
                }
            }
        }
    }
}

function changeColor() {
    const template = document.getElementById("Template");
    const colorPicker = document.getElementById("clr-picker");
    const colorInput = document.getElementById("color-picker");

    colorPicker.addEventListener("mousedown", () => {
        document.addEventListener("mouseup", pickColor);
    });

    function pickColor() {
        setTimeout(function(){
            const id = template.getAttribute("data-selected");

            if (!(id == null || id === "null")) {
                const elem = document.getElementById(id);
                const color = colorInput.value;
                colorInput.style.color = color;
                elem.style.color = color;
            }
            document.removeEventListener("mouseup", pickColor);
        }, 10);
    }
}

function changeBgColor() {
    const template = document.getElementById("Template");
    const colorPicker = document.getElementById("clr-picker");
    const colorInput = document.getElementById("bgcolor-picker");

    colorPicker.addEventListener("mousedown", () => {
        document.addEventListener("mouseup", pickBgColor);
    });

    function pickBgColor() {
        setTimeout(function(){
            const background = document.getElementById("Background");
            const id = template.getAttribute("data-selected");

            if (id == null || id === "null") {
                const color = colorInput.value;
                colorInput.style.color = color;
                background.style.backgroundColor = color;
            }
            else {
                const elem = document.getElementById(id);
                const color = colorInput.value;
                colorInput.style.color = color;
                elem.style.backgroundColor = color;
            }
            document.removeEventListener("mouseup", pickBgColor);
        }, 10);
    }
}

function changeLink(elem) {
    const template = document.getElementById("Template");
    const links = [...elem.getElementsByTagName("a")];

    template.addEventListener("mousedown", function setLink() {
        for (const [i, link] of links.entries()) {
            link.href = document.getElementById("link-input" + i).value;
        }
        template.removeEventListener("mousedown", setLink);
    })
}

function changeFontSize(size) {
    const template = document.getElementById("Template");

    const id = template.getAttribute("data-selected");
    if (!(id == null || id === "null")) {
        const elem = document.getElementById(id);
        elem.style.fontSize = size + "px";
    }
}

export { changeText, changeColor, changeBgColor, changeLink, changeFontSize };