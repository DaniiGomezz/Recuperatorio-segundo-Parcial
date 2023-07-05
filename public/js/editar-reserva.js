const formReserva = document.querySelector('#formNuevaReserva');
const reservaId = formReserva.dataset.id;
// Aleternativa utilizando la captura del pathname
// const reservaId = window.location.pathname.split('/').pop();

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');
const  fecha_de_la_reserva = document.querySelector('#fechaReserva');
const fecha_ida = document.querySelector('#fecha_ida');
const fecha_vuelta = document.querySelector('#fecha_vuelta');
const destino = document.querySelector('#destino');
const telefono = document.querySelector('#telefono');


document.addEventListener('DOMContentLoaded', async () => {
    // Traemos la reserva que se va a editar
    const response = await fetch(`/api/${reservaId}`);
    const data = await response.json();

    // Mostrar en el formulario los datos de la reserva que se quiere actualizar
    nombre.value = data.nombre;
    apellido.value = data.apellido;
    dni.value = data.dni;
    fecha_de_la_reserva.value = data.fecha_de_la_reserva;
    fecha_ida.value = data.fecha_ida;
    fecha_vuelta.value = data.fecha_vuelta;
    destino.value = data.destino;
    telefono.value = data.telefono;
    
});


formReserva.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    reservaActualizada = {
        nombre: nombre.value,
        apellido: apellido.value,
        fecha_ida: fecha_ida.value,
        fecha_vuelta: fecha_vuelta.value,
        pasajeros: pasajeros.value,
        telefono: telefono.value,
        email: email.value,
    }


    // Se envían los nuevos datos al servidor express
    const response = await fetch(`/api/'${reservaId}`, {
        method: 'PUT',
        body: JSON.stringify(reservaActualizada),
        headers: {
            'Content-Type':'application/json'
        }
    })

        const data = await response.json();

        alert(data.message);

        // Redireccionar al usuario
        window.location.href = "/"

        const respToJson = await response.json();

        if (response.status !== 200) {
            return Swal.fire({
                title: 'Error',
                text: respToJson.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    
    
        // Mostrar mensajes al usuario
        Swal.fire({
            title: 'Reserva actualizada',
            text: respToJson.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    
        
    
        setTimeout(() => {
            // Redireccionar al usuario
            window.location.href = "/"
        }, 2000);
    
    
    
    
    })


