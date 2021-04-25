const express = require("express");
const {
  crearProyecto,
  obtenerProyectos,
  actulizarProyecto,
  eliminarProyecto,
} = require("../controllers/proyectoController");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// Crea proyectos api/proyectos
router.post("/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  crearProyecto
);
// Obtiene los proyectos
router.get("/", auth, obtenerProyectos);

// Actualizar proyecto
router.put('/:id', 
    auth,
    [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
    actulizarProyecto
);

// Eliminar un proyecto
router.delete('/:id',
    auth,
    eliminarProyecto
)

// Exportamos el archivo
module.exports = router;
