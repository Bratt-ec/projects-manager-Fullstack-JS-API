const Proyecto = require("../models/Proyecto");
const { Errores } = require("../middleware/errores");

exports.crearProyecto = async (req, res) => {
  // Revisamos si hay errores
  Errores(req, res);

  try {
    // Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);
    // Add el creador del proyecto
    proyecto.creador = req.usuario.id;
    // Guardamos el proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

// Actualiza un proyecto
exports.actulizarProyecto = async (req, res) => {
  // Revisamos si hay errores
  Errores(req, res);

  // Extraer la info del Proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    // Revisamos el ID req.params.id
    let proyecto = await Proyecto.findById(req.params.id);

    // Revisamos si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificamos el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    // Actualizamos el proyecto
    proyecto = await Proyecto.findOneAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// Elimina un proyecto por su ID
exports.eliminarProyecto = async (req, res) => {
  try {
    // Revisamos el ID req.params.id
    let proyecto = await Proyecto.findById(req.params.id);

    // Revisamos si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificamos el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //  Eliminar el proyecto
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
