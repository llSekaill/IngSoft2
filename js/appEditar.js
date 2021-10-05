const modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'));
btnCrear.addEventListener("click",()=>{
    modalUsuario.show() 
} )

var Fila = null
btnGuardar.addEventListener("click",()=>{
    let DataForm = Leer()
    if (Fila == null){
        InsertarDatos(DataForm)
    } else{
        Actualizar(DataForm)
        Vaciar()
    }
})

function Leer() {
    let DataForm = {}
    DataForm["id"] = "-"
    DataForm["nombre"] = document.getElementById("nombre").value
    DataForm["correo"] = document.getElementById("correo").value
    //DataForm["contraseña"] = document.getElementById("contraseña").value
    DataForm["rol"] = document.getElementById("rol").value
    return DataForm
}
function InsertarDatos(data) {
    let table = document.getElementById("table_id").getElementsByTagName('tbody')[0]
    let Fila = table.insertRow(table.length)
    columna1 = Fila.insertCell(0).innerHTML = data.id
    columna2 = Fila.insertCell(1).innerHTML = data.nombre
    columna3 = Fila.insertCell(2).innerHTML = data.correo
    columna4 = Fila.insertCell(3).innerHTML = data.rol
    columna5 = Fila.insertCell(4).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`
    document.getElementById("nombre").focus()
    Vaciar()
}
function Vaciar() {
    document.getElementById("nombre").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("rol").value = ""
    Fila = null
}
function Editarr(td) {
    modalUsuario.show() 
    Fila = td.parentElement.parentElement
    document.getElementById("nombre").value = Fila.cells[1].innerHTML
    document.getElementById("correo").value = Fila.cells[2].innerHTML
    document.getElementById("rol").value = Fila.cells[3].innerHTML

    
}
function Actualizar(DataForm) {
    Fila.cells[1].innerHTML = DataForm.nombre
    Fila.cells[2].innerHTML = DataForm.correo
    Fila.cells[3].innerHTML = DataForm.rol

    document.getElementById("nombre").focus()
}
function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement
        document.getElementById("table_id").deleteRow(row.rowIndex)
        Vaciar()
    }
}