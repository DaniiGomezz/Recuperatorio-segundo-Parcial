const formCrearReserva = document.querySelector("#formNuevaReserva")

formCrearReserva.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const dni = document.querySelector('#dni').value;
    const  fecha_de_la_reserva = document.querySelector('#fechaReserva').value;
    const fecha_ida = document.querySelector('#fecha_ida').value;
    const fecha_vuelta = document.querySelector('#fecha_vuelta').value;
    const destino = document.querySelector('#destino').value;
    const telefono = document.querySelector('#telefono').value;
 

    const reserva = {
         
        nombre,
        apellido,
        dni,
        fecha_de_la_reserva,
        fecha_ida,
        fecha_vuelta,
        destino, 
        telefono
    }

    const response = await fetch('http://localhost:4000/api', {
        method: 'POST',
        body: JSON.stringify(reserva),
        headers: {
            'Content-Type': 'application/json' // Cuando se envían datos JSON al servidor
        }
    })
    
    const data = await response.json();

    alert(data.message)
    window.location.href = "/"


});
