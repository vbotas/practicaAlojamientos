//FUNCIONES PESTAÑA "GESTION DE ALOJADOS"
var mostrar_alojamiento_seleccionado = function (latitud_selecc, longitud_selecc, direccion_selecc, descripcion_selecc, url_web_selecc, nombre_selecc, imagen_selecc, categoria_selecc, subcategoria_selecc, id_alojamiento_selecc) {
	console.log('Aquí se mostrará la descripción del hotel seleccionado en la pestaña principal.');
	if($('#mapa_clientes_alojados').length > 0) {
		if ($('#descripcion_selecc').length > 0 ){
			$('#descripcion_selecc').html('');
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2>'+nombre_selecc+'</h2>' + '<p>Descripción: '+descripcion_selecc+'</p><p>Categoria: ' + categoria_selecc + '</p><p>Subcategoría: '+subcategoria_selecc+'</p><img src="'+imagen_selecc+'" style="display:block;border:2px solid grey;border-radius:15px">');
			L.marker([latitud_selecc,longitud_selecc]).addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'">' + nombre_selecc + '</a><br />')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);
		}
		else {
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2>'+nombre_selecc+'</h2>' + '<p>Descripción: '+descripcion_selecc+'</p><p>Categoria: ' + categoria_selecc + '</p><p>Subcategoría: '+subcategoria_selecc+'</p><img src="'+imagen_selecc+'" style="display:block;border:2px solid grey;border-radius:15px">');
			L.marker([latitud_selecc,longitud_selecc]).addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'">' + nombre_selecc + '</a><br />')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);		
		}

	}
	else {
		$('#clientes_alojados').append('<div id="mapa_clientes_alojados"></div>');
		mapa_clientes_alojados = L.map('mapa_clientes_alojados');
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	 		maxZoom: 20
		}).addTo(mapa_clientes_alojados);
		if ($('#descripcion_selecc').length > 0 ){
			$('#descripcion_selecc').remove();
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2>'+nombre_selecc+'</h2>' + '<p>Descripción: '+descripcion_selecc+'</p><p>Categoria: ' + categoria_selecc + '</p><p>Subcategoría: '+subcategoria_selecc+'</p><img src="'+imagen_selecc+'" style="display:block;border:2px solid grey;border-radius:15px">');
			L.marker([latitud_selecc,longitud_selecc]).addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'">' + nombre_selecc + '</a><br />')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);		
		}
		else {
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2>'+nombre_selecc+'</h2>' + '<p>Descripción: '+descripcion_selecc+'</p><p>Categoria: ' + categoria_selecc + '</p><p>Subcategoría: '+subcategoria_selecc+'</p><img src="'+imagen_selecc+'" style="display:block;border:2px solid grey;border-radius:15px">');
			L.marker([latitud_selecc,longitud_selecc]).addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'">' + nombre_selecc + '</a><br />')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);		
		}	
	}
	$('#descripcion_selecc').after('<div id="google_clientes"></div>');
	$('#google_clientes').append('<h2 id="titulo_clientes">Clientes Alojados<h2>');
	google_plus_clientes('112657067196273212991');
	google_plus_clientes('+GregorioRobles');
	$('#google_clientes').after('<form class="formulario_cliente" action="#"><ul><li><h2>Añadir Cliente</h2></li><li><label for="id_cliente">ID Cliente:</label><input id="id_google_cliente"type="text"  placeholder="p.ej: +GregorioRobles" required /></li><li><button id="anadir_cliente" class="submit" type="submit">Enviar</button></li>')

	$('#anadir_cliente').on('click',function() {
		var id_cliente_g = $('input#id_google_cliente').val();
		var id_usuario = id_cliente_g.toString();
		google_plus_clientes(id_usuario);

	})

}

