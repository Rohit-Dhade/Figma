document.getElementById('secbtn').addEventListener('click', () => {
    const para = document.createElement("div");
    para.className = "relative border-2 w-[30%] h-[30%] cursor-pointer shrink-0 z-10";
    para.innerText = "";
    para.classList.add("box"); 

    
    const corners = ["tl", "tr", "bl", "br"];
    corners.forEach(pos => {
        const point = document.createElement('div');
        point.className = `corner ${pos}`;
        para.appendChild(point);
    });

    para.addEventListener('click', (e) => {
        e.stopPropagation();

        document.querySelectorAll(".box").forEach(b => {
            b.classList.remove("selected", "border-red-400");
        });

        para.classList.toggle("selected");
        para.classList.toggle("border-red-400");
    });

    document.getElementById('elementsContainer').appendChild(para);
});
