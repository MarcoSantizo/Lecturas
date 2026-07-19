let lecturas = [];

let listaActual = [];
let indiceActual = -1;
let libroActual = null;

const biblioteca = document.getElementById("biblioteca");
const buscador = document.getElementById("buscador");

fetch("data/lecturas.json")
.then(respuesta => respuesta.json())
.then(datos => {

    lecturas = datos;

    mostrarContador();

    mostrarLecturas(lecturas);

});

function mostrarContador(){

    const contador = document.getElementById("contador");

    contador.textContent =
    "📚 " + lecturas.length + " lecturas disponibles";

}

function mostrarLecturas(lista) {

    listaActual = lista;

    biblioteca.innerHTML = "";

    if(lista.length === 0){

        biblioteca.innerHTML = `

        <div class="sin-resultados">

            <h2>🔎 No encontramos lecturas</h2>

            <p>
                Intenta buscar con otro título o autor.
            </p>

        </div>

        `;

        return;

    }

    lista.forEach((libro, indice) => {

        biblioteca.innerHTML += `

        <div class="tarjeta">

            <img src="${libro.imagen}" alt="${libro.titulo}">

            <div class="info">

                <h2>${libro.titulo}</h2>

                <p>${libro.autor}</p>

                <button class="boton"
                    onclick="leerPDF('${libro.pdf}', '${libro.titulo}', ${indice})">

                    📖 Leer PDF

                </button>

            </div>

        </div>

        `;

    });

}

// Buscador automático
buscador.addEventListener("input", function(){

    const texto = this.value.toLowerCase().trim();

    const resultados = lecturas.filter(libro => {

        return (

            libro.titulo.toLowerCase().includes(texto) ||

            libro.autor.toLowerCase().includes(texto)

        );

    });

    mostrarLecturas(resultados);

});

function leerPDF(pdf, titulo, indice){

    indiceActual = indice;
    libroActual = listaActual[indice];

    const visor = document.getElementById("visor");
    const lector = document.getElementById("lectorPDF");
    const tituloPDF = document.getElementById("tituloPDF");

    biblioteca.style.display = "none";

    tituloPDF.textContent = "📖 Leyendo: " + titulo;

    lector.src =
        "pdfjs/web/viewer.html?file=" +
        encodeURIComponent(window.location.origin + "/Lecturas/" + pdf);

    visor.style.display = "block";

    visor.scrollIntoView({
        behavior: "smooth"
    });

}

function volverLecturas(){

    alert("Volver ejecutado");

    const cajaBusqueda = document.getElementById("buscador");

    cajaBusqueda.value = "";

    document.getElementById("visor").style.display = "none";

    biblioteca.style.display = "grid";

    mostrarLecturas(lecturas);

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function entrarBiblioteca(){

    const bienvenida = document.getElementById("bienvenida");

    bienvenida.style.display = "none";

    document.getElementById("contenido").style.display = "block";

    document.getElementById("contenido").style.visibility = "visible";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function siguientePDF(){

    if(indiceActual < listaActual.length - 1){

        indiceActual++;

        const libro = listaActual[indiceActual];

        leerPDF(libro.pdf, libro.titulo, indiceActual);

    }

}

function anteriorPDF(){

    if(indiceActual > 0){

        indiceActual--;

        const libro = listaActual[indiceActual];

        leerPDF(libro.pdf, libro.titulo, indiceActual);

    }

}