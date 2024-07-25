// CursoJS Coderhouse - comision 62015 - Alumno Juan Lautaro Agostini

// Mi idea era hacer una to do list pero me gusto mas la idea de hacer algo financiero para asi poder utilizar personalmente. 
// Falta mucho por editar y funcionalidades por agregar pero la idea general es que pueda guardar todos los ingresos y egresos de dinero asi como guardar futuros gastos y editarlos
// Me esta costando bastante el hecho de como utilizar la logica por eso lo hice tan simple pero cumple con las consignas asignadas para esta pre entrega, espero poder mejorarlo.

document.addEventListener('DOMContentLoaded', () => {
    const TIPO_GANANCIA = 'ganancia';
    const TIPO_DEUDA = 'deuda';

    class Registro {
        constructor(descripcion, monto, tipo) {
            this.descripcion = descripcion;
            this.monto = monto;
            this.tipo = tipo;
        }
    }

    const form = document.getElementById('registroForm');
    const gananciaLista = document.getElementById('gananciaLista');
    const deudaLista = document.getElementById('deudaLista');
    const totalMonto = document.getElementById('totalMonto');
    const buscarInput = document.getElementById('buscar');
    const error = document.getElementById('error');

    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    let total = parseFloat(totalMonto.textContent.replace('$', ''));

    const mostrarError = (mensaje) => {
        error.textContent = mensaje;
        error.style.display = 'block';
        setTimeout(() => {
            error.style.display = 'none';
        }, 3000); 
    };

    const ocultarError = () => {
        error.style.display = 'none';
    };

    const renderHistorial = () => {
        gananciaLista.innerHTML = '';
        deudaLista.innerHTML = '';
        registros.forEach((registro, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', registro.tipo === TIPO_GANANCIA ? 'list-group-item-success' : 'list-group-item-danger');
            li.innerHTML = `${registro.descripcion} - $${registro.monto.toFixed(2)} 
                            <i class="fas fa-trash iconos" onclick="eliminarRegistro(${index})"></i>`;
            if (registro.tipo === TIPO_GANANCIA) {
                gananciaLista.appendChild(li);
            } else {
                deudaLista.appendChild(li);
            }
        });
    };

    const actualizarTotal = () => {
        total = registros.reduce((sum, registro) => {
            return registro.tipo === TIPO_GANANCIA ? sum + registro.monto : sum - registro.monto;
        }, 0);
        totalMonto.textContent = `$${total.toFixed(2)}`;
    };

    const eliminarRegistro = (index) => {
        const registro = registros[index];
        const posibleTotal = registro.tipo === TIPO_GANANCIA ? total - registro.monto : total;

        if (registro.tipo === TIPO_GANANCIA && posibleTotal < 0) {
            mostrarError('No se puede eliminar esta ganancia por que resultará en un total negativo.');
            return;
        }

        ocultarError();
        registros.splice(index, 1);
        localStorage.setItem('registros', JSON.stringify(registros));
        renderHistorial();
        actualizarTotal();
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const descripcion = document.getElementById('descripcion').value;
        const monto = parseFloat(document.getElementById('monto').value);
        const tipo = document.getElementById('tipo').value;

        if (tipo === TIPO_DEUDA && monto > total) {
            mostrarError('El monto de la deuda no puede ser mayor que el total.');
            return;
        }

        ocultarError();

        const registro = new Registro(descripcion, monto, tipo);
        registros.push(registro);
        localStorage.setItem('registros', JSON.stringify(registros));

        renderHistorial();
        actualizarTotal();

        form.reset();
    });

    buscarInput.addEventListener('input', () => {
        const filtro = buscarInput.value.toLowerCase();
        gananciaLista.innerHTML = '';
        deudaLista.innerHTML = '';
        registros
            .filter(registro => registro.descripcion.toLowerCase().includes(filtro))
            .forEach((registro, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', registro.tipo === TIPO_GANANCIA ? 'list-group-item-success' : 'list-group-item-danger');
                li.innerHTML = `${registro.descripcion} - $${registro.monto.toFixed(2)} 
                                <i class="fas fa-trash iconos" onclick="eliminarRegistro(${index})"></i>`;
                if (registro.tipo === TIPO_GANANCIA) {
                    gananciaLista.appendChild(li);
                } else {
                    deudaLista.appendChild(li);
                }
            });
    });

    renderHistorial();
    actualizarTotal();

    window.eliminarRegistro = eliminarRegistro;
});
