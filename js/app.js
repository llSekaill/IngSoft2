const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const contraseña = document.getElementById("contraseña")
const rol = document.getElementById("rol")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    parrafo.innerHTML =""
    //let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(nombre.value.length >20){
        warnings += 'El nombre supera el maximo de caracteres <br>'
        entrar = true
    }
    //console.log(regexEmail.test(correo.value))
    //if(!regexEmail.test(correo.value)){
    //    warnings += 'El correo no es valido <br>'
    //}
    if(contraseña.value.length < 5 ){
        warnings += 'La contraseña debe tener mas de 4 caracteres <br>'
        entrar = true 
    }
    if(entrar){
        parrafo.innerHTML = warnings
    }
}
)



function crear_usuario() {
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var rol = document.getElementById("rol").value;

    const tr = document.createElement('tr');
    const tid = document.createElement('td');
    const tnombre = document.createElement('td');
    const tcorreo = document.createElement('td');
    const trol = document.createElement('td');
    const topciones = document.createElement('td');

    tid.innerHTML = ".-."
    tnombre.innerHTML = nombre;
    tcorreo.innerHTML = correo;
    trol.innerHTML = rol;

    butModificar = document.createElement('button')
    butModificar.setAttribute('class', 'btn btn-link btn-sm');
    butModificar.setAttribute('type', 'button');
    butModificar.innerHTML = "Editar";
    //butModificar.setAttribute("vjid", videojuego.id);
    //butModificar.addEventListener('click',EditarOnclick);

    butEliminar = document.createElement('button')
    butEliminar.setAttribute('class', 'btn btn-link btn-sm');
    butEliminar.setAttribute('type', 'button');
    butEliminar.innerHTML = "Eliminar";
    //utEliminar.setAttribute("vjid", videojuego.id);
    //butEliminar.addEventListener('click', eliminarOnclick);

    topciones.appendChild(butModificar);
    topciones.appendChild(butEliminar);

    tr.appendChild(tid);
    tr.appendChild(tnombre);
    tr.appendChild(tcorreo);
    tr.appendChild(trol);
    tr.appendChild(topciones);
    document.getElementById('tbody').appendChild(tr)


}



function main(){
    document.getElementById('crear').onclick = crear_usuario;
    cargarDatos();

}

window.addEventListener('load',main);