let lecturas = [];

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


    lista.forEach(libro => {

        biblioteca.innerHTML += `

        <div class="tarjeta">

            <img src="${libro.imagen}" alt="${libro.titulo}">

            <div class="info">

                <h2>${libro.titulo}</h2>

                <p>${libro.autor}</p>

             <button class="boton" 
onclick="leerPDF('${libro.pdf}', '${libro.titulo}')">

📖 Leer PDF

</button>

            </div>

        </div>

        `;

    });

}


// Buscador automático mientras escriben

buscador.addEventListener("input", function(){

    const texto = this.value.toLowerCase();


    const resultados = lecturas.filter(libro => {

        return (

            libro.titulo.toLowerCase().includes(texto) ||

            libro.autor.toLowerCase().includes(texto)

        );

    });


    mostrarLecturas(resultados);

});
function leerPDF(pdf, titulo){

    const visor = document.getElementById("visor");

    const lector = document.getElementById("lectorPDF");

    const tituloPDF = document.getElementById("tituloPDF");


    tituloPDF.textContent = "📖 Leyendo: " + titulo;


    lector.src = "pdfjs/web/viewer.html?file=../../Lecturas/" + pdf;


    visor.style.display = "block";


    visor.scrollIntoView({
        behavior:"smooth"
    });

}
function volverLecturas(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
function entrarBiblioteca(){

    const bienvenida = document.getElementById("bienvenida");

    bienvenida.style.display = "none";


   document.getElementById("contenido")
.style.display = "block";

document.getElementById("contenido")
.style.visibility = "visible";


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}