const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'jean',
    database: 'postgres',
    port:'5432'
})

const selectpartLider = async (req, res) => {
    const response = await pool.query('select * from partlider');
    res.status(200).json(response.rows);
}

const perfilpartLider = async (req, res) => {
    const {usuario} = req.body;
    const response = await pool.query('select * from partlider where usuario = $1',[usuario]);
    res.status(200).json(response.rows);
}

const selectConfirm = async (req, res) => {
    const {correo, equipo} = req.body;
    const response = await pool.query('select * from partlider where correo = $1 or equipo = $2',[correo, equipo]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows);
    }
}

const modicarConfirm = async (req, res) => {
    const {usuario, correo, password} = req.body;
    const response = await pool.query('select * from partlider where usuario = $1 or correo = $2 or password = $3',[usuario, correo, password]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows);
    }
}

const modicarpartLider = async (req, res) => {
    const {usuario, correo, password} = req.body.body;
    const usu = req.body.bodyZ.usuario;
    console.log(req.body);
    var response;
    if(usuario != undefined && correo != undefined && password != undefined){
        response = await pool.query('update partlider set usuario = $1, correo = $2, password = $3 where usuario = $4',[usuario,correo,password,usu]);
    }else{
        if(usuario != undefined && correo != undefined && password == undefined){
            response = await pool.query('update partlider set usuario = $1, correo = $2 where usuario = $3',[usuario,correo,usu]);
        }else{
            if(usuario != undefined && correo == undefined && password != undefined){
                response = await pool.query('update partlider set usuario = $1, password = $2 where usuario = $3',[usuario,password,usu]);
            }else{
                if(usuario == undefined && correo != undefined && password != undefined){
                    response = await pool.query('update partlider set correo = $1, password = $2 where usuario = $3',[correo,password,usu]);
                }else{
                    if(usuario != undefined && correo == undefined && password == undefined){
                        response = await pool.query('update partlider set usuario = $1 where usuario = $2',[usuario,usu]);
                    }else{
                        if(usuario == undefined && correo != undefined && password == undefined){
                            response = await pool.query('update partlider set correo = $1 where usuario = $2',[correo,usu]);
                        }else{
                            if(usuario == undefined && correo == undefined && password != undefined){
                                response = await pool.query('update partlider set password = $1 where usuario = $2',[password,usu]);
                            }
                        }
                    }
                }
            }
        }
    }
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json({msg : "OK"});
    }
}

/*
const getUserData = async (req, res) => {
    const id = req.params.id;
    const responde = await pool.query('select * from users where id = $1',[id]);
    res.status(200).json(responde.rows);
}*/

const selectIntegrantes = async (req, res) =>{
    const {equipo} = req.body;
    const response = await pool.query('select * from integrantes where equipo = $1',[equipo]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows);
    }
}

const insertIntegrantes = async (req, res) => {
    const equipo = req.body.body.equipo;
    const {nombre, apellido} = req.body.bodyZ;
    const response = await pool.query('insert into integrantes (equipo, nombre, apellido) values ($1, $2, $3)', [equipo, nombre, apellido]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json({msg : "OK"});
    }
}

const deleteIntegrantes = async (req, res) => {
    const {equipo, nombre, apellido} = req.body;
    const response = await pool.query('delete from integrantes where equipo = $1 and nombre = $2 and apellido = $3', [equipo, nombre, apellido]);
    console.log(response);
}

const insertpartLider = async (req, res) => {
    const {usuario,correo,password,equipo} = req.body;
    const response = await pool.query('insert into partlider (usuario, correo, password, equipo) values ($1, $2, $3, $4)', [usuario, correo, password, equipo]);
    res.status(200).json(response.rows);
}

const loginpartLider = async (req, res) => {
    const {usuario, password} = req.body;
    const response = await pool.query('select * from partlider where usuario = $1 and password = $2',[usuario, password]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows[0]);
    }

}

const loginAdmin = async (req, res) => {
    const {adminname, adminpass} = req.body;
    const response = await pool.query('select * from admin where adminname = $1 and adminpass = $2',[adminname,adminpass])
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows[0]);
    }
}

const loginOrg = async (req, res) => {
    const {orgname, orgpass} = req.body;
    const response = await pool.query('select * from organizador where orgname = $1 and orgpass = $2',[orgname,orgpass])
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows[0]);
    }
}