var google_plus_clientes = function (id_usuario) {
	var api = 'AIzaSyBE14FRa5Z_kxmfTs1t-p5mdBmYmmKXOe8';
	gapi.client.setApiKey(api);
	gapi.client.load('plus','v1', function () {
		var solicitud = gapi.client.plus.people.get({
            'userId': id_usuario
          });
		solicitud.execute(function(resp) {
			var cliente = document.createElement('h4');
			var imagen_cliente = document.createElement('img');
			imagen_cliente.src = resp.image.url;
			cliente.append(imagen_cliente);
			cliente.appendChild(document.createTextNode(resp.displayName));
            document.getElementById('google_clientes').appendChild(cliente);
		})
	})
}









//FUNCIONES PESTAÑA "COLECCIONES"


var cuadro_alojamientos = function () {
	$.getJSON('alojamientos2.json', function (datos_alojamientos) {
		alojamientos = datos_alojamientos.serviceList.service;
		//$('#lista_alojamientos').after('<h1>' + alojamientos.length + '</h1>');
		console.log(alojamientos.length);

		var lista2 = 'Alojamientos en Madrid: ';
		console.log(lista2);
		lista2 = lista2 + '<ol>'
		for(var i = 0; i < alojamientos.length; i++) {
			lista2 = lista2 + '<li numero='+i+'>' + alojamientos[i].basicData.name + '</li>';
		}
		lista2 = lista2 + '</ol>';
		console.log(lista2);
		if(($('div#lista_alojamientos').children('ol')).length > 0 ) {
			$('#lista_alojamientos_totales').html(lista2);
		
			$('ol li').click(mostrar_alojamientos);
			$('#lista_alojamientos_totales ol li').draggable({
				helper: 'clone'
			});	
		}
		else {
			console.log('Falta cargar los hoteles en la pestaña "Principal"');
		}
		
	})

}

var add_coleccion = function (id_alojamiento_recibido,nombre,lat_aloj, long_aloj) {
	//console.log('Añadido a colección');
	var id = id_alojamiento_recibido.toString();
	console.log(lat_aloj);
	console.log(long_aloj);
	var coord = [lat_aloj, long_aloj];
	console.log(coord);
	//console.log('El id del alojamiento es: ' + id);
	console.log(nombre)
	/*alojamientos_vistos.push(id);
	console.log(alojamientos_vistos);*/
	//array_coleccion.push(id);
	//console.log(array_coleccion);
	if($.inArray(id, array_coleccion) === -1) {
		array_coleccion.push(id);
		console.log(array_coleccion);
	}
	else {
		console.log('Ya está en la colección.');
	}
	$('#nombre_coleccion_creada').after('<p id="alojamiento_coleccion">'+ nombre +'</p>');
	if($('#mapa_coleccion').length >0) {
		L.marker([lat_aloj,long_aloj]).addTo(mapa_coleccion)
		.bindPopup('<a>' + nombre + '</a><br />')
		.openPopup();
		mapa_coleccion.setView([lat_aloj,long_aloj], 16);
	}
	else {
		$('#colecciones_creadas').after('<div id="mapa_coleccion"></div>');
		//$('#mapa_coleccion').after('<p>Más Información en la pestaña "PRINCIPAL"</p>');
		mapa_coleccion = L.map('mapa_coleccion');
		mapa_coleccion.setView([40.415556, -3.707222],10);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	 		maxZoom: 20
		}).addTo(mapa_coleccion);
		L.marker([lat_aloj,long_aloj]).addTo(mapa_coleccion)
			.bindPopup('<a>' + nombre + '</a><br />')
			.openPopup();

		mapa_coleccion.setView([lat_aloj,long_aloj], 16);
	}	
}

var crear_coleccion = function (id_alojamiento_recibido) {

	nombre_coleccion_nueva = $('input:text[name=nombre_coleccion]').val()
	$('#colecciones_creadas').append('<div class="coleccion" id="coleccion_nueva"><div class="coleccion_nueva" id="coleccion'+j+'"><p id="nombre_coleccion_creada" onclick="desplegar_coleccion('+j+')">'+nombre_coleccion_nueva + '</p></div></div>');
	j += 1;
	array_colecciones.push('coleccion'+j);
	$('.coleccion_nueva').droppable({
			drop: function(evento, ui) {
				$(this).append('<p id="alojamiento_coleccion" onclick="mostrar_mapa_coleccion('+ui.draggable.attr('numero')+','+j+')">'+ ui.draggable.text()+'</p>');

                //alert("objeto con id="+ ui.draggable.text());
			}
	});
	console.log(array_colecciones);
}

