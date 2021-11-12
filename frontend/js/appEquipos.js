var acc = document.getElementsByClassName("accordion");
var i;
let miembros=["miembro1","miembro2","miembro3","miembro4","miembro5","miembro6"]
document.getElementById("miembros").innerHTML = miembros;
document.getElementById("miembros1").innerHTML = miembros;
document.getElementById("miembros2").innerHTML = miembros;
document.getElementById("miembros3").innerHTML = miembros;
document.getElementById("miembros4").innerHTML = miembros;
document.getElementById("miembros5").innerHTML = miembros;
document.getElementById("miembros6").innerHTML = miembros;
document.getElementById("miembros7").innerHTML = miembros;
document.getElementById("miembros8").innerHTML = miembros;
document.getElementById("miembros9").innerHTML = miembros;
document.getElementById("miembros10").innerHTML = miembros;
document.getElementById("miembros11").innerHTML = miembros;
document.getElementById("miembros12").innerHTML = miembros;


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}