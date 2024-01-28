import { useEffect } from "react";

function Editor({id}) {
    useEffect(() => {
        const container = document.getElementById("elem" + id);
        console.log(id);
        container.addEventListener("mousedown", () => {
            document.addEventListener("mousemove", onMouseDrag);
        });
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseDrag);
        });

        function onMouseDrag(event) {
            let leftValue = event.clientX;
            let topValue = event.clientY;
            container.style.left = `${leftValue}px`;
            container.style.top = `${topValue}px`;
        }
      })

    return (
        <div id={"elem" + id} className="container" >
            <img src={require("./Happiness.jpg")} width={"100px"}></img>
        </div>
    )
}
export default Editor;