var desplegar_coleccion = function(param) {
	
	var id_coleccion = 'coleccion'+param;
	//alert(id_coleccion);
	$('#'+id_coleccion+' > #alojamiento_coleccion').slideToggle("slow");
	//var IDpadre = $(this).parent().attr('id');
	//alert(IDpadre);
	seleccionar_coleccion(id_coleccion)
}

var seleccionar_coleccion = function(identificador_coleccion){
	//alert(identificador_coleccion);
	console.log(identificador_coleccion + ' seleccionada.');
	if( $('.coleccion_seleccionada').length > 0 )  {
		$('#nombre_coleccion_creada').removeClass('coleccion_seleccionada');
	}
	$('#'+identificador_coleccion+' #nombre_coleccion_creada').addClass('coleccion_seleccionada');
	var nombre_coleccion_seleccionada = $('.coleccion_seleccionada').text();
	if( $('#coleccion_seleccionada').length > 0 )  {
		$('#coleccion_seleccionada').append('<p>'+($('#nombre_coleccion_creada').siblings('#alojamiento_coleccion')).text()+'<br /></p>');
	}
	else {
		$('#mapa').after('<div id="coleccion_seleccionada">Colección Seleccionada: <br />'+nombre_coleccion_seleccionada+'<div>');
		$('#coleccion_seleccionada').append('<p>'+($('#nombre_coleccion_creada').siblings('#alojamiento_coleccion')).text()+'<br /></p>');
		//CORREGIR PORQUE ALGO FALLA A LA HORA DE AÑADIR LOS HOTELES AL DIV
	}
}

var mostrar_mapa_coleccion = function(numero_alojamiento,numero_coleccion) {
	//alert(numero_alojamiento);
	seleccionar_coleccion(numero_coleccion);
	var col = numero_coleccion - 1;
	var id_col = 'coleccion'+col;
	var nombre_coleccion = $('#'+id_col+' > #nombre_coleccion_creada').text();
	//console.log(nombre_coleccion);
	var alojamiento = alojamientos[numero_alojamiento];
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
	var id_alojamiento = alojamiento['@id'];
	console.log(id_alojamiento)
	
	// array_coleccion.push(id_alojamiento);
	// console.log(array_coleccion);
	if($.inArray(id_alojamiento, array_coleccion) === -1) {
		array_coleccion.push(id_alojamiento);
		console.log(array_coleccion);
	}
	else {
		console.log('Ya está en la colección.');
	}

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
	$('<button>', {
			 	'type': 'button',
			 	'id': 'coleccion',
			 	html: 'Añadir Colección',
			 	'onclick': 'add_coleccion('+id_alojamiento+')'
	}).appendTo('#descripcion');

	if($('#mapa_coleccion').length >0) {
		L.marker([latitud,longitud]).addTo(mapa_coleccion)
		.bindPopup('<a href="'+url_web+'">' + nombre + '</a><br />')
		.openPopup();
		mapa_coleccion.setView([latitud, longitud], 16);
	}
	else {
		$('#colecciones_creadas').after('<div id="mapa_coleccion"></div>');
		//$('#mapa_coleccion').after('<p>Más Información en la pestaña "PRINCIPAL"</p>');
		mapa_coleccion = L.map('mapa_coleccion');
		mapa_coleccion.setView([40.415556, -3.707222],10);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	 		maxZoom: 20
		}).addTo(mapa_coleccion);
		L.marker([latitud,longitud]).addTo(mapa_coleccion)
			.bindPopup('<a href="'+url_web+'">' + nombre + '</a><br />Coleccion: '+nombre_coleccion)
			.openPopup();

		mapa_coleccion.setView([latitud, longitud], 16);
	}	
}









