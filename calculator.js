let screen = document.getElementById("display");
function press(val) {
    screen.value += val; 
}
function ClearScreen() {
    screen.value = "";
}
function power (){
    screen.value += "**";
}
function backspace(){
    screen.value = screen.value.slice(0,-1);
}
function sqrt(){
    screen.value = Math.sqrt(eval(screen.value));
}
function solve() {
    try {
        screen.value = eval(screen.value);
    } catch (err) {
        screen.value = "Error"; 
    }
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        solve();    
    }
});

