function clickEvents(container) {
    const template = document.getElementById("Template");
    const colorPicker = document.getElementById("color-picker");
    const bgColorPicker = document.getElementById("bgcolor-picker");
    // container.addEventListener("mouseover", (event) => {

    // });

    // container.addEventListener("mouseup", () => {
    //     container.style.cursor = "move";
    // });

    container.addEventListener("mousedown", (event) => {
        container.style.border = "3px solid #1871FF";
        container.setAttribute("data-offsetX", `${event.clientX - container.offsetLeft}`);
        container.setAttribute("data-offsetY", `${event.clientY - container.offsetTop}`);
        template.setAttribute("data-selected", container.id);

        colorPicker.style.color = container.style.color;
        colorPicker.value = container.style.color;
        bgColorPicker.style.color = container.style.backgroundColor;
        bgColorPicker.value = container.style.backgroundColor;

        if (!resize(event)) {
            dragAndDrop();
        }
    });

    function dragAndDrop () {
        template.addEventListener("mousemove", onMouseDrag);
        template.addEventListener("mousedown", (event) => { 
            if (!container.contains(event.target)) {
                unselect(container);
            }
        });
    
        template.addEventListener("mouseup", () => {
            container.style.cursor = "move";
            template.removeEventListener("mousemove", onMouseDrag);
        });
    
        function onMouseDrag(event) {
            event.preventDefault();
            container.style.left = `${event.clientX - container.getAttribute('data-offsetX')}px`;
            container.style.top = `${event.clientY - container.getAttribute('data-offsetY')}px`;
        }
    }
    
    function resize(event) {
        var mouseX = event.clientX - template.offsetLeft;
        var mouseY = event.clientY - template.offsetTop;
        var left = container.offsetLeft - container.clientWidth / 2;
        var right = container.offsetLeft + container.clientWidth / 2;
        var top = container.offsetTop - container.clientHeight / 2;
        var bottom = container.offsetTop + container.clientHeight / 2;
        var side;
        
        // Horizontal
        if (mouseX - left < 5 || right - mouseX < 5)
        {   
            side = right - mouseX < 5 ? "r" : "l";
            template.addEventListener("mousemove", onMouseHorizontalDrag);
            template.addEventListener("mouseup", function resizeEnd() {
                template.style.cursor = "move";
                container.style.borderColor = "#1871FF";
                template.removeEventListener("mousemove", onMouseHorizontalDrag);
                template.removeEventListener("mouseup", resizeEnd);
            });
            template.style.cursor = "ew-resize";
            container.style.borderColor = "red";

            return true;
        }

        // Vertical
        if (mouseY - top < 5 || bottom - mouseY < 5) {
            side = bottom - mouseY < 5 ? "b" : "t";

            if (container.classList.contains("image")) {
                template.addEventListener("mousemove", onMouseVerticalDragWidth);
                template.addEventListener("mouseup", function resizeEnd() {
                    template.style.cursor = "move";
                    container.style.borderColor = "#1871FF";
                    template.removeEventListener("mousemove", onMouseVerticalDragWidth);
                    template.removeEventListener("mouseup", resizeEnd);
                });
            }
            else {
                template.addEventListener("mousemove", onMouseVerticalDrag);
                template.addEventListener("mouseup", function resizeEnd() {
                    template.style.cursor = "move";
                    container.style.borderColor = "#1871FF";
                    template.removeEventListener("mousemove", onMouseVerticalDrag);
                    template.removeEventListener("mouseup", resizeEnd);
                });
            }
            
            template.style.cursor = "ns-resize";
            container.style.borderColor = "red";

            return true;
        }

        return false;

        function onMouseHorizontalDrag(event) {
            event.preventDefault();
            var mouseX = event.clientX - template.offsetLeft;
            
            var difference = side === "r" ? mouseX - (container.offsetLeft + container.clientWidth / 2) : container.offsetLeft - container.clientWidth / 2 - mouseX;

            if (difference + container.clientWidth > template.clientWidth) { return; }
            container.style.width = difference + container.clientWidth + "px";
        }

        function onMouseVerticalDrag(event) {
            event.preventDefault();
            var mouseY = event.clientY - template.offsetTop;
            var difference = side === "b" ? mouseY - (container.offsetTop + container.clientHeight / 2) : container.offsetTop - container.clientHeight / 2 - mouseY;

            if (difference + container.clientHeight > template.clientHeight) { return; }
            container.style.height = difference + container.clientHeight + "px";
        }

        function onMouseVerticalDragWidth(event) {
            event.preventDefault();
            var mouseY = event.clientY - template.offsetTop;
            var difference = side === "b" ? mouseY - (container.offsetTop + container.clientHeight / 2) : container.offsetTop - container.clientHeight / 2 - mouseY;

            if (difference + container.clientHeight > template.clientHeight) { return; }
            container.style.width = difference + container.clientWidth + "px";
        }
    }
}

function unselect(container) {
    const template = document.getElementById("Template");
    const background = document.getElementById("Background");
    const bgColorPicker = document.getElementById("bgcolor-picker");

    if (template.getAttribute("data-selected") === container.id) {
        template.setAttribute("data-selected", null);
        
        bgColorPicker.style.color = background.style.backgroundColor;
        bgColorPicker.value = background.style.backgroundColor;
    }   

    if (container != null) {
        container.style.borderColor = "transparent";
    }
}

export { clickEvents, unselect };