//FUNCIONES PESTAÑA "PRINCIPAL"

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
	var id_alojamiento = alojamiento['@id'];
	console.log(id_alojamiento)

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
	if(array_colecciones.length > 0) {
		$('<button>', {
			 	'type': 'button',
			 	'id': 'coleccion',
			 	html: 'Añadir Colección',
			 	'onclick': 'add_coleccion('+id_alojamiento+',"'+nombre+'",'+latitud+','+longitud+')'
		}).appendTo('#descripcion');
		$('button#coleccion').css({'display':'inline'});
	}
	else {
		$('<button>', {
			 	'type': 'button',
			 	'id': 'coleccion',
			 	html: 'Añadir Colección',
			 	'onclick': 'add_coleccion('+id_alojamiento+',"'+nombre+'",'+latitud+','+longitud+')'
		}).appendTo('#descripcion');
		$('button#coleccion').css({'display':'none'});
	}
	mostrar_alojamiento_seleccionado(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento);
}

var leer_alojamientos = function () {

	$.getJSON('alojamientos2.json', function (datos_alojamientos) {
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
		
		$('ol li').click(mostrar_alojamientos);
	})
	$('#buscar_nombre').css({'display':'block'});
};

var cerrar_alojamiento = function () {
	$('#descripcion').remove();
	$('#lista_alojamientos').css({'display':'block'});
	mapa.setView([40.415556, -3.707222],10);
	mapa.closePopup();
	mapa.removeLayer(L.marker);
}

