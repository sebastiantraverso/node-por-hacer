const color = require('colors');

const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');



let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('============  Por Hacer  ==============='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('========================================'.green);
        }
        console.log(listado);
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);

        if (actualizado) {
            console.log('Se actualizo');
        } else {
            console.log('NO se actualizo');
        }
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);

        if (borrado) {
            console.log('Se borro');
        } else {
            console.log('NO se borro');
        }
        break;

    default:
        console.log('Comando no es reconocido');
}