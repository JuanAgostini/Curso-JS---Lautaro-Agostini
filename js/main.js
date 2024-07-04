const saludarUsuario = () => {
    let nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");
    console.log("Bienvenido/a,"+ nombreUsuario );
};

const verTareas = (tareas) => {
    if (tareas.length === 0) {
        return "No hay tareas en la lista.";
    }
    for (let i = 0; i < tareas.length; i++) {
        console.log(i + ": " + tareas[i]);

    }
    return "Esta es tu lista de tareas.";
};

const crearTarea = (tareas, tarea) => {
    tareas.push(tarea);
    return "La tarea ha sido agregada exitosamente!";
}

const eliminarUltimaTarea = (tareas) => {
    tareas.pop();
    return "La tarea ha sido eliminada satisfactoriamente!";
}

const actualizarTarea = (tareas, indice, nuevaTarea) => {
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice] = nuevaTarea;
        return "¡La tarea ha sido actualizada exitosamente!";
    }
    return "Índice no válido.";
};

saludarUsuario();

let listaDeTareas = [];
let resultado = "";
let asignarTarea = true;

while (asignarTarea){
    const opciones = parseInt(prompt(
      "Asigne que operación desea realizar \n " +
      "1 - Para añadir una nueva tarea. \n " +
      "2 - Para quitar la ultima tarea agregada. \n " +
      "3 - Ver la lista de tareas. \n " +
      "4 - Actualizar una tarea."
    ));

    switch (opciones) {
        case 1:
            let tarea = prompt("Ingrese su tarea pendiente");
            resultado = crearTarea(listaDeTareas, tarea);
            break;
        case 2:
            resultado = eliminarUltimaTarea(listaDeTareas);
            break;
        case 3:
            resultado = verTareas(listaDeTareas);
            break;
        case 4:
            verTareas(listaDeTareas);
            let indice = parseInt(prompt("Ingrese el numero de la tarea que desea actualizar:"));
            let nuevaTarea = prompt("Ingrese la nueva descripción de la tarea");
            resultado = actualizarTarea(listaDeTareas, indice, nuevaTarea);
            break;
        default:
            resultado = "Opción inválida, por favor vuelva a seleccionar una opción";
            break;
    }
    alert(resultado);

    let confirmacion = prompt("Desea continuar navegando en la lista de tareas? (si/no)".toLowerCase());

    while(confirmacion != "si" && confirmacion != "no"){
        alert("opción incorrecta. Vuelva a ingresar nuevamente");
        confirmacion = prompt("Desea continuar navegando en la lista de tareas? (si/no)".toLowerCase());
    }

    if(confirmacion=="no") {
        asignarTarea=false
        console.log("Gracias por utilizar nuestra agenda");
    }
}

