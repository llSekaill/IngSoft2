const URL_BASE = 'http://localhost:3000';

const butRegistrar = () => {
    document.getElementById('alerta1').remove();
    const regusuario = document.getElementById('regusuario').value;
    const regcorreo = document.getElementById('regcorreo').value;
    const regpassword = document.getElementById('regpassword').value;
    const regequipo = document.getElementById('regequipo').value
    if(regusuario == "" || regcorreo == "" || regpassword == "" || regequipo == ""){
        var divAlerta = document.createElement('div');
        divAlerta.setAttribute("class","alert alert-danger");
        divAlerta.setAttribute("id","alerta1");
        divAlerta.innerHTML = "Por favor, complete todos los campos faltantes.";
        document.getElementById('menAlerta1').appendChild(divAlerta);
    }else{
        const body = {
            usuario : regusuario,
            correo : regcorreo,
            password : regpassword,
            equipo : regequipo
        }
        fetch(URL_BASE+"/selectConfirm",
        {
            method : 'POST',
            body : JSON.stringify(body),
            headers : {
                "Content-type" : "application/json"
            }
        }).then((respConfim) => {
            respConfim.json().then((dataC) => {
                if(dataC.msg != "Error"){
                    a = 0, b = 0, c =0;
                    for (let i = 0; i < dataC.length; i++){
                        if (dataC[i].correo == regcorreo && dataC[0].equipo == regequipo)  {
                            a = 2;
                        }else{
                            if (dataC[i].correo == regcorreo){
                                b = 1;
                            }else{
                                if(dataC[i].equipo == regequipo){
                                    c =1;
                                }
                            }
                        }
                    }
                    if(a == 2 || b+c == 2){
                        var divAlerta = document.createElement('div');
                        divAlerta.setAttribute("class","alert alert-danger");
                        divAlerta.setAttribute("id","alerta1");
                        divAlerta.innerHTML = "El correo y equipo ya se encuentra registrado. Por favor, cambie el correo y equipo!";
                        document.getElementById('menAlerta1').appendChild(divAlerta);
                    }else{
                        if(b == 1){
                            var divAlerta = document.createElement('div');
                            divAlerta.setAttribute("class","alert alert-danger");
                            divAlerta.setAttribute("id","alerta1");
                            divAlerta.innerHTML = "El correo ya se encuentra registrado. Por favor, cambie el correo.";
                            document.getElementById('menAlerta1').appendChild(divAlerta);
                        }else{
                            if(c == 1){
                                var divAlerta = document.createElement('div');
                                divAlerta.setAttribute("class","alert alert-danger");
                                divAlerta.setAttribute("id","alerta1");
                                divAlerta.innerHTML = "El equipo ya se encuentra registrado. Por favor, cambie el equipo.";
                                document.getElementById('menAlerta1').appendChild(divAlerta);
                            }
                        }
                    }
                }else{
                    fetch(`${URL_BASE}/insertpartLider`,
                    {
                        method : 'POST',
                        body : JSON.stringify(body),
                        headers : {
                            "Content-type" : "application/json"
                        }
                    }).then((respRegistrar) => {
                        if(respRegistrar.statusText == "OK"){           
                            var divAlerta = document.createElement('div');
                            divAlerta.setAttribute("class","alert alert-success");
                            divAlerta.setAttribute("id","alerta1");
                            divAlerta.innerHTML = "Felicidades ya esta registrado";
                            document.getElementById('menAlerta1').appendChild(divAlerta);
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                    const tregusuario = document.getElementById('regusuario');
                    const tregcorreo = document.getElementById('regcorreo');
                    const tregpassword = document.getElementById('regpassword');
                    const tregequipo = document.getElementById('regequipo');
                    tregusuario.value = "";
                    tregcorreo.value = "";
                    tregpassword.value = "";
                    tregequipo.value = "";
                    
                }
            })
        }).catch((error) => {
            console.error(error);
        });
    }
}

const butAcceder = () => {
    document.getElementById('alerta2').remove()
    const logusuario = document.getElementById('logusuario').value;
    const logpassword = document.getElementById('logpassword').value;
    if(logusuario == "" && logpassword == ""){
        var divAlerta = document.createElement('div');
        divAlerta.setAttribute("class","alert alert-danger");
        divAlerta.setAttribute("id","alerta2");
        divAlerta.innerHTML = "Ingrese su usuario y contraseña";
        document.getElementById('mensAlerta2').appendChild(divAlerta);
    }else{
        if(logpassword == ""){
            var divAlerta = document.createElement('div');
            divAlerta.setAttribute("class","alert alert-danger");
            divAlerta.setAttribute("id","alerta2");
            divAlerta.innerHTML = "Ingrese su contraseña";
            document.getElementById('mensAlerta2').appendChild(divAlerta);
        }else{
            if(logusuario == ""){
                var divAlerta = document.createElement('div');
                divAlerta.setAttribute("class","alert alert-danger");
                divAlerta.setAttribute("id","alerta2");
                divAlerta.innerHTML = "Ingrese primero su usuario";
                document.getElementById('mensAlerta2').appendChild(divAlerta);
            }else{
                const body = {
                    usuario : logusuario,
                    password : logpassword
                }
                fetch(URL_BASE+"/loginpartLider",
                {
                    method : 'POST',
                    body : JSON.stringify(body),
                    headers : {
                        "Content-type" : "application/json"
                    }
                }).then((respLogin) => {
                    respLogin.json().then((data) => {
                        if(data.msg != "Error"){
                            const login1 = document.getElementById('login1');   
                            const login2 = document.getElementById('login2');
                            const butcerrar = document.getElementById('butX');
                            login1.setAttribute("style","visibility:hidden;");
                            login2.removeAttribute("style","visibility:hidden;");
                            login2.firstElementChild.innerHTML = data.usuario;
                            var divAlerta = document.createElement('div');
                            divAlerta.setAttribute("id","alerta2");
                            document.getElementById('mensAlerta2').appendChild(divAlerta);
                            sessionStorage.loginPart = data.usuario;
                            butcerrar.click();
                        }else{ 
                            const bodyA = {
                                adminname : logusuario,
                                adminpass : logpassword
                            }
                            fetch(URL_BASE+"/loginAdmin",
                            {
                                method : 'POST',
                                body : JSON.stringify(bodyA),
                                headers : {
                                    "Content-type" : "application/json"
                                }
                            }).then((respLoginA) => {
                                respLoginA.json().then((dataA) => {
                                    if(dataA.msg != "Error"){
                                        window.location.href = "./InicioAdmin.html";
                                        var divAlerta = document.createElement('div');
                                        divAlerta.setAttribute("id","alerta2");
                                        document.getElementById('mensAlerta2').appendChild(divAlerta);
                                        butcerrar.click();
                                    }else{
                                        const bodyO = {
                                            orgname : logusuario,
                                            orgpass : logpassword
                                        }
                                        fetch(URL_BASE+"/loginOrg",
                                        {
                                            method : 'POST',
                                            body : JSON.stringify(bodyO),
                                            headers : {
                                                "Content-type" : "application/json"
                                            }
                                        }).then((respLoginO) => {
                                            respLoginO.json().then((dataO) => {
                                                if(dataO.msg != "Error"){
                                                    window.location.href = "./clb_mostrartorneo.html";
                                                    var divAlerta = document.createElement('div');
                                                    divAlerta.setAttribute("id","alerta2");
                                                    document.getElementById('mensAlerta2').appendChild(divAlerta);
                                                    butcerrar.click();
                                                }else{
                                                    var divAlerta = document.createElement('div');
                                                    divAlerta.setAttribute("class","alert alert-danger");
                                                    divAlerta.setAttribute("id","alerta2");
                                                    divAlerta.innerHTML = "Usuario o contraseña incorrecto";
                                                    document.getElementById('mensAlerta2').appendChild(divAlerta);
                                                }
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
                    })
                }).catch((error) => {
                    console.error(error);
                    console.log(error);
                });
            }
        }
    }
}

const butRegis = (event) => {
    document.getElementById('alerta1').remove()
    var div = document.createElement('div');
    div.setAttribute("id","alerta1");
    document.getElementById('menAlerta1').appendChild(div);
    document.getElementById('logusuario').value = "";
    document.getElementById('logpassword').value = "";
}

const butRegregar = (event) => {
    document.getElementById('alerta2').remove()
    var div = document.createElement('div');
    div.setAttribute("id","alerta2");
    document.getElementById('mensAlerta2').appendChild(div);
}

const cerrarSec = (event) => {
    const login1 = document.getElementById('login1');   
    const login2 = document.getElementById('login2');
    login2.setAttribute("style","visibility:hidden;");
    login1.removeAttribute("style","visibility:hidden;");
    sessionStorage.removeItem("loginPart");
}

const butPerfil = () => {
    const perfilUsuario = document.getElementById('perfilUsuario');
    const perfilCorreo = document.getElementById('perfilCorreo');
    const perfilEquipo = document.getElementById('perfilEquipo');
    const login2 = document.getElementById('login2');
    perfilUsuario.innerHTML = login2.firstElementChild.innerHTML;
    const body = {
        usuario : perfilUsuario.innerHTML
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
            perfilCorreo.innerHTML = data[0].correo;
            perfilEquipo.innerHTML = data[0].equipo;
        })
    }).catch((error) => {
        console.error(error);
        console.log(error);
    });
}

function checkUsuario(checkUsuario){
    const newusuario = document.getElementById('newusuario');
    if(checkUsuario.checked == true){
        newusuario.disabled = false;
    }else{
        if(checkUsuario.checked == false){
            newusuario.disabled = true;
            newusuario.value = "";
        }
    }
}

function checkCorreo(checkCorreo){
    const newcorreo = document.getElementById('newcorreo');
    if(checkCorreo.checked == true){
        newcorreo.disabled = false;
    }else{
        if(checkCorreo.checked == false){
            newcorreo.disabled = true;
            newcorreo.value = "";
        }
    }
}

function checkContraseña(checkContraseña){
    const newcontraseña = document.getElementById('newpassword');
    if(checkContraseña.checked == true){
        newcontraseña.disabled = false;
    }else{
        if(checkContraseña.checked == false){
            newcontraseña.disabled = true;
            newcontraseña.value = "";
        }
    }
}

const butRealizar = () => {
    document.getElementById('alerta11').remove();
    var labelD = document.querySelectorAll("input[class = 'form-control data']");
    var lista = [];
    for(let i=0; i<labelD.length; i++){
        if(labelD[i].disabled == false){
            lista.push(labelD[i].id);
        }
    }
    var a = lista.includes('newusuario');
    var b = lista.includes('newcorreo');
    var c = lista.includes('newpassword');
    const newusuario = document.getElementById('newusuario').value;
    const newcorreo = document.getElementById('newcorreo').value;
    const newpassword = document.getElementById('newpassword').value;
    var body = {};
    var estado = false;
    if(a && b && c == true){
        if(newusuario != "" && newcorreo != "" && newpassword != ""){
            body = {
                usuario : newusuario,
                correo : newcorreo,
                password : newpassword
            }
            estado = true;
        }else{
            var divAlerta = document.createElement('div');
            divAlerta.setAttribute("class","alert alert-danger");
            divAlerta.setAttribute("id","alerta11");
            divAlerta.innerHTML = "Complete los campos faltante, si desea cambiar su informacion!";
            document.getElementById('menAlerta11').appendChild(divAlerta);
        }
    }else{
        if(a && b == true && c == false){
            if(newusuario != "" && newcorreo != ""){
                body = {
                    usuario : newusuario,
                    correo : newcorreo
                }
                estado = true;
            }else{
                var divAlerta = document.createElement('div');
                divAlerta.setAttribute("class","alert alert-danger");
                divAlerta.setAttribute("id","alerta11");
                divAlerta.innerHTML = "Complete los campos faltante, si desea cambiar su informacion!";
                document.getElementById('menAlerta11').appendChild(divAlerta);
            }
        }else{
            if(a && c == true && b == false){
                if(newusuario != "" && newpassword != ""){
                    body = {
                        usuario : newusuario,
                        password : newpassword
                    }
                    estado = true;
                }else{
                    var divAlerta = document.createElement('div');
                    divAlerta.setAttribute("class","alert alert-danger");
                    divAlerta.setAttribute("id","alerta11");
                    divAlerta.innerHTML = "Complete los campos faltante, si desea cambiar su informacion!";
                    document.getElementById('menAlerta11').appendChild(divAlerta);
                }
            }else{
                if(b && c == true && a==false){
                    if(newcorreo != "" && newpassword != ""){
                        body = {
                            correo : newcorreo,
                            password : newpassword
                        }
                        estado = true;
                    }else{
                        var divAlerta = document.createElement('div');
                        divAlerta.setAttribute("class","alert alert-danger");
                        divAlerta.setAttribute("id","alerta11");
                        divAlerta.innerHTML = "Complete los campos faltante, si desea cambiar su informacion!";
                        document.getElementById('menAlerta11').appendChild(divAlerta);
                    }
                }else{
                    if(a == true){
                        if(newusuario != ""){
                            body = {
                                usuario : newusuario
                            }
                            estado = true;
                        }else{
                            var divAlerta = document.createElement('div');
                            divAlerta.setAttribute("class","alert alert-danger");
                            divAlerta.setAttribute("id","alerta11");
                            divAlerta.innerHTML = "La casilla de usuario esta vacio!";
                            document.getElementById('menAlerta11').appendChild(divAlerta);
                        }
                    }else{
                        if(b == true){
                            if(newcorreo != ""){
                                body = {
                                    correo : newcorreo
                                }
                                estado = true;
                            }else{
                                var divAlerta = document.createElement('div');
                                divAlerta.setAttribute("class","alert alert-danger");
                                divAlerta.setAttribute("id","alerta11");
                                divAlerta.innerHTML = "La casilla de correo esta vacio!";
                                document.getElementById('menAlerta11').appendChild(divAlerta);
                            }
                        }else{
                            if(c == true){
                                if(newpassword != ""){
                                    body = {
                                        password : newpassword
                                    }
                                    estado = true;
                                }else{
                                    var divAlerta = document.createElement('div');
                                    divAlerta.setAttribute("class","alert alert-danger");
                                    divAlerta.setAttribute("id","alerta11");
                                    divAlerta.innerHTML = "La casilla de contraseña esta vacio!";
                                    document.getElementById('menAlerta11').appendChild(divAlerta);
                                }
                            }else{
                                if(a == false && b == false && c == false){
                                    var divAlerta = document.createElement('div');
                                    divAlerta.setAttribute("class","alert alert-danger");
                                    divAlerta.setAttribute("id","alerta11");
                                    divAlerta.innerHTML = "Escoja las casillas que quiera modificar de la información del perfil!";
                                    document.getElementById('menAlerta11').appendChild(divAlerta);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(estado == false){
        console.log("Vacio")
    }else{
        fetch(URL_BASE+"/modicarConfirm",
            {
                method : 'POST',
                body : JSON.stringify(body),
                headers : {
                    "Content-type" : "application/json"
                }
            }).then((respConfim2) => {
                respConfim2.json().then((dataM) => {
                    const login2 = document.getElementById('login2').firstElementChild.innerHTML;
                    var bodyZ = {
                        usuario : login2
                    }
                    fetch(URL_BASE+"/perfilpartLider",
                        {
                            method : 'POST',
                            body : JSON.stringify(bodyZ),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        }).then((respLogin2) => {
                            respLogin2.json().then((dataL2) => {
                                if(dataM.msg != "Error"){
                                    a = 0, b = 0, c =0, d=0;
                                    for (let i = 0; i < dataM.length; i++){
                                        if (dataM[i].usuario == newusuario && dataM[i].correo == newcorreo)  {
                                            d = 3;
                                        }else{
                                            if(dataM[i].usuario == newusuario){
                                                a = 1;
                                            }else{
                                                if(dataM[i].correo == newcorreo){
                                                    b = 2;
                                                }
                                            }
                                        }
                                    }
                                    if(dataL2[0].password == newpassword){
                                        c = 4;
                                    }
                                    if(d || a+b+c == 7){
                                        var divAlerta = document.createElement('div');
                                        divAlerta.setAttribute("class","alert alert-danger");
                                        divAlerta.setAttribute("id","alerta11");
                                        divAlerta.innerHTML = "El usuario y el correo estan en uso, la contraseña es la misma, cambie por otra!";
                                        document.getElementById('menAlerta11').appendChild(divAlerta);
                                    }else{
                                        if(b+c == 6){
                                            var divAlerta = document.createElement('div');
                                            divAlerta.setAttribute("class","alert alert-danger");
                                            divAlerta.setAttribute("id","alerta11");
                                            divAlerta.innerHTML = "El correo esta en uso y la contraseña es la misma, cambie por otra!";
                                            document.getElementById('menAlerta11').appendChild(divAlerta);
                                        }else{
                                            if(a+c == 5){
                                                var divAlerta = document.createElement('div');
                                                divAlerta.setAttribute("class","alert alert-danger");
                                                divAlerta.setAttribute("id","alerta11");
                                                divAlerta.innerHTML = "El usuario esta en uso y la contraseña es la misma, cambie por otra!";
                                                document.getElementById('menAlerta11').appendChild(divAlerta);
                                            }else{
                                                if(c == 4){
                                                    var divAlerta = document.createElement('div');
                                                    divAlerta.setAttribute("class","alert alert-danger");
                                                    divAlerta.setAttribute("id","alerta11");
                                                    divAlerta.innerHTML = "La contraseña es la misma, cambie por otra!";
                                                    document.getElementById('menAlerta11').appendChild(divAlerta);
                                                }else{
                                                    if(a+b == 3){
                                                        var divAlerta = document.createElement('div');
                                                        divAlerta.setAttribute("class","alert alert-danger");
                                                        divAlerta.setAttribute("id","alerta11");
                                                        divAlerta.innerHTML = "El usuario y el correo estan en uso, cambie por otra!";
                                                        document.getElementById('menAlerta11').appendChild(divAlerta);
                                                    }else{
                                                        if(b == 2){
                                                            var divAlerta = document.createElement('div');
                                                            divAlerta.setAttribute("class","alert alert-danger");
                                                            divAlerta.setAttribute("id","alerta11");
                                                            divAlerta.innerHTML = "El correo esta en uso, cambie por otra!";
                                                            document.getElementById('menAlerta11').appendChild(divAlerta);
                                                        }else{
                                                            if(a == 1){
                                                                var divAlerta = document.createElement('div');
                                                                divAlerta.setAttribute("class","alert alert-danger");
                                                                divAlerta.setAttribute("id","alerta11");
                                                                divAlerta.innerHTML = "El usuario esta en uso, cambie por otra!";
                                                                document.getElementById('menAlerta11').appendChild(divAlerta);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    var bodyAr = {
                                        body, bodyZ
                                    };
                                    fetch(URL_BASE+"/modicarpartLider",
                                    {
                                        method : 'POST',
                                        body : JSON.stringify(bodyAr),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }).then((respUpdate) => {
                                        respUpdate.json().then((dataU) => {
                                            if(dataU.msg == "OK"){           
                                                var divAlerta = document.createElement('div');
                                                divAlerta.setAttribute("class","alert alert-success");
                                                divAlerta.setAttribute("id","alerta11");
                                                divAlerta.innerHTML = "Cambios realizado exitasamente!";
                                                document.getElementById('menAlerta11').appendChild(divAlerta);
                                            }
                                        })
                                    }).catch((error) => {
                                        console.error(error);
                                        console.log(error);
                                    });
                                    const checkUsuarioF = document.getElementById('checkUsuario');
                                    const checkCorreoF = document.getElementById('checkCorreo');
                                    const checkContraseñaF = document.getElementById('checkContraseña');
                                    const newusuarioF = document.getElementById('newusuario');
                                    const newcorreoF = document.getElementById('newcorreo');
                                    const newpasswordF = document.getElementById('newpassword');
                                    checkUsuarioF.checked = false;
                                    checkCorreoF.checked = false;
                                    checkContraseñaF.checked = false;
                                    newusuarioF.disabled = true;
                                    newusuarioF.value = "";
                                    newcorreoF.disabled = true;
                                    newcorreoF.value = "";
                                    newpasswordF.disabled = true;
                                    newpasswordF.value = "";
                                    const login5 = document.getElementById('login2');
                                    if(newusuario != ""){
                                        login5.firstElementChild.innerHTML = newusuario;
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
    }
}

const butRegresar1 = () => {
    document.getElementById('alerta11').remove();
    var divAlerta = document.createElement('div');
    divAlerta.setAttribute("id","alerta11");
    document.getElementById('menAlerta11').appendChild(divAlerta);
}

const butEquipo = () => {
    const nomEquipo = document.getElementById('nomEquipo');
    const login2 = document.getElementById('login2').firstElementChild.innerHTML;
    const body = {
        usuario : login2
    }
    fetch(URL_BASE+"/perfilpartLider",
    {
        method : 'POST',
        body : JSON.stringify(body),
        headers : {
            "Content-type" : "application/json"
        }
    }).then((respEquipo) => {
        respEquipo.json().then((data) => {
            nomEquipo.innerHTML = data[0].equipo;
            const bodyE = {
                equipo : data[0].equipo
            }
            fetch(URL_BASE+"/selectIntegrantes",
            {
                method : 'POST',
                body : JSON.stringify(bodyE),
                headers : {
                    "Content-type" : "application/json"
                }
            }).then((respEquipo1) => {
                respEquipo1.json().then((data1) => {
                    if(data.msg == "Error"){
                        console.log("No trae la lista de integrantes");
                    }else{
                        document.getElementById('tablebody').remove();
                        const tableC = document.getElementById('tableC');
                        const tbody = document.createElement('tbody')
                        tbody.setAttribute("id", "tablebody");
                        for(let i = 0; i < data1.length; i++){
                            const thId = document.createElement('th');
                            thId.setAttribute("scope", "row");
                            thId.innerHTML = i+1;
                            
                            const tdNombre = document.createElement('td');
                            tdNombre.innerHTML = data1[i].nombre;
                            
                            const tdApellido = document.createElement('td');
                            tdApellido.innerHTML = data1[i].apellido;
                            
                            const tdModificar = document.createElement('td');
                            const buttonModificar = document.createElement('button');
                            buttonModificar.setAttribute("id","butModiEqui"+(i+1));
                            buttonModificar.setAttribute("type","button");
                            buttonModificar.setAttribute("class","btn btn-success");
                            buttonModificar.innerHTML = "Modificar";
                            tdModificar.appendChild(buttonModificar);
                            
                            const tdEliminar = document.createElement('td');
                            const buttonEliminar = document.createElement('button');
                            buttonEliminar.setAttribute("id","butElimEqui"+(i+1));
                            buttonEliminar.setAttribute("type","button");
                            buttonEliminar.setAttribute("class","btn btn-danger");
                            buttonEliminar.innerHTML = "Eliminar";
                            tdEliminar.appendChild(buttonEliminar);
                            
                            const trFila = document.createElement('tr');
                            trFila.setAttribute("id","trId"+(i+1));
                            trFila.setAttribute("class", "letrablanca");
                            trFila.appendChild(thId);
                            trFila.appendChild(tdNombre);
                            trFila.appendChild(tdApellido);
                            trFila.appendChild(tdModificar);
                            trFila.appendChild(tdEliminar);
                            
                            tbody.appendChild(trFila);
                            tableC.appendChild(tbody);
                        }
                        for(let j = 1; j <= data1.length; j++){
                            document.querySelector("#butElimEqui"+j).addEventListener("click", (event) => {
                                const elimNombre = document.getElementById('trId'+j).firstElementChild.nextElementSibling.innerHTML;
                                const elimApellido = document.getElementById('trId'+j).firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
                                const elimEquipo = data[0].equipo
                                const bodyElim = {
                                    equipo : elimEquipo,
                                    nombre : elimNombre,
                                    apellido : elimApellido
                                }
                                fetch(URL_BASE+"/deleteIntegrantes",
                                {
                                    method : 'POST',
                                    body : JSON.stringify(bodyElim),
                                    headers : {
                                        "Content-type" : "application/json"
                                    }
                                })
                                document.getElementById('trId'+j).remove();
                            })
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
}

const butAgreEI = () => {
    
    const idnombre = document.getElementById('idnombre').value;
    const idapellido = document.getElementById('idapellido').value;
    if(idnombre == "" || idapellido == ""){
        console.log("Complete todas las casillas");
    }else{
        console.log("Esta completo");
        const nomEquipo = document.getElementById('nomEquipo').innerHTML;
        const body = {
            equipo : nomEquipo
        };
        const bodyZ = {
            nombre : idnombre,
            apellido : idapellido
        };
        var bodyAr = {
            body, bodyZ
        };
        
        fetch(URL_BASE+"/insertIntegrantes",
        {
            method : 'POST',
            body : JSON.stringify(bodyAr),
            headers : {
                "Content-type" : "application/json"
            }
        }).then((respInt) => {
            respInt.json().then((dataI) => {
                console.log(dataI);
                if(dataI.msg == "OK"){
                    console.log("Se agrego a "+idnombre+" "+idapellido);
                    const idnombre1 = document.getElementById('idnombre');
                    const idapellido1 = document.getElementById('idapellido');
                    idnombre1.value = "";
                    idapellido1.value = "";
                }
            })
        }).catch((error) => {
            console.error(error);
            console.log(error);
        });
    }
}

const butRegresar2 = () => {
    butEquipo();
}

const butTorneo = () => {
    window.location.href = "./torneoPartLider.html";
}

//El main
var main = () => {
    document.querySelector("#butRegistrar").addEventListener("click", butRegistrar);
    document.querySelector("#butAcceder").addEventListener("click", butAcceder);
    document.querySelector("#butRegistrate").addEventListener("click", butRegis);
    document.querySelector("#butRegresar").addEventListener("click", butRegregar);
    document.querySelector("#cerrarSec").addEventListener("click", cerrarSec);
    document.querySelector("#butPerfil").addEventListener("click", butPerfil);
    document.querySelector("#butRealizar").addEventListener("click", butRealizar);
    document.querySelector("#butRegresar1").addEventListener("click", butPerfil);
    document.querySelector("#butRegresar1").addEventListener("click", butRegresar1);
    document.querySelector("#butEquipo").addEventListener("click", butEquipo);
    document.querySelector("#butAgreEI").addEventListener("click", butAgreEI);
    document.querySelector("#butRegresar2").addEventListener("click", butRegresar2);
    document.querySelector("#butTorneo").addEventListener("click", butTorneo);
}
window.addEventListener("load", main);

function load(){
    if(sessionStorage.loginPart != undefined){
        const login1 = document.getElementById('login1');   
        const login2 = document.getElementById('login2');
        login1.setAttribute("style","visibility:hidden;");
        login2.removeAttribute("style","visibility:hidden;");
        login2.firstElementChild.innerHTML = sessionStorage.loginPart;
    }else{
        console.log("Esta vacio")
    }
    
}
window.onload = load;