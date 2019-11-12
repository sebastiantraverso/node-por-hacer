const fs = require('fs');

let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Nos se pudo grabar', err);
    });
}


const cargardDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => {

    cargardDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}


const getListado = () => {
    cargardDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargardDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    cargardDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);


    if (index > -1) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

    // // SEGUNDA FORMA DE RESOLVERLO
    // let nuevoListado = listadoPorHacer.filter(tarea => {
    //     return tarea.descripcion !== descripcion;
    // });

    // if (listadoPorHacer.length === nuevoListado.length) {
    //     return false
    // } else {
    //     listadoPorHacer = nuevoListado;
    //     guardarDB();
    // }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}