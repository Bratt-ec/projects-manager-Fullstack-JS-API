const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require("../controllers/tareaController");

// Crear tareas api/tareas
router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(), 
        check('proyecto','El proyecto es obligatorio').not().isEmpty(), 
    ],
    crearTarea
);

// Obtener tareas por proyecto
router.get('/',
    auth,
    obtenerTareas
);

// Actualizar tareas
router.put('/:id',
    auth,
    actualizarTarea
);

// Elimina una tarea por su ID
router.delete('/:id',
    auth,
    eliminarTarea
)


// Exportamos el archivo
module.exports = router;