var buscar_alojamiento = function () {


	console.log('clickado para buscar');
	nombre_buscado = $('#nombre_alojamiento').val();
	valor_categoria = $('select[name=category]').val();
	array_busqueda = [];
	array_busqueda.push(nombre_buscado);
	array_busqueda.push(valor_categoria);
	//Dependiendo del alojamiento buscado, tendrá o no "subcategoría",aquí se diferencia cada caso, añadiéndolo o no al array_busqueda.
	if (valor_categoria === '1') {
		valor_subcategoria = $('input:radio[name=estrellas_hoteles]:checked').val();
		$("#seleccionar_subcategoria").submit();
		array_busqueda.push(valor_subcategoria);	
	}
	else if(valor_categoria === '2') {
		valor_subcategoria = $('input:radio[name=estrellas_hostales]:checked').val();
		$("#seleccionar_subcategoria").submit();
		array_busqueda.push(valor_subcategoria);
	}
	else if(valor_categoria === '3') {
		valor_subcategoria = $('input:radio[name=llaves]:checked').val();
		$('#seleccionar_subcategoria').submit();
		array_busqueda.push(valor_subcategoria);
	}
	console.log(array_busqueda);


	$.getJSON('alojamientos2.json', function (datos_alojamientos) {

		console.log('empieza a leer');
		alojamientos = datos_alojamientos.serviceList.service;
		console.log('hay '+alojamientos.length+' alojamientos leidos');
		$('#buscar_alojamiento').after('<div id="resultado_busqueda"></div>');
		var lista_alojamientos_encontrados = '<p id="cabecera_busqueda">Resultados de la Búsqueda<p><ol>'
		for (var j=0; j < alojamientos.length; j++) {
			nombre_leido = alojamientos[j].basicData.name;
			categoria_leida = alojamientos[j].extradata.categorias.categoria.item[1]['#text'];
			//subcategoria_leida = alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];
			
			var alojamiento_leido = [];
			alojamiento_leido.push(nombre_leido);
			alojamiento_leido.push(categoria_leida);
			//alojamiento_leido.push(subcategoria_leida);
			//console.log(alojamiento_leido);
			if (nombre_buscado === '') {
				
				
				
				switch (valor_categoria) {
					case '1':
						if (categoria_leida === 'Hoteles'){
							
							subcategoria_leida = alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];
							switch (valor_subcategoria) {
								case '1':
									if(subcategoria_leida === '1 estrella') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '2':
									if(subcategoria_leida === '2 estrellas') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '3':
									if(subcategoria_leida === '3 estrellas') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '4':
									if(subcategoria_leida === '4 estrellas') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '5':
									if(subcategoria_leida === '5 estrellas') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '6':
									if(subcategoria_leida === '5 estrellas Gran Lujo') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
							}
							//lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
						}
						break;
					case '2'://FALLA PORQUE HAY ALGUNOS QUE NO TIENEN SUBCATEGORIA Y NO ME FUNCIONA LA COMPROBACIÓN DEL "TYPEOF"
						if (categoria_leida ==='Hostales') {
							subcategoria_leida = alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];
							switch (valor_subcategoria) {
								case '1':
									if(subcategoria_leida === '1 estrella') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
								case '2':
									if(subcategoria_leida === '2 estrellas') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
								case '3':
									if(subcategoria_leida === '3 estrellas') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
							}
							break;
						}
						break;
					case '3':
						if (categoria_leida === 'Apartahoteles') {
							$('#resultado_busqueda').empty();
							subcategoria_leida = alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];
							switch (valor_subcategoria) {
								case '1':
									if(subcategoria_leida === '1 llave') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
								case '2':
									if(subcategoria_leida === '2 llaves') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
								case '3':
									if(subcategoria_leida === '3 llaves') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
								case '4':
									if(subcategoria_leida === '4 llaves') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';
									}
									break;
							}

						}
						break;
					case '4':
						if (categoria_leida === 'Residencias universitarias') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';	
						}
						break;
					case '5':
						if (categoria_leida === 'Camping') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';	
						}
						break;
					case '6':
						if (categoria_leida === 'Albergues') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';	
						}
						break;
					case '7':
						if (categoria_leida === 'Pensiones') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li>' + nombre_leido + '</li>';	
						}
						break;							
						
						
				}
			}

			/*if (nombre_buscado !== '')
				if (valor_categoria ==='undefined') {
					console.log('busca por nombre');
				}*/
		}
		lista_alojamientos_encontrados = lista_alojamientos_encontrados + '</ol>';
		$('#resultado_busqueda').text('');
		$('#resultado_busqueda').html(lista_alojamientos_encontrados);
		$('ol li').click(mostrar_alojamientos);
	})
}

