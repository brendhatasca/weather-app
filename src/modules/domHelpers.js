export function createBtn(textCont, className, onClcikHandler) {
    const btn = document.createElement('button');
    btn.textContent = textCont;
    btn.classList.add(className);
    btn.onclick = onClcikHandler;

    return btn;
}

export function createDiv(textCont, className, onClcikHandler) {
    const newDiv = document.createElement('div');
    newDiv.textContent = textCont;
    newDiv.classList.add(className);
    newDiv.onclick = onClcikHandler;
    return newDiv;
}
