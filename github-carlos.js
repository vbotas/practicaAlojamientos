// ----------------------------------------GITHUB--------------------------------------------

// Comprueba que el token sea correcto y guarda los datos en el fichero y repositorio indicados
function guardar_datos() {
    // Extraigo los datos de los campos
    var token = $("#token").val();
    var repo_name = $("#repo").val();
    var fichero = $("#nombre_fich").val();
    // Quito el formulario
    $('#token-form').html("");
    // Objeto github
    github = new Github({
	token: token,
	auth: "oauth"
    });
    // Extraigo el repositorio
    repositorio = github.getRepo("cgonzalezsanc", repo_name);
    // Compruebo si hay error y guardo el contenido
    repositorio.show(function (error, repositorio) {
        if (error) {
            $("#botones-github").after("<p>Se ha producido un error</p>");
        } else {
            var contenido = 'a';
            repositorio.write('master', fichero, contenido,
                "Actualizando datos", function(err) {
                    console.log (err)
                });
        }  
    });
}

// Comprueba que el token sea correcto y carga los datos del fichero y repositorio indicados
function cargar_datos() {
    var token = $("#token").val();
    var repositorio = $("#repo").val();
    var fichero = $("#nombre_fich").val();
    // Quito el formulario
    $('#token-form').html("");  
    // Objeto github
    github = new Github({
	token: token,
	auth: "oauth"
    });
    // Extraigo el repositorio
    repositorio = github.getRepo("cgonzalezsanc", repo_name);
}

/* Muestra el formulario para introducir el token, el nombre del repositorio y el nombre del 
   fichero, y habilita el handler para guardar los datos */
function click_guardar() {
    $('#token-form').html("Token: <input type='text' name='token' value='' id='token' "
                          + "size='36' />"
                          + "Repositorio: <input type='text' name='repo' value='X-Nav-Practica-Hoteles' "
                          + "id='repo' size='15' />"
                          + "Fichero: <input type='text' name='nombre_fich' id='nombre_fich' "
                          + "value='datos.json' size='10' />"
                          + "<button type='button' id='guardar-github'>Guardar en Github</button>");
    $("div#token-form button#guardar-github").click(guardar_datos);
}

/* Muestra el formulario para introducir el token y habilita el handler para guardar los datos */
function click_cargar() {
    $('#token-form').html("Token: <input type='text' name='token' value='' id='token' "
                          + "size='36' />"
                          + "Repositorio: <input type='text' name='repo' value='X-Nav-Practica-Hoteles' "
                          + "id='repo' size='15' />"
                          + "Fichero: <input type='text' name='nombre_fich' id='nombre_fich' "
                          + "value='datos.json' size='10' />"
                          + "<button type='button' id='cargar-github'>Cargar de Github</button>");
    $("div#token-form button#cargar-github").click(cargar_datos);
}