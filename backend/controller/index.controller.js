const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'jean',
    database: 'postgres',
    port:'5432'
})

var logUsu;

const selectpartLider = async (req, res) => {
    const response = await pool.query('select * from partlider');
    res.status(200).json(response.rows);
}
/*
const getUserData = async (req, res) => {
    const id = req.params.id;
    const responde = await pool.query('select * from users where id = $1',[id]);
    res.status(200).json(responde.rows);
}*/

const insertpartLider = async (req, res) => {
    const {usuario,correo,password,equipo} = req.body;
    const response = await pool.query('insert into partlider (usuario, correo, password, equipo) values ($1, $2, $3, $4)', [usuario, correo, password, equipo]);
    res.status(200).json(response.rows);
}

const loginpartLider = async (req, res) => {
    const {usuario, password} = req.body;
    const response = await pool.query('select * from partlider where usuario = $1 and password = $2',[usuario, password]);
    if(response.rowCount == 0){
        console.log("Datos mal ingresado");
        res.status(200).json({msg : "Error"});
    }else{
        logUsu = response.rows[0].usuario;
        console.log("Funciono",logUsu);
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

module.exports = {
    selectpartLider,
    insertpartLider,
    loginpartLider
    //getUserData,
    //deleteUsers,
    //updateUsers
}