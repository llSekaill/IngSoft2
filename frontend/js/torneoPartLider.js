const URL_BASE = 'http://localhost:3000';

const nombPartTorneo = () => {
    const usuarioPartLider = document.getElementById('torneoLoginPart');
    usuarioPartLider.innerHTML = sessionStorage.loginPart;
}

const nombEquiTorneo = () => {
    const equipoPartLider = document.getElementById('torneoEquiPart');
    const body = {
        usuario : String(sessionStorage.loginPart)
    }
    fetch(URL_BASE+"/perfilpartLider",
    {
        method : 'POST',
        body : JSON.stringify(body),
        headers : {
            "Content-type" : "application/json"
        }
    }).then((respPerfil) => {
        respPerfil.json().then((data) => {
            equipoPartLider.innerHTML = data[0].equipo;
        })
    }).catch((error) => {
        console.error(error);
        console.log(error);
    });
}

const verTorneo = () => {
    bodyVT= {
        nomequipo : document.getElementById('torneoEquiPart').innerHTML
    }
    fetch(URL_BASE+"/buscarTorneoEquipo2",
    {
        method : 'POST',
        body : JSON.stringify(bodyVT),
        headers : {
            "Content-type" : "application/json"
        }
    }).then((respVT) => {
        respVT.json().then((dataVT) => {
            console.log(dataVT)
            if(dataVT.msg == "No esta inscrito"){
                const labelHm = document.createElement('label');
                labelHm.setAttribute("class","form-label letrablanca");
                labelHm.innerHTML = "Ningún torneo se ha inscrito";
                const labelHM = document.getElementById('labelHM');
                labelHM.append(labelHm);
            }else{
                const labelHM = document.getElementById('labelHM');
                function removeAllChildNodes(parent) {
                    while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                    }
                }
                removeAllChildNodes(labelHM);
                const divC = document.createElement('div');
                divC.setAttribute("class","container-fluid");
                labelHM.append(divC);
                for(let i=0; i < dataVT.length; i++){
                    const divRow = document.createElement('div');
                    const divCol1 = document.createElement('div');
                    const divCol2 = document.createElement('div');
                    const labelHm = document.createElement('label');
                    const buttonHm = document.createElement('button');
                    divRow.setAttribute("class","row justify-content-between");
                    divRow.setAttribute("id","row"+String(i));
                    divCol1.setAttribute("class","col-md-9");
                    divCol2.setAttribute("class","col-md-3");
                    labelHm.setAttribute("class","form-label letrablanca");
                    labelHm.setAttribute("id","labelTorn"+String(i));
                    buttonHm.setAttribute("type","button");
                    buttonHm.setAttribute("class","btn btn-danger");
                    buttonHm.setAttribute("id","elimTorneo"+String(i));
                    labelHm.innerHTML = String(dataVT[i].nomtorneo);
                    buttonHm.innerHTML = "Eliminar";
                    divC.append(divRow);
                    divRow.append(divCol1);
                    divRow.append(divCol2);
                    divCol1.append(labelHm);
                    divCol2.append(buttonHm);
                    console.log(document.getElementById('labelTorn0').innerHTML);
                }
                for(let j=0; j<dataVT.length; j++){
                    document.querySelector("#elimTorneo"+j).addEventListener("click", (event) => {
                        const nomTorLabel = document.getElementById('labelTorn'+j).innerHTML;
                        bodyCA = {
                            nombretorneo : nomTorLabel
                        }
                        fetch(URL_BASE+"/searchtorneo",
                        {
                            method : 'POST',
                            body : JSON.stringify(bodyCA),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        }).then((respCA) => {
                            respCA.json().then((dataCA) => {
                                if(dataCA[0].estado != "ACTIVO"){
                                    console.log("El torneo esta en curso o ha finalizado");
                                }else{
                                    const bodyElim = {
                                        nomtorneo : nomTorLabel,
                                        nomequipo : document.getElementById('torneoEquiPart').innerHTML
                                    }
                                    fetch(URL_BASE+"/deleteIntegTorneo",
                                    {
                                        method : 'POST',
                                        body : JSON.stringify(bodyElim),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    })
                                    document.getElementById('row'+j).remove();
                                }
                            })
                        })
                    })
                }
            }
        })
    })
}