/*
const updateUsers = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const {users} = req.body;
    const response = await pool.query('update users set users = $1 where id = $2',[users, id]);
    console.log(response);
    res.json('Usuario actualizado');
}*/
/*
const deleteUsers = async (req, res) => {
    const id = req.params.id;
    const responde = await pool.query('delete from users where id = $1', [id]);
    console.log(responde);
    res.json(`Useario ${id} fue eliminado`);
}*/

const getTorneo = async (req, res) => {
    const response = await pool.query('SELECT * FROM dbtorneo');
    var fi;
    var ff;
    var nt;
    var estado;
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    var responseA;
    for(let i=0; i<response.rowCount; i++){
        fi = response.rows[i].fechainicio;
        ff = response.rows[i].fechafin;
        nt = response.rows[i].nombretorneo;
        if(utc < fi){
            estado = "ACTIVO";
            responseA = await pool.query('update dbtorneo set estado = $1 where nombretorneo = $2',[estado, nt]);  
        }else{
            if(utc <= ff){
                estado = "EN CURSO";
                responseA = await pool.query('update dbtorneo set estado = $1 where nombretorneo = $2',[estado, nt]);
            }else{
                estado = "FINALIZADO";
                responseA = await pool.query('update dbtorneo set estado = $1 where nombretorneo = $2',[estado, nt]);
            }
        }
    }
    const responseNew = await pool.query('SELECT * FROM dbtorneo');
    res.status(200).json(responseNew.rows);
}
const createTorneo = async (req, res) => {
    console.log(req.body)
    const estado = "ACTIVO";
    const {nombretorneo, descripcion, fechainicio, fechafin, numparticipantes, numequipo, numpartidas, puntganada, puntempate, puntperdida } = req.body;
    const response = await pool.query('insert into dbtorneo (nombretorneo,descripcion,fechainicio,fechafin,numparticipantes,numequipo,numpartidas,puntganada,puntempate,puntperdida,estado) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[nombretorneo,descripcion,fechainicio,fechafin,numparticipantes,numequipo,numpartidas,puntganada,puntempate,puntperdida,estado]);
    console.log(response);
    res.status(200).json(response.rows);

}

const searchtorneo = async (req, res) => {
    const {nombretorneo} = req.body;
    const response = await pool.query('select * from dbtorneo where nombretorneo = $1',[nombretorneo]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rows);
    }
}

const buscarTorneoEquipo = async (req, res) => {
    const {nomequipo} = req.body;
    const response = await pool.query('select * from torneoequipo where nomequipo = $1',[nomequipo]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "No esta inscrito"});
    }else{
        res.status(200).json(response.rows);
    }
}

const limiteTorneoEquipo = async (req, res) => {
    const {nomtorneo} = req.body;
    const response = await pool.query('select * from torneoequipo where nomtorneo = $1',[nomtorneo]);
    const responseA = await pool.query('select * from dbtorneo where nombretorneo = $1',[nomtorneo]);
    if(response.rowCount == 0){
        res.status(200).json({actualIns : response.rowCount,});
    }else{
        res.status(200).json({
            actualIns : response.rowCount,
            limiteEqu : responseA.rows[0].numequipo,
            limiteInt : responseA.rows[0].numparticipantes
        });
    }
}

const limiteIntegrante = async (req, res) => {
    const {equipo} = req.body;
    const response = await pool.query('select * from integrantes where equipo = $1',[equipo]);
    if(response.rowCount == 0){
        res.status(200).json({msg : "Error"});
    }else{
        res.status(200).json(response.rowCount);
    }
}


const insertTorneoEquipo = async (req, res) => {
    const {nomtorneo, nomequipo} = req.body;
    const response = await pool.query('insert into torneoequipo (nomtorneo, nomequipo) values ($1, $2)',[nomtorneo, nomequipo]);
    res.status(200).json(response.rows);
}

module.exports = {
    selectpartLider, insertpartLider, loginpartLider, loginAdmin, loginOrg, selectConfirm, perfilpartLider,
    modicarConfirm, modicarpartLider, selectIntegrantes, insertIntegrantes, deleteIntegrantes, getTorneo,
    createTorneo, searchtorneo, buscarTorneoEquipo, limiteTorneoEquipo,limiteIntegrante, insertTorneoEquipo
    //getUserData,
    //deleteUsers,
    //updateUsers
}
