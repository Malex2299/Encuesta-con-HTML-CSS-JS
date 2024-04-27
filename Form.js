document.addEventListener("DOMContentLoaded", function() {
    // Obtener las preguntas del HTML
    const pregunta1Label = document.getElementById("pregunta1-label").textContent.trim();
    const pregunta2Label = document.getElementById("pregunta2-label").textContent.trim();
    const pregunta3Label = document.getElementById("pregunta3-label").textContent.trim();

    // Actualizar el CSS con las preguntas del HTML
    document.styleSheets[0].insertRule(`.grid-item p:nth-of-type(1)::before { content: "${pregunta1Label}: "; }`);
    document.styleSheets[0].insertRule(`.grid-item p:nth-of-type(2)::before { content: "${pregunta2Label}: "; }`);
    document.styleSheets[0].insertRule(`.grid-item p:nth-of-type(3)::before { content: "${pregunta3Label}: "; }`);

    const encuestaForm = document.getElementById("encuestaForm");
    const encuestasContainer = document.getElementById("encuestasContainer");

    // Cargar encuestas almacenadas en Local Storage al cargar la página
    cargarEncuestas();

    // Agregar evento de submit al formulario
    encuestaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const pregunta1 = encuestaForm.elements["pregunta1"].value.trim();
        const pregunta2 = encuestaForm.elements["pregunta2"].value.trim();
        const pregunta3 = encuestaForm.elements["pregunta3"].value.trim();

        // Verificar si todas las preguntas están respondidas
        if (pregunta1 !== "" && pregunta2 !== "" && pregunta3 !== "") {
            // Guardar encuesta en Local Storage
            guardarEncuesta(pregunta1, pregunta2, pregunta3);
            // Actualizar visualización
            mostrarEncuestas();
            // Limpiar formulario
            encuestaForm.reset();
        } else {
            alert("Por favor responde todas las preguntas.");
        }
    });

    // Función para guardar encuesta en Local Storage
    function guardarEncuesta(pregunta1, pregunta2, pregunta3) {
        const encuesta = { pregunta1, pregunta2, pregunta3 };
        let encuestas = JSON.parse(localStorage.getItem("encuestas")) || [];
        encuestas.push(encuesta);
        localStorage.setItem("encuestas", JSON.stringify(encuestas));
    }

    // Función para cargar encuestas desde Local Storage
    function cargarEncuestas() {
        let encuestas = JSON.parse(localStorage.getItem("encuestas")) || [];
        for (let encuesta of encuestas) {
            mostrarEncuesta(encuesta);
        }
    }

    // Función para mostrar una encuesta en la visualización
    function mostrarEncuesta(encuesta) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.innerHTML = `
        <p><strong>${encuesta.pregunta1}</strong></p>
        <p><strong>${encuesta.pregunta2}</strong></p>
        <p><strong>${encuesta.pregunta3}</strong></p>
        <button class="eliminar">Eliminar</button>
        `;
        encuestasContainer.appendChild(gridItem);

        // Agregar evento de click al botón de eliminar
        const eliminarBtn = gridItem.querySelector(".eliminar");
        eliminarBtn.addEventListener("click", function() {
            // Funcionalidad de eliminación aún no implementada
            alert("Funcionalidad de eliminación aún no implementada.");
        });
    }

    // Función para mostrar todas las encuestas en la visualización
    function mostrarEncuestas() {
        encuestasContainer.innerHTML = "";
        cargarEncuestas();
    }
});
