const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { Errores } = require("../middleware/errores");

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  // Verificamos si hay errores
  Errores(req, res);

  try {
    // Comprobamos si existe el proyecto
    const { proyecto } = req.body;
    const proyectoExiste = await Proyecto.findById(proyecto);
    if (!proyectoExiste) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Creamos la tarea = newTar
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    // extraemos el proyecto
    // Comprobamos si existe el proyecto
    const { proyecto } = req.query;
    const proyectoExiste = await Proyecto.findById(proyecto);
    if (!proyectoExiste) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    // Obtenemos las tareas por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualiza una tarea por su ID
exports.actualizarTarea = async (req, res) => {
  try {
    // Comprobamos si existe el proyecto
    const { proyecto, nombre, estado } = req.body;

    // Revisamos si la tarea existe
    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }
    // Extraemos el proyecto actual
    const proyectoExiste = await Proyecto.findById(proyecto);
    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Creamos un objeto con la nueva info
    const nuevTarea = {};

    // Asignamos los valores al obj vacio
    if (nombre) nuevTarea.nombre = nombre;
    if (estado) nuevTarea.estado = estado;

    // Guardar tarea
    tareaExiste = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      nuevTarea,
      { new: true }
    );
    res.json({ tareaExiste });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Eliminar una tarea por su ID
exports.eliminarTarea = async (req, res) => {
  try {
    // Comprobamos si existe el proyecto
    const { proyecto } = req.query;

    // Revisamos si la tarea existe
    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }
    // Extraemos el proyecto actual
    const proyectoExiste = await Proyecto.findById(proyecto);
    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //   Eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
