var mostrar_alojamientos = function () {
	var alojamiento = alojamientos[$(this).attr('numero')];
	/*Cogemos sólo alguno de los datos que están en el json y los almacenamos en variables de nuestra aplicación*/
	var latitud = alojamiento.geoData.latitude;
	var longitud = alojamiento.geoData.longitude;
	var direccion = alojamiento.geoData.address;
	var descripcion = alojamiento.basicData.body;
	var url_web = alojamiento.basicData.web;
	var telefono = alojamiento.basicData.phone;
	var nombre = alojamiento.basicData.name;
	var imagen = alojamiento.multimedia.media[0].url;
	var categoria = alojamiento.extradata.categorias.categoria.item[1]['#text'];
	var subcategoria = alojamiento.extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];

	L.marker([latitud,longitud]).addTo(mapa)
		.bindPopup('<a href="'+url_web+'">' + nombre + '</a><br />')
		.openPopup();

	mapa.setView([latitud, longitud], 16);
	$('#mapa').after('<div id="descripcion"></div>');
	$('#descripcion').html('<h2>'+nombre+'</h2>' + '<p>Descripción: '+descripcion+'</p><p>Categoria: ' + categoria + '</p><p>Subcategoría: '+subcategoria+'</p><img src="'+imagen+'" style="display:block;border:2px solid grey;border-radius:15px">');
	$('#lista_alojamientos').css({'display':'none'});
	$('<button>', {
			 	'type': 'button',
			 	'id': 'cerrar',
			 	html: 'Cerrar',
			 	'onclick': 'cerrar_alojamiento()'
	}).appendTo('#descripcion');
}

var leer_alojamientos = function () {

	$.getJSON('alojamientos.json', function (datos_alojamientos) {
		$('#ver_alojamientos').html('');
		alojamientos = datos_alojamientos.serviceList.service;
		//$('#lista_alojamientos').after('<h1>' + alojamientos.length + '</h1>');
		console.log(alojamientos.length);

		var lista = '<p>Alojamientos encontrados: ' + alojamientos.length + '</p>';
		console.log(lista);
		lista = lista + '<ol>'
		for(var i = 0; i < alojamientos.length; i++) {
			lista = lista + '<li numero='+i+'>' + alojamientos[i].basicData.name + '</li>';
		}
		lista = lista + '</ol>';
		console.log(lista);
		$('#lista_alojamientos').html(lista);
		/*$('ol li').click(function(){
			console.log('hola');
		})
		console.log('DOCUMENTO LEIDO!!!!!!');*/
		$('ol li').click(mostrar_alojamientos);
	})
};

var cerrar_alojamiento = function () {
	$('#descripcion').remove();
	$('#lista_alojamientos').css({'display':'block'});
	mapa.setView([40.415556, -3.707222],10);
	mapa.closePopup();
	mapa.removeLayer(L.marker);
}

// var crear_coleccion = function () {
// 	$('')
// }
var buscar_alojamiento = function () {

}

var expandir_formulario = function() {
	$("select[name=category]").change(function(){
   		valor = $('select[name=category]').val();
    	console.log(valor);
    	if (valor === '1') {
    		$('#seleccion_subcategoria').remove();
	    	console.log('Está buscando hoteles');
    		// buscar_hoteles();
    		if($('#seleccion_subcategoria').length > 0) {
    			console.log('el elemento ya existe');
    		}else {
    			$('#seleccion_categoria').after('<li id="seleccion_subcategoria"></li>');
				$('#seleccion_subcategoria').append('<fieldset id="seleccionar_subcategoria"><legend>Subcategoría</legend></fieldset>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hoteles" value="1">1 Estrella</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hoteles" value="2">2 Estrellas</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hoteles" value="3">3 Estrellas</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hoteles" value="4">4 Estrellas</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hoteles" value="5">5 Estrellas</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hoteles" value="6">5 Estrellas Gran Lujo</label>');
			}
		}
		else if (valor === '2') {
	    	console.log('Está buscando hostales');
	    	$('#seleccion_subcategoria').remove();
    		if($('#seleccion_subcategoria').length > 0) {
    			console.log('el elemento ya existe');
    		}else {
    			$('#seleccion_categoria').after('<li id="seleccion_subcategoria"></li>');
    			$('#seleccion_subcategoria').append('<fieldset id="seleccionar_subcategoria"><legend>Subcategoría</legend></fieldset>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hostales" value="1">1 Estrella</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hostales" value="2">2 Estrellas</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="estrellas_hostales" value="3">3 Estrellas</label>');
			}
		}
		else if (valor === '3') {
	    	console.log('Está buscando hostales');
	    	$('#seleccion_subcategoria').remove();
    		if($('#seleccion_subcategoria').length > 0) {
    			console.log('el elemento ya existe');
    		}else {
    			$('#seleccion_categoria').after('<li id="seleccion_subcategoria"></li>');
    			$('#seleccion_subcategoria').append('<fieldset id="seleccionar_subcategoria"><legend>Subcategoría</legend></fieldset>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="llaves" value="1">1 Llave</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="llaves" value="2">2 Llaves</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="llaves" value="3">3 Llaves</label>');
				$('#seleccionar_subcategoria').append('<label><input type="radio" name="llaves" value="4">4 Llaves</label>');
			}
		}
		

    });
}

/*var buscar_hoteles = function() {
	$('#seleccion_categoria').after('<li id="seleccion_subcategoria"></li>');
	$('#seleccion_subcategoria').append('<label for="subcategory">Subcategoría: </label>');
}
*/




$(document).ready(function() {
	$('#tabs').tabs();

	/*Inicializamos el mapa*/
	mapa = L.map('mapa');
	mapa.setView([40.415556, -3.707222],10);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	 	maxZoom: 20
	}).addTo(mapa);

	/*Leemos todos los alojamientos llamando a la función "leer_alojamientos"*/
	$('#ver_alojamientos').click(leer_alojamientos);
	$('a.leaflet-popup-close.button').on('click','cerrar_alojamiento()');
});