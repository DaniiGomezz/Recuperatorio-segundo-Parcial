const Reserva = require('../models/Reserva');
const ctrl = {};

ctrl.renderListaReservas = (req, res) => {
    res.render('listado-reservas')
}

ctrl.renderFormNuevaReserva = (req, res) => {
    res.render('nueva-reserva');
}

ctrl.renderFormEditarReserva = (req, res) => {
    const { id } = req.params;
    res.render('editar-reserva', { id })
}


// ==========================================
//         Rutas para CRUD de reservasx
// ==========================================

// Obtener todas las reservas de la tabla reservas
// SELECT * FROM reservas WHERE estado=true
ctrl.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true
            }
        });

        return res.json(reservas);
        } catch (error) {
            console.log('Error al obtener las reservas', error);
            return res.status(500).json({
                message: 'Error al obtener las reservas'
            })
        }
}

// Obtener los datos de una reserva a través de la Primary Key (Pk)
ctrl.obtenerReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id);
        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener la reserva'
        })
    }
}


// Crear una reserva
ctrl.crearReserva = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        fecha_de_la_reserva,
        fecha_ida,
        fecha_vuelta,
        destino, 
        telefono
        
    } = req.body; // JSON.stringify(reserva);

    try {
        // Se crea una nueva instancia de reserva
        const nuevaReserva = new Reserva ({
        nombre,
        codigo: new Date().getTime(),
        apellido,
        dni,
        fecha_de_la_reserva,
        fecha_ida,
        fecha_vuelta,
        destino, 
        telefono
        });

        // Se guarda en la BD
        await nuevaReserva.save();

        return res.status(201).json({ message: 'Reserva creada con éxito' })
    } catch (error) {
        console.log('Error al crear la reserva', error);
        return res.status(500).json({ message: 'Error al crear la reserva' })
    }
}

// Actualizar una reserva
ctrl.actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        
        const reserva = await Reserva.findByPk(id);
        
        await reserva.update(req.body)
        
        return res.status(201).json({ message: 'Reserva actualizada con éxito' })


    } catch (error) {
        console.log('Error al actualizar la reserva', error);
        return res.status(500).json({
            message: 'Error al actualizar la reserva'
        })
    }
}



// Eliminar una reserva de forma lógica
ctrl.eliminarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reservaEliminada = await Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la reserva'
            })
        }

         return res.json({
         message: 'Reserva eliminada correctamente',
         reservaEliminada
     });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor')
    }
}

module.exports = ctrl;