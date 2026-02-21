let currentCaptcha = "";

function generateCaptcha() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for(let i=0; i<5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const display = document.getElementById("captcha-display");
    if(display) display.innerText = code;
    return code;
}

function refreshCaptcha() {
    currentCaptcha = generateCaptcha();
}

document.addEventListener("DOMContentLoaded", () => {
    refreshCaptcha();
});