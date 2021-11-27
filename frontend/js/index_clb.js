//FORMULARIO
const URL_BASE = 'http://localhost:3000';

const limpiar = () => {
    document.getElementById('dt-nombre').value = "";
    document.getElementById('dt-descripcion').value = "";
    document.getElementById('dt-finicio').value = "";
    document.getElementById('dt-ffin').value = "";
    document.getElementById('dt-mcompetidores').value = "";
    document.getElementById('dt-mequipo').value = "";
    document.getElementById('dt-pdiarias').value = "";
    document.getElementById('dt-pganada').value = "";
    document.getElementById('dt-pempatada').value = "";
    document.getElementById('dt-pperdida').value = "";
}

const RegistroTorneo = () => {
    const dtnombre = document.getElementById('dt-nombre').value;
    const dtdescripcion = document.getElementById('dt-descripcion').value;
    const dtfinicio = document.getElementById('dt-finicio').value;
    const dtffin = document.getElementById('dt-ffin').value;
    const dtmcompetidores = document.getElementById('dt-mcompetidores').value;
    const dtmequipo = document.getElementById('dt-mequipo').value;
    const dtpdiarias = document.getElementById('dt-pdiarias').value;
    const dtpganada = document.getElementById('dt-pganada').value;
    const dtpempatada = document.getElementById('dt-pempatada').value;
    const dtpperdida = document.getElementById('dt-pperdida').value;
    const msj = document.getElementById('msj-confirmacion');

    if (dtnombre == "" || dtdescripcion == "" || dtfinicio == "" || dtffin == "" || dtmcompetidores == "" || dtmequipo == "" || dtpdiarias == "" || dtpganada == "" || dtpempatada == "" || dtpperdida == "") {
        msj.innerHTML = "Por favor, complete todos los campos faltantes.";
        setTimeout(() => {
            msj.innerHTML = ""
        }, 4000);
    } else {
        const body = {
            nombretorneo: dtnombre,
            descripcion: dtdescripcion,
            fechainicio: String(dtfinicio),
            fechafin: String(dtffin),
            numparticipantes: parseInt(dtmcompetidores),
            numequipo : parseInt(dtmequipo),
            numpartidas: parseInt(dtpdiarias),
            puntganada: parseInt(dtpganada),
            puntempate: parseInt(dtpempatada),
            puntperdida: parseInt(dtpperdida)
        }
        fetch(`${URL_BASE}/searchtorneo`,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json"
                }
            }).then((respsearchtorneo) => {
                respsearchtorneo.json().then((data) => {
                    if (data.msg != "Error") {
                        console.log(data.nombretorneo)
                        msj.innerHTML = "El nombre del torneo ya existe";
                        setTimeout(() => {
                            msj.innerHTML = ""
                        }, 5000);
                    } else {
                        fetch(`${URL_BASE}/creartorneo`,
                            {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((respcreartorneo) => {
                                respcreartorneo.json().then((dataC) => {
                                    limpiar();
                                    msj.innerHTML = "El torneo ha sido registrado";
                                    setTimeout(() => {
                                        console.log(dataC)
                                        msj.innerHTML = ""
                                    }, 6000);
                                })
                            })
                    }
                })
            })
    }
};

var main = () => {
    document.querySelector("#btn-enviar").addEventListener("click", RegistroTorneo);
}
window.addEventListener("load", main)