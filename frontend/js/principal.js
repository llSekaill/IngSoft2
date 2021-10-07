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
            correo : regusuario,
            password : regpassword,
            equipo : regequipo
        }
        
        fetch(`${URL_BASE}/insertpartLider`,
        {
            method : 'POST',
            body : JSON.stringify(body),
            headers : {
                "Content-type" : "application/json"
            }
        }).then((respRegistrar) => {
            console.log(respRegistrar.statusText);
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
                    },
                }).then((respLogin) => {
                    respLogin.json().then((data) => {
                        if(data.msg != "Error"){
                            const login1 = document.getElementById('login1');   
                            const login2 = document.getElementById('login2');
                            const butcerrar = document.getElementById('butX');
                            login1.setAttribute("style","visibility:hidden;");
                            login2.removeAttribute("style","visibility:hidden;");
                            login2.firstElementChild.innerHTML = data.usuario;
                            
                            /*const lilogin1 = document.createElement('li');
                            const lilogin2 = document.createElement('li');
                            const lilogin3 = document.createElement('li');
                            const lilogin4 = document.createElement('li');
                            const lilogin5 = document.createElement('li');
                            const a1 = document.createElement('a');
                            const a2 = document.createElement('a');
                            const a3 = document.createElement('a');
                            const hr = document.createElement('hr');
                            const a4 = document.createElement('a');
                            a1.setAttribute("class","dropdown-item link");
                            a2.setAttribute("href","perfil.html");
                            a2.setAttribute("class","dropdown-item link");
                            a3.setAttribute("class","dropdown-item link");
                            hr.setAttribute("class","dropdown-divider");
                            a4.setAttribute("id","cerrarSec");
                            a4.setAttribute("class","dropdown-item link active");
                            a1.innerHTML = "Torneo";
                            a2.innerHTML = "Mi Perfil";
                            a3.innerHTML = "Mi Equipo";
                            a4.innerHTML = "Cerrar Sesión";
                            lilogin1.appendChild(a1);
                            lilogin2.appendChild(a2);
                            lilogin3.appendChild(a3);
                            lilogin4.appendChild(hr);
                            lilogin5.appendChild(a4);
                            document.getElementById('ullogin').appendChild(lilogin1);
                            document.getElementById('ullogin').appendChild(lilogin2);
                            document.getElementById('ullogin').appendChild(lilogin3);
                            document.getElementById('ullogin').appendChild(lilogin4);
                            document.getElementById('ullogin').appendChild(lilogin5);
                            */
                            var divAlerta = document.createElement('div');
                            divAlerta.setAttribute("id","alerta2");
                            document.getElementById('mensAlerta2').appendChild(divAlerta);
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
                                },
                            }).then((respLoginA) => {
                                respLoginA.json().then((dataA) => {
                                    console.log(dataA);
                                    if(dataA.msg != "Error"){
                                        /*const login1 = document.getElementById('login1');   
                                        const login2 = document.getElementById('login2');
                                        const butcerrar = document.getElementById('butX');
                                        login1.setAttribute("style","visibility:hidden;");
                                        login2.removeAttribute("style","visibility:hidden;");
                                        login2.firstElementChild.innerHTML = dataA.adminname;*/
                                        window.location.href = "./InicioAdmin.html";
                                        var divAlerta = document.createElement('div');
                                        divAlerta.setAttribute("id","alerta2");
                                        document.getElementById('mensAlerta2').appendChild(divAlerta);
                                        butcerrar.click();
                                        console.log(document.getElementById('alerta2'));
                                    }else{
                                        console.log("Datos no registrado");
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
        }
    }
}


var butRegis = (event) => {
    document.getElementById('alerta1').remove()
    var div = document.createElement('div');
    div.setAttribute("id","alerta1");
    document.getElementById('menAlerta1').appendChild(div);
    document.getElementById('logusuario').value = "";
    document.getElementById('logpassword').value = "";
}

var butRegregar = (event) => {
    document.getElementById('alerta2').remove()
    var div = document.createElement('div');
    div.setAttribute("id","alerta2");
    document.getElementById('mensAlerta2').appendChild(div);
}

const cerrarSec = (event) => {
    console.log("Funciona cerrar seccion");
    const login1 = document.getElementById('login1');   
    const login2 = document.getElementById('login2');
    login2.setAttribute("style","visibility:hidden;");
    login1.removeAttribute("style","visibility:hidden;");
}
var main = () => {
    document.querySelector("#butRegistrar").addEventListener("click", butRegistrar);
    document.querySelector("#butAcceder").addEventListener("click", butAcceder);
    document.querySelector("#butRegistrate").addEventListener("click", butRegis);
    document.querySelector("#butRegresar").addEventListener("click", butRegregar);
    document.querySelector("#cerrarSec").addEventListener("click", cerrarSec);
}
window.addEventListener("load", main);