var main = () => {

    nombPartTorneo();
    nombEquiTorneo();

    $(document).ready(function () {
        var url = 'http://localhost:3000/mostrartorneo';
        $('#example').DataTable({
            "ajax": {
                "url": url,
                "dataSrc": ""
            },
            "columns": [
                { "data": 'nombretorneo' },
                { "data": 'fechainicio' },
                { "data": 'fechafin' },
                { "data": 'estado' },
                { "defaultContent": 
                        `<button class="btn btn-info bg-dark text-white butInfor" data-bs-toggle="modal" data-bs-target="#modalmiEquipo">Información</button>
                        <button class="btn btn-danger bg-dark text-white butInsc" > Inscribirse </button>
                        <button class="btn btn-success bg-dark text-white butTabla" > Ver tabla de posición </button>` }
            ],//butInsc
            language: espanol,
            "pageLength" : 5,
            "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, 'Todos']]
        });
    })
    $(document).on("click", ".butInfor", function(){
        var fila = $(this).closest("tr");
        var nombTorneo = fila.find('td:eq(0)').text();
        const textArea = document.getElementById('exampleFormControlTextarea1');
        const tituloModal = document.getElementById('staticBackdropLabel');
        const numEqui = document.getElementById('numEqui');
        const numInte = document.getElementById('numInte');
        const numPart = document.getElementById('numPart');
        const puntGan = document.getElementById('puntGan');
        const puntEmp = document.getElementById('puntEmp');
        const puntPer = document.getElementById('puntPer');
        tituloModal.innerHTML = nombTorneo;
        const bodyT = {
            nombretorneo : nombTorneo
        }
        fetch(URL_BASE+"/searchtorneo",
        {
            method : 'POST',
            body : JSON.stringify(bodyT),
            headers : {
                "Content-type" : "application/json"
            }
        }).then((respPerfil) => {
            respPerfil.json().then((dataT) => {
                textArea.innerHTML = dataT[0].descripcion;
                numEqui.innerHTML = dataT[0].numequipo;
                numInte.innerHTML = dataT[0].numparticipantes;
                numPart.innerHTML = dataT[0].numpartidas;
                puntGan.innerHTML = dataT[0].puntganada;
                puntEmp.innerHTML = dataT[0].puntempate;
                puntPer.innerHTML = dataT[0].puntperdida;
            })
        }).catch((error) => {
            console.error(error);
            console.log(error);
        });
    })

    $(document).on("click", ".butInsc", function(){
        var fila = $(this).closest("tr");
        var estado = fila.find('td:eq(3)').text();
        var nombTorneo = fila.find('td:eq(0)').text();
        if(estado == "ACTIVO"){
            bodyT = {
                nomtorneo : nombTorneo
            }
            fetch(URL_BASE+"/limiteTorneoEquipo",
            {
                method : 'POST',
                body : JSON.stringify(bodyT),
                headers : {
                    "Content-type" : "application/json"
                }
            }).then((respTorneo) => {
                respTorneo.json().then((dataT) => {
                    
                    bodyE = {
                        equipo : document.getElementById('torneoEquiPart').innerHTML
                    }
                    fetch(URL_BASE+"/limiteIntegrante",
                    {
                        method : 'POST',
                        body : JSON.stringify(bodyE),
                        headers : {
                            "Content-type" : "application/json"
                        }
                    }).then((respEquipo) => {
                        respEquipo.json().then((dataE) => {
                            if(dataT.actualIns >= dataT.limiteEqu){
                                document.getElementById('divMen').remove();
                                var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                                function alert(message, type) {
                                    var wrapper = document.createElement('div');
                                    wrapper.setAttribute("id","divMen");
                                    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';
                                    alertPlaceholder.append(wrapper)
                                }
                                alert('La cantidad de equipo esta completo para el torneo.', 'secondary');
                            }else{
                                console.log(dataE)
                                console.log(dataT)
                                console.log(dataT.limiteInt)
                                if(dataE != dataT.limiteInt){
                                    document.getElementById('divMen').remove();
                                    var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                                    function alert(message, type) {
                                        var wrapper = document.createElement('div');
                                        wrapper.setAttribute("id","divMen");
                                        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';
                                        alertPlaceholder.append(wrapper)
                                    }
                                    alert('Cantidad de integrantes no es aceptable, observe la información del torneo.', 'secondary');
                                }else{
                                    console.log(nombTorneo)
                                    bodyET = {
                                        nomtorneo : nombTorneo,
                                        nomequipo : document.getElementById('torneoEquiPart').innerHTML
                                    }
                                    fetch(URL_BASE+"/buscarTorneoEquipo",
                                    {
                                        method : 'POST',
                                        body : JSON.stringify(bodyET),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }).then((respET) => {
                                        respET.json().then((dataET) => {
                                            if(dataET.msg != "No esta inscrito"){
                                                document.getElementById('divMen').remove();
                                                var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                                                function alert(message, type) {
                                                    var wrapper = document.createElement('div');
                                                    wrapper.setAttribute("id","divMen");
                                                    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';
                                                    alertPlaceholder.append(wrapper)
                                                }
                                                alert('Usted ya esta inscrito en este torneo.', 'success');
                                            }else{
                                                bodyIE = {
                                                    nomtorneo : nombTorneo,
                                                    nomequipo : document.getElementById('torneoEquiPart').innerHTML
                                                }
                                                console.log(bodyIE)
                                                fetch(URL_BASE+"/insertTorneoEquipo",
                                                {
                                                    method : 'POST',
                                                    body : JSON.stringify(bodyIE),
                                                    headers : {
                                                        "Content-type" : "application/json"
                                                    }
                                                }).then((respIE) => {
                                                    respIE.json().then((dataIE) => {
                                                        console.log(dataIE)
                                                        document.getElementById('divMen').remove();
                                                        var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                                                        function alert(message, type) {
                                                            var wrapper = document.createElement('div');
                                                            wrapper.setAttribute("id","divMen");
                                                            wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';
                                                            alertPlaceholder.append(wrapper)
                                                        }
                                                        alert('Gracias por inscribirse al torneo.', 'info');
                                                    })
                                                }).catch((error) => {
                                                    console.error(error);
                                                    console.log(error);
                                                });
                                            }
                                        })
                                    }).catch((error) => {
                                        console.error(error);
                                        console.log(error);
                                    });
                                }
                            }
                        })
                    }).catch((error) => {
                        console.error(error);
                        console.log(error);
                    });
                })
            }).catch((error) => {
                console.error(error);
                console.log(error);
            });
        }else{
            if(estado == "EN CURSO"){
                document.getElementById('divMen').remove();
                var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                function alert(message, type) {
                    var wrapper = document.createElement('div');
                    wrapper.setAttribute("id","divMen");
                    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';
                    alertPlaceholder.append(wrapper);
                }
                alert('No se puede inscribir, el torneo esta en curso.', 'warning');
            }else{
                document.getElementById('divMen').remove();
                var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                function alert(message, type) {
                    var wrapper = document.createElement('div');
                    wrapper.setAttribute("id","divMen");
                    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';
                    alertPlaceholder.append(wrapper);
                }
                alert('No se puede inscribir, el torneo esta finalizado.', 'danger');
            }
        }
    })
    
    document.querySelector('#regresarPrin').addEventListener("click", regresarPrin);
    document.querySelector('#verTorneo').addEventListener("click", verTorneo);
    let espanol = {
        "processing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ torneos",
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "infoEmpty": "Mostrando torneos del 0 al 0 de un total de 0 torneos",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "search": "Buscar torneo:",
        "infoThousands": ",",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "buttons": {
            "copy": "Copiar",
            "colvis": "Visibilidad",
            "collection": "Colección",
            "colvisRestore": "Restaurar visibilidad",
            "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
            "copySuccess": {
                "1": "Copiada 1 fila al portapapeles",
                "_": "Copiadas %d fila al portapapeles"
            },
            "copyTitle": "Copiar al portapapeles",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
                "-1": "Mostrar todas las filas",
                "_": "Mostrar %d filas"
            },
            "pdf": "PDF",
            "print": "Imprimir"
        },
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Rellene todas las celdas con <i>%d<\/i>",
            "fillHorizontal": "Rellenar celdas horizontalmente",
            "fillVertical": "Rellenar celdas verticalmentemente"
        },
        "decimal": ",",
        "searchBuilder": {
            "add": "Añadir condición",
            "button": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "clearAll": "Borrar todo",
            "condition": "Condición",
            "conditions": {
                "date": {
                    "after": "Despues",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual a",
                    "notBetween": "No entre",
                    "notEmpty": "No Vacio",
                    "not": "Diferente de"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacio",
                    "equals": "Igual a",
                    "gt": "Mayor a",
                    "gte": "Mayor o igual a",
                    "lt": "Menor que",
                    "lte": "Menor o igual que",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío",
                    "not": "Diferente de"
                },
                "string": {
                    "contains": "Contiene",
                    "empty": "Vacío",
                    "endsWith": "Termina en",
                    "equals": "Igual a",
                    "notEmpty": "No Vacio",
                    "startsWith": "Empieza con",
                    "not": "Diferente de"
                },
                "array": {
                    "not": "Diferente de",
                    "equals": "Igual",
                    "empty": "Vacío",
                    "contains": "Contiene",
                    "notEmpty": "No Vacío",
                    "without": "Sin"
                }
            },
            "data": "Data",
            "deleteTitle": "Eliminar regla de filtrado",
            "leftTitle": "Criterios anulados",
            "logicAnd": "Y",
            "logicOr": "O",
            "rightTitle": "Criterios de sangría",
            "title": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "value": "Valor"
        },
        "searchPanes": {
            "clearMessage": "Borrar todo",
            "collapse": {
                "0": "Paneles de búsqueda",
                "_": "Paneles de búsqueda (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "Sin paneles de búsqueda",
            "loadMessage": "Cargando paneles de búsqueda",
            "title": "Filtros Activos - %d"
        },
        "select": {
            "cells": {
                "1": "1 celda seleccionada",
                "_": "%d celdas seleccionadas"
            },
            "columns": {
                "1": "1 columna seleccionada",
                "_": "%d columnas seleccionadas"
            },
            "rows": {
                "1": "1 fila seleccionada",
                "_": "%d filas seleccionadas"
            }
        },
        "thousands": ".",
        "datetime": {
            "previous": "Anterior",
            "next": "Proximo",
            "hours": "Horas",
            "minutes": "Minutos",
            "seconds": "Segundos",
            "unknown": "-",
            "amPm": [
                "AM",
                "PM"
            ],
            "months": {
                "0": "Enero",
                "1": "Febrero",
                "10": "Noviembre",
                "11": "Diciembre",
                "2": "Marzo",
                "3": "Abril",
                "4": "Mayo",
                "5": "Junio",
                "6": "Julio",
                "7": "Agosto",
                "8": "Septiembre",
                "9": "Octubre"
            },
            "weekdays": [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sab"
            ]
        },
        "editor": {
            "close": "Cerrar",
            "create": {
                "button": "Nuevo",
                "title": "Crear Nuevo Registro",
                "submit": "Crear"
            },
            "edit": {
                "button": "Editar",
                "title": "Editar Registro",
                "submit": "Actualizar"
            },
            "remove": {
                "button": "Eliminar",
                "title": "Eliminar Registro",
                "submit": "Eliminar",
                "confirm": {
                    "_": "¿Está seguro que desea eliminar %d filas?",
                    "1": "¿Está seguro que desea eliminar 1 fila?"
                }
            },
            "error": {
                "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
            },
            "multi": {
                "title": "Múltiples Valores",
                "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                "restore": "Deshacer Cambios",
                "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
            }
        },
        "info": "Mostrando _START_ a _END_ de _TOTAL_ torneos."
    };
}
window.addEventListener("load", main);