var expandir_formulario = function() {
	if ($('#cabecera_busqueda').length>0){
		$('#cabecera_busqueda').remove();
	}
	if ($('div#resultado_busqueda').length>0){
		$('div#resultado_busqueda').remove();
	}
	
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
				if(($('div#lista_alojamientos').children('ol')).length > 0 ) {
					$('#seleccionar_subcategoria').after('<input id="botonBuscar" type="submit" value="Buscar" onclick="leer_formulario()" />');	
				}
				$("#buscar_nombre").remove();
				$('#botonBuscar').after('<input id="botonReset" type="reset" value="Vaciar Formulario" onclick="borrar_formulario()" />');
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
				if(($('div#lista_alojamientos').children('ol')).length > 0 ) {
					$('#seleccionar_subcategoria').after('<input id="botonBuscar" type="submit" value="Buscar" onclick="leer_formulario()" />');	
				}
				$("#buscar_nombre").remove();
				$('#botonBuscar').after('<input id="botonReset" type="reset" value="Vaciar Formulario" onclick="borrar_formulario()" />');
			}
		}
		else if (valor === '3') {
	    	console.log('Está buscando apartahoteles');
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
				if(($('div#lista_alojamientos').children('ol')).length > 0 ) {
					$('#seleccionar_subcategoria').after('<input id="botonBuscar" type="submit" value="Buscar" onclick="leer_formulario()" />');	
				}
				$("#buscar_nombre").remove();
				$('#botonBuscar').after('<input id="botonReset" type="reset" value="Vaciar Formulario" onclick="borrar_formulario()" />');
			}
		}
		else {
			$('#seleccion_subcategoria').remove();
    		if($('#seleccion_subcategoria').length > 0) {
    			console.log('el elemento ya existe');
    		}else {
    			if ($('#botonBuscar').length > 0) {
    				console.log('Ya existe el boton');
    			}
    			else {
    				if(($('div#lista_alojamientos').children('ol')).length > 0 ) {
						$('#seleccionar_subcategoria').after('<input id="botonBuscar" type="submit" value="Buscar" onclick="leer_formulario()" />');	
					}
    				$("#buscar_nombre").remove();	
    				$('#botonBuscar').after('<input id="botonReset" type="reset" value="Vaciar Formulario" onclick="borrar_formulario()" />');
    			}			
			}
		}
		

    });
}
//Función para leer los datos que se han marcado en el formulario y poder buscar los hoteles.
var leer_formulario = function() {
	//console.log('clickado para buscar');

	valor_categoria = $('select[name=category]').val();
	//console.log('El valor de la Categoría es: '+valor_categoria);
	if (valor_categoria === '1') {
		valor_subcategoria = $('input:radio[name=estrellas_hoteles]:checked').val();
		$("#seleccionar_subcategoria").submit();
		//console.log('El valor de la Subcategoría es: '+valor_subcategoria);
	}
	else if(valor_categoria === '2') {
		valor_subcategoria = $('input:radio[name=estrellas_hostales]:checked').val();
		$("#seleccionar_subcategoria").submit();
	//	console.log('El valor de la Subcategoría es: '+valor_subcategoria);
	}
	else if(valor_categoria === '3') {
		valor_subcategoria = $('input:radio[name=llaves]:checked').val();
		$('#seleccionar_subcategoria').submit();
	//	console.log('El valor de la Subcategoría es: '+valor_subcategoria);
	}
	buscar_alojamiento();
}

var borrar_formulario = function() {
	$('#seleccion_subcategoria').remove();
	$('#nombre_alojamiento').val('');
	if ($('#cabecera_busqueda').length>0){
		$('#cabecera_busqueda').remove();
	}
	if ($('div#resultado_busqueda').length>0){
		$('div#resultado_busqueda').remove();
	}
}




//FUNCIONES QUE SE EJECUTAN AL CARGAR LA PÁGINA
$(document).ready(function() {
	$('#tabs').tabs();
	p=0;
	j=0;
	array_coleccion = [];
	array_colecciones = [];
	coleccion_alojamientos_vistos = [];
	console.log('Lista_alojamientos: longitud = '+ $('#lista_alojamientos').length);

	/*Inicializamos el mapa*/
	mapa = L.map('mapa');
	mapa.setView([40.415556, -3.707222],10);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	 	maxZoom: 20
	}).addTo(mapa);

	
	/*Leemos todos los alojamientos llamando a la función "leer_alojamientos"*/
	$('#ver_alojamientos').click(leer_alojamientos);
	if(($('div#lista_alojamientos').children('ol')).length === 0 ) {
		$('#buscar_nombre').css({'display':'none'});
	}

	$('#ui-id-1').on('click', function() {
		/*$('#mapa').css({'display':'none'});
		$('#ver_alojamientos').css({'display':'none'});
		$('.busqueda:_alojamiento').css({'display':'none'});*/
	 	$('#principal').css({'display':'block'});
	 	$('#colecciones').css({'display':'none'});
	 	$('#clientes_alojados').css({'display':'none'});
	});

	$('#ui-id-2').on('click', function() {
	 	$('#principal').css({'display':'none'});
	 	$('#colecciones').css({'display':'block'});
	 	$('#clientes_alojados').css({'display':'none'});
	 	cuadro_alojamientos();

	});

	$('#ui-id-3').on('click', function() {
	 	$('#principal').css({'display':'none'});
	 	$('#colecciones').css({'display':'none'});
	 	$('#clientes_alojados').css({'display':'block'});

	});

});