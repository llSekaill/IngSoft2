//FORMULARIO
const URL_BASE = 'http://localhost:3000';
//var msj = document.getElementById('msj-confirmacion');


const RegistroTorneo = () =>{
    const dtnombre = document.getElementById('dt-nombre').value;
    const dtdescripcion = document.getElementById('dt-descripcion').value;
    const dtfinicio = document.getElementById('dt-finicio').value;
    const dtffin = document.getElementById('dt-ffin').value;
    const dtmcompetidores = document.getElementById('dt-mcompetidores').value;
    const dtpdiarias = document.getElementById('dt-pdiarias').value;
    const dtpganada = document.getElementById('dt-pganada').value;
    const dtpempatada = document.getElementById('dt-pempatada').value;
    const dtpperdida = document.getElementById('dt-pperdida').value;

    const body = {
        NombreTorneo : dtnombre, 
        Descripcion : dtdescripcion,
        FechaInicio : dtfinicio,
        FechaFin : dtffin,
        NumParticipantes : dtmcompetidores,
        NumPartidas : dtpdiarias,
        PuntGanada : dtpganada,
        PuntEmpate : dtpempatada,
        PuntPerdida : dtpperdida
    }

    fetch( `${URL_BASE}/creartorneo`,
    {
        method : 'POST',
        body : JSON.stringify(body),
        headers : {
            "Content-type" : "application/json"
        }
    }).then((respRegistroTorneo) => {
        respRegistroTorneo.json().then((data)=>{
            console.log(data);
        })
        /*if(respRegistroTorneo.statusText == "OK"){           
            //var divAlerta = document.createElement('div');
            msj.innerHTML = "Felicidades ya esta registrado";
            //document.getElementById('menAlerta1').appendChild(divAlerta);
        }*/
    })
}

var main = () => {
    document.querySelector("#btn-enviar").addEventListener("click", RegistroTorneo);
    console.log("HOLA");
}
window.addEventListener("load", main);

/*--FORMULARIO--*/
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
var msj = document.getElementById('msj-confirmacion');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    var mensaje = [];
    var i = 0;
    inputs.forEach((icono)=>{
        if(icono.value === null || icono.value ===''){
            i=i+1;
        }
    })
    if(i>0){
        msj.innerHTML = "Faltan datos"
        setTimeout(() => {
            msj.innerHTML = ""
        }, 4000);
    } else {
        formulario.reset();
        msj.innerHTML = "El torneo ha sido registrado"
        setTimeout(() => {
            msj.innerHTML = ""
        }, 5000);
    }

})