let offset = 0;
let zIndexCounter = 1;


document.getElementById('secbtn').addEventListener('click', () => {
    const para = document.createElement("div");
    para.className = "absolute border-2 rounded-md w-[30%] h-[30%] cursor-pointer box";

    para.style.top = `${offset}px`;
    para.style.left = `${offset}px`;
    para.style.zIndex = zIndexCounter++;


    offset += 10;
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
        window.document.querySelectorAll(".box").forEach(b => {
            b.classList.remove("selected", "border-red-400");
        });

        para.classList.add("selected", "border-red-400");
        para.style.zIndex = zIndexCounter++;
    });

    document.getElementById('elementsContainer').appendChild(para);

});

document.getElementById('thirdbtn').addEventListener('click', () => {
    const para = document.createElement("div");
    para.className = "absolute border border-gray-300 cursor-pointer box p-1";

    para.style.top = `${offset}px`;
    para.style.left = `${offset}px`;
    para.style.zIndex = zIndexCounter++;

    offset += 10;

    const textarea = document.createElement("textarea");
    textarea.className = "bg-[#1E1E1E] text-white outline-none border-none resize-none overflow-hidden min-w-[100px] flex items-center justify-center";
    textarea.rows = 1;
    textarea.placeholder = "";

    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.style.spellcheck = "false"
    });


    const corners = ["tl", "tr", "bl", "br"];
    corners.forEach(pos => {
        const point = document.createElement('div');
        point.className = `corner ${pos}`;
        textarea.appendChild(point);
    });

    textarea.addEventListener('click', (e) => {
        e.stopPropagation();

        document.querySelectorAll(".box").forEach(b => {
            b.classList.remove("selected", "border-red-400");
        });
        window.document.querySelectorAll(".box").forEach(b => {
            b.classList.remove("selected", "border-red-400");
        });

        textarea.classList.add("selected", "border-red-400");
        textarea.style.zIndex = zIndexCounter++;
    });

    para.appendChild(textarea);
    document.getElementById('elementsContainer').appendChild(para);
});

let isDragging = false;
let activeBox = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener('mousedown', (e) => {

    if (e.target.classList.contains("corner")) return;

    const box = e.target.closest(".box");
    if (!box) return;

    activeBox = box;
    isDragging = true;

    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;

    box.style.zIndex = zIndexCounter++;
});


document.addEventListener('mousemove', (e) => {
    if (!isDragging || !activeBox) return;

    activeBox.style.left = `${e.clientX - offsetX}px`;
    activeBox.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    activeBox = null;
})


let isResizing = false;
let currentBox = null;
let currentCorner = null;

let startX, startY, startWidth, startHeight, startLeft, startTop;

document.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("corner")) return;

    e.stopPropagation();

    currentCorner = e.target;
    currentBox = currentCorner.parentElement;
    isResizing = true;

    startX = e.clientX;
    startY = e.clientY;

    startWidth = currentBox.offsetWidth;
    startHeight = currentBox.offsetHeight;
    startLeft = currentBox.offsetLeft;
    startTop = currentBox.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!isResizing || !currentBox) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (currentCorner.classList.contains("br")) {
        currentBox.style.width = startWidth + dx + "px";
        currentBox.style.height = startHeight + dy + "px";
    }

    if (currentCorner.classList.contains("bl")) {
        currentBox.style.width = startWidth - dx + "px";
        currentBox.style.height = startHeight + dy + "px";
        currentBox.style.left = startLeft + dx + "px";
    }

    if (currentCorner.classList.contains("tr")) {
        currentBox.style.width = startWidth + dx + "px";
        currentBox.style.height = startHeight - dy + "px";
        currentBox.style.top = startTop + dy + "px";
    }

    if (currentCorner.classList.contains("tl")) {
        currentBox.style.width = startWidth - dx + "px";
        currentBox.style.height = startHeight - dy + "px";
        currentBox.style.left = startLeft + dx + "px";
        currentBox.style.top = startTop + dy + "px";
    }
});

document.addEventListener("mouseup", () => {
    isResizing = false;
    currentBox = null;
    currentCorner = null;
});


document.body.addEventListener("click", () => {
    document.querySelectorAll(".box").forEach(box => {
        box.classList.remove("selected", "border-red-400")
    })
})


