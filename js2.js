var ver_contenido_fichero = function () {
	console.log('Las colecciones creadas son: '+array_colecciones);
	contenido_fichero = '{"colecciones":[';
	// contenido_fichero = '';
	for (var contador = 0; contador < array_colecciones.length; contador ++){
		console.log(contador);
		// contenido_fichero += array_colecciones[contador]+ ':';
		//contenido_fichero = contenido_fichero +'{"coleccion'+ contador + '":[{"nombre":"'+array_colecciones[contador]+'","alojamientos":[';
		contenido_fichero = contenido_fichero +'{"coleccion":[{"nombre":"'+array_colecciones[contador]+'","alojamientos":[';
		console.log(contenido_fichero);
		$('#coleccion'+contador+' > #alojamiento_coleccion').each(function(indice) {
			console.log($(this).text()+' Pertenece a la coleccion'+contador+' ');
			//contenido_fichero += $(this).text()+' Pertenece a la coleccion'+contador+'||';
			// contenido_fichero += $(this).text()+'||';
			console.log('mirando el elemento '+indice+'del each()');
			console.log($('#coleccion'+contador+' > #alojamiento_coleccion').length);
			if ( indice+1 === $('#coleccion'+contador+' > #alojamiento_coleccion').length){
				contenido_fichero = contenido_fichero +'{"nombre_alojamiento":"'+ $(this).text() + '", "numero":"'+ $(this).attr('numero') + '"}';
				console.log($(this).text());
				console.log($(this).attr('numero'));			
			}
			else {
				contenido_fichero = contenido_fichero +'{"nombre_alojamiento":"'+ $(this).text() + '", "numero":"'+ $(this).attr('numero') + '"},';	
			}
			console.log(contenido_fichero);
			//console.log('Esta coleccion'+array_colecciones[contador]+' tiene: '+$('#coleccion'+contador+' > #alojamiento_coleccion').length+' alojamientos asociados');

		})
		if(contador +1 === array_colecciones.length) {
			contenido_fichero = contenido_fichero + ']}]}';	
		}
		else {
			contenido_fichero = contenido_fichero + ']}]},';	
		}
		console.log(contenido_fichero);
	}
	contenido_fichero = contenido_fichero + ']}';
	console.log(contenido_fichero);
};


//FUNCIONES PARA TODAS LAS PESTAÑAS
var guardar = function () {
	//alert('HAS CLICKADO GUARDAR');
	ver_contenido_fichero();
	console.log(array_colecciones)
	var token = $('#token').val();
	var repo = $('#repo').val();
	var nombre_fichero = $('#nombre_fichero').val();
	var usu = $('#usu').val();
	console.log(token);
	console.log(repo);
	console.log(nombre_fichero);
	console.log(usu);

	github = new Github({
		token: token,
		auth: "oauth"
	});

	repositorio_objetivo = github.getRepo( usu, repo);
	repositorio_objetivo.show(function (error, repo){
		if (error) {
	 		alert('Se ha producido un error');
	 	}
	 	else {
	 		repositorio_objetivo.write('master', nombre_fichero, contenido_fichero,"Datos guardados desde la aplicación web", function(err) {
                    console.log (err)
                    alert('Fichero Guardado');
                });
 		}
 	})
}

var cargar = function() {
	//console.log('HAS CLICKADO CARGAR')
	var usu_cargar = $('#usu_carga').val();;
	var repo_cargar = $('#repo_carga').val();
	var nombre_fichero_cargar = $('#nombre_fichero_carga').val();
	var token_cargar = $('#token_carga').val();

	console.log(token_cargar);
	console.log(repo_cargar);
	console.log(nombre_fichero_cargar);
	console.log(usu_cargar);

	github = new Github({
		token: token_cargar,
		auth: 'oauth'
	});

	repositorio_objetivo = github.getRepo( usu_cargar, repo_cargar);
	repositorio_objetivo.show(function (error, repo){
		if (error) {
	 		alert('Se ha producido un error');
	 	}
	 	else {
	 			repositorio_objetivo.read('master', nombre_fichero_cargar, function(err,datos_leidos) {
	 		//	console.log(err,datos_leidos);
	 			// alert(datos_leidos);
	 			var contenido_json = datos_leidos;
	 			console.log('El contenido del fichero es: /////'+contenido_json+'/////');
	 			alert('Fichero Cargado.');
	 			var json_2_js = JSON.parse(contenido_json);
	 			console.log(json_2_js);
	 			console.log(json_2_js.colecciones.length);
	 			//console.log(json_2_js.colecciones[0].length);
	 			for (cont_colec = 0; cont_colec < json_2_js.colecciones.length; cont_colec++){
	 				console.log(json_2_js.colecciones[cont_colec]);
	 				console.log(json_2_js.colecciones[cont_colec].coleccion);
	 				console.log(json_2_js.colecciones[cont_colec].coleccion[0].nombre);
	 				nombre_coleccion_cargada = json_2_js.colecciones[cont_colec].coleccion[0].nombre;
	 				
	 				if($.inArray(nombre_coleccion_cargada, array_colecciones) === -1) {
	 					$('#colecciones_creadas').append('<div class="coleccion" id="coleccion_nueva"><div class="coleccion_nueva" id="coleccion'+j+'"><p id="nombre_coleccion_creada" onclick="desplegar_coleccion('+j+')">'+nombre_coleccion_cargada + '</p></div></div>');
						
						array_colecciones.push(nombre_coleccion_cargada);
						console.log(json_2_js.colecciones[cont_colec].coleccion[0].alojamientos);
	 					console.log(json_2_js.colecciones[cont_colec].coleccion[0].alojamientos.length);
	 					for (cont_aloj = 0; cont_aloj < json_2_js.colecciones[cont_colec].coleccion[0].alojamientos.length; cont_aloj++){
	 						console.log(json_2_js.colecciones[cont_colec].coleccion[0].alojamientos[cont_aloj].nombre_alojamiento);
	 						console.log(json_2_js.colecciones[cont_colec].coleccion[0].alojamientos[cont_aloj].numero);
	 						nombre_alojamiento_cargado = json_2_js.colecciones[cont_colec].coleccion[0].alojamientos[cont_aloj].nombre_alojamiento;
	 						numero_alojamiento_cargado = json_2_js.colecciones[cont_colec].coleccion[0].alojamientos[cont_aloj].numero;
	 						$('#coleccion'+j+' > #nombre_coleccion_creada').after('<p id="alojamiento_coleccion" onclick="mostrar_mapa_coleccion('+numero_alojamiento_cargado+','+j+')" numero="'+numero_alojamiento_cargado+'">'+ nombre_alojamiento_cargado +'</p>');

	 					}
	 					j += 1;
					}
					else {
						console.log('Ya está creada');
					}
					$('.coleccion_nueva').droppable({
						drop: function(evento, ui) {
							$(this).append('<p id="alojamiento_coleccion" onclick="mostrar_mapa_coleccion('+ui.draggable.attr('numero')+','+j+')" numero='+ui.draggable.attr('numero')+'>'+ ui.draggable.text()+'</p>');
						}
					});
	 			}
	 		})
 		}
 	})
 	
}

var leer_contenido_fichero = function (nombre_fichero_cargar, datos_fichero) {
	alert(datos_fichero);
	$.getJSON(nombre_fichero_cargar, function (datos_fichero) {
		colecciones = datos_fichero.colecciones;
		console.log(colecciones.length);
	});
}

//FUNCIONES PESTAÑA "GESTION DE ALOJADOS"

var mostrar_alojamiento_seleccionado = function (latitud_selecc, longitud_selecc, direccion_selecc, descripcion_selecc, url_web_selecc, nombre_selecc, imagen_selecc, categoria_selecc, subcategoria_selecc, id_alojamiento_selecc, telefono_selecc, fax_selecc, email_selecc) {
	console.log('Aquí se mostrará la descripción del hotel seleccionado en la pestaña principal.');
	if($('#mapa_clientes_alojados').length > 0) {
		if ($('#descripcion_selecc').length > 0 ){
			$('#descripcion_selecc').html('');
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2 style = "text-decoration: underline; font-weight: bold;font-style: oblique;">' + nombre_selecc +'</h2>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Dirección: </p><p>' + direccion_selecc + '</p>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Descripción: </p><p>' + descripcion_selecc + '</p>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Categoria: </p><p>' + categoria_selecc + '</p>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Subcategoría:</p><p> ' + subcategoria_selecc + '</p>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Teléfono: </p><p>' + telefono_selecc + '</p>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Correo Electrónico: </p><p>' + email_selecc + '</p>' +
				 '<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Página Web: </p><a href="'+url_web_selecc+'">' + url_web_selecc + '</a>' +
				 imagen_selecc);
			marcador_selecc = new L.marker([latitud_selecc,longitud_selecc])
			mapa_clientes_alojados.addLayer(marcador_selecc);
			marcador_selecc.addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'" >' + nombre_selecc + '</a><br /> <button type="button" onclick="eliminar_marcador(marcador_selecc)">Cerrar</button>')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);
		}
		else {
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2 style = "text-decoration: underline; font-weight: bold;font-style: oblique;">' + nombre_selecc + '</h2>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Dirección: </p><p>' + direccion_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Descripción: </p><p>' + descripcion_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Categoria: </p><p>' + categoria_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Subcategoría: </p><p>' + subcategoria_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Teléfono: </p><p>' + telefono_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Correo Electrónico: </p><p>' + email_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Página Web: </p><a href="'+url_web_selecc+'">' + url_web_selecc + '</a>' +
				imagen_selecc);
			marcador_selecc = new L.marker([latitud_selecc,longitud_selecc])
			mapa_clientes_alojados.addLayer(marcador_selecc);
			marcador_selecc.addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'" >' + nombre_selecc + '</a><br /> <button type="button" onclick="eliminar_marcador(marcador_selecc)">Cerrar</button>')
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
			$('#descripcion_selecc').html('<h2 style = "text-decoration: underline; font-weight: bold;font-style: oblique;">' + nombre_selecc + '</h2>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Dirección: </p><p>' + direccion_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Descripción: </p><p>' + descripcion_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Categoria: </p><p>' + categoria_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Subcategoría: </p><p>' + subcategoria_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Teléfono: </p><p>' + telefono_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Correo Electrónico: </p><p>' + email_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Página Web: </p><a href="'+url_web_selecc+'">' + url_web_selecc + '</a>' +
				imagen_selecc);
			marcador_selecc = new L.marker([latitud_selecc,longitud_selecc])
			mapa_clientes_alojados.addLayer(marcador_selecc);
			marcador_selecc.addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'" >' + nombre_selecc + '</a><br /> <button type="button" onclick="eliminar_marcador(marcador_selecc)">Cerrar</button>')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);		
		}
		else {
			$('#mapa_clientes_alojados').after('<div id="descripcion_selecc"></div>');
			$('#descripcion_selecc').html('<h2 style = "text-decoration: underline; font-weight: bold;font-style: oblique;">' + nombre_selecc + '</h2>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Dirección: </p><p>' + direccion_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Descripción: </p><p>' + descripcion_selecc +  '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Categoria: </p><p>' + categoria_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Subcategoría: </p><p>' + subcategoria_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Teléfono: </p><p>' + telefono_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Correo Electrónico: </p><p>' + email_selecc + '</p>' +
				'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Página Web: </p><a href="'+url_web_selecc+'">' + url_web_selecc + '</a>' +
				imagen_selecc);
			marcador_selecc = new L.marker([latitud_selecc,longitud_selecc])
			mapa_clientes_alojados.addLayer(marcador_selecc);
			marcador_selecc.addTo(mapa_clientes_alojados)
				.bindPopup('<a href="'+url_web_selecc+'" >' + nombre_selecc + '</a><br /> <button type="button" onclick="eliminar_marcador(marcador_selecc)">Cerrar</button>')
				.openPopup();

			mapa_clientes_alojados.setView([latitud_selecc, longitud_selecc], 16);		
		}	
	}
	$('#google_clientes').remove();
	$('.formulario_cliente').remove();
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
	$.getJSON('alojamientos.json', function (datos_alojamientos) {
		alojamientos = datos_alojamientos.serviceList.service;
		//$('#lista_alojamientos').after('<h1>' + alojamientos.length + '</h1>');
		console.log(alojamientos.length);

		var lista2 = '<p>Alojamientos en Madrid: </p>';
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
	if($.inArray(nombre, array_nombres_alojamientos) === -1) {
		$('#nombre_coleccion_creada').after('<p id="alojamiento_coleccion">'+ nombre +'</p>');
		array_nombres_alojamientos.push(nombre);
		console.log(array_nombres_alojamientos);
	}
	else {
		console.log('Ya está añadido en la colección');
	}
	
	if($('#mapa_coleccion').length >0) {
		marcador_colec = new L.marker([lat_aloj,long_aloj])
		mapa_coleccion.addLayer(marcador_colec);
			marcador_colec.addTo(mapa_coleccion)
				.bindPopup('<a>' + nombre + '</a><br /><button type="button" onclick="eliminar_marcador(marcador_selecc)">Cerrar</button>')
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
		marcador_colec = new L.marker([lat_aloj,long_aloj])
		mapa_coleccion.addLayer(marcador_colec);
			marcador_colec.addTo(mapa_coleccion)
				.bindPopup('<a>' + nombre + '</a><br /><button type="button" onclick="eliminar_marcador(marcador_selecc)">Cerrar</button>')
				.openPopup();

		mapa_coleccion.setView([lat_aloj,long_aloj], 16);
	}	
}

var crear_coleccion = function (id_alojamiento_recibido) {

	nombre_coleccion_nueva = $('input:text[name=nombre_coleccion]').val()
	if($.inArray(nombre_coleccion_nueva, array_colecciones) === -1) {
		$('#colecciones_creadas').append('<div class="coleccion" id="coleccion_nueva"><div class="coleccion_nueva" id="coleccion'+j+'"><p id="nombre_coleccion_creada" onclick="desplegar_coleccion('+j+')">'+nombre_coleccion_nueva + '</p></div></div>');
		j += 1;

		// // coleccion.push(array_colecciones);
		// // array_colecciones.push(j);
		array_colecciones.push(nombre_coleccion_nueva);
		// // console.log(coleccion);
		// // console.log(array_colecciones);
		// var num_colecciones = $('.coleccion').size();
		// console.log(num_colecciones);
		
	}
	else {
		console.log('Ya está creada');
	}
	console.log(array_colecciones);
	$('.coleccion_nueva').droppable({
			drop: function(evento, ui) {
				if($.inArray(ui.draggable.text(), array_nombres_alojamientos) === -1) {
					$(this).append('<p id="alojamiento_coleccion" onclick="mostrar_mapa_coleccion('+ui.draggable.attr('numero')+','+j+')" numero="'+ui.draggable.attr("numero")+'">'+ ui.draggable.text()+'</p>');
					array_nombres_alojamientos.push(ui.draggable.text())
					console.log(array_nombres_alojamientos);	
				}
			}
	});
}

var desplegar_coleccion = function(param) {
	
	var id_coleccion = 'coleccion'+param;
	//alert(id_coleccion);
	$('#'+id_coleccion+' > #alojamiento_coleccion').slideToggle("slow");
	//var IDpadre = $(this).parent().attr('id');
	//alert(IDpadre);
	seleccionar_coleccion(id_coleccion,param)
}

var seleccionar_coleccion = function(identificador_coleccion, num_colecc){
	//alert(identificador_coleccion);
	console.log(identificador_coleccion + ' seleccionada.');
	coleccion = [];
	if( $('.coleccion_seleccionada').length > 0 )  {
		//$('#'+identificador_coleccion+' > #nombre_coleccion_creada').removeClass('coleccion_seleccionada');
		$('#nombre_coleccion_creada').removeClass('coleccion_seleccionada');
	}
	$('#'+identificador_coleccion+' #nombre_coleccion_creada').addClass('coleccion_seleccionada');
	num_alojamientos = $('#'+identificador_coleccion+' > #alojamiento_coleccion').length;
	console.log('La coleccion tiene asociada: ' + num_alojamientos + ' alojamientos');
	//coleccion.push(identificador_coleccion);
	$('#'+identificador_coleccion+' > #alojamiento_coleccion').each(function() {
		//console.log($(this).text());
		if ($.inArray(identificador_coleccion, coleccion) === -1) {
			coleccion.push(identificador_coleccion);
			console.log(coleccion)
			if($.inArray($(this).text(), coleccion) === -1) {
				coleccion.push($(this).text());
				console.log(coleccion);	
			}
		}
		// else {
		// 	coleccion.push($(this).text());	
		// }
		console.log(coleccion);
		//ver_contenido_fichero();
		// if($.inArray(coleccion, array_colecciones) === -1) {
		// 	array_colecciones.push(coleccion);
		// 	console.log(array_colecciones);
		// }
	})
	var nombre_coleccion_seleccionada = $('.coleccion_seleccionada').text();
	if( $('#coleccion_seleccionada').length > 0 )  {
		//$('#coleccion_seleccionada').append('<p>'+($('#nombre_coleccion_creada').siblings('#alojamiento_coleccion')).text()+'<br /></p>');
		$('#coleccion_seleccionada').html('');
		$('#coleccion_seleccionada').html('Coleccion seleccionada: ');
		$('#coleccion_seleccionada').append('<p>'+nombre_coleccion_seleccionada+'</p>');
		$('.coleccion_seleccionada').siblings('#alojamiento_coleccion').each(function() {
			//$('#coleccion_seleccionada').append('<p id="alojamientos_coleccion_seleccionada" onclick="mostrar_mapa_coleccion('+$(this).attr('numero')+')">'+$(this).text()+'</p>');
			$('#coleccion_seleccionada').append('<p id="alojamientos_coleccion_seleccionada">'+$(this).text()+'</p>');
		})
	}
	else {
		$('#mapa').after('<div id="coleccion_seleccionada">Colección Seleccionada: <br />'+nombre_coleccion_seleccionada+'<div>');
		//console.log('AQUI SE METE');
		$('#coleccion_seleccionada').html('Coleccion seleccionada: ');
		$('#coleccion_seleccionada').append('<p>'+nombre_coleccion_seleccionada+'</p>');
		$('.coleccion_seleccionada').siblings('#alojamiento_coleccion').each(function() {
			//$('#coleccion_seleccionada').append('<p id="alojamientos_coleccion_seleccionada" onclick="mostrar_mapa_coleccion('+$(this).attr('numero')+')">'+$(this).text()+'</p>');
			$('#coleccion_seleccionada').append('<p id="alojamientos_coleccion_seleccionada">'+$(this).text()+'</p>');
		})
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
	var latitud = es_null(alojamiento.geoData.latitude);
	var longitud = es_null(alojamiento.geoData.longitude);
	var direccion = es_null(alojamiento.geoData.address);
	var descripcion = es_null(alojamiento.basicData.body);
	var url_web = es_null(alojamiento.basicData.web);
	var telefono = es_null(alojamiento.basicData.phone);
	var nombre = es_null(alojamiento.basicData.name);
	var email = es_null(alojamiento.basicData.email);
	var fax = es_null(alojamiento.basicData.fax);
	try {
			var imagen = mostrar_fotos(alojamiento.multimedia);	
		}catch(e) {
			if ( e.message === 'alojamiento.multimedia is null') {
	 			alert('No hay imágenes de este alojamiento')
			}
		}
		var categoria = es_null(alojamiento.extradata.categorias.categoria.item[1]['#text']);
		try{
			var subcategoria = es_null(alojamiento.extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text']);	
		}catch(e) {
			//alert(e.message);
			 if ( e.message === 'alojamiento.extradata.categorias.categoria.subcategorias is undefined') {
	 	 		console.log('ERROR: No hay subcategoría');
			}
		}
	var id_alojamiento = es_null(alojamiento['@id']);
	console.log(id_alojamiento)
	

	if($.inArray(id_alojamiento, array_coleccion) === -1) {
		array_coleccion.push(id_alojamiento);
		console.log(array_coleccion);
	}
	else {
		console.log('Ya está en la colección.');
	}

	marcador = new L.marker([latitud,longitud])
	mapa.addLayer(marcador);
	marcador.addTo(mapa)
		.bindPopup('<a href="'+url_web+'" >' + nombre + '</a><br /> <button type="button" onclick="eliminar_marcador(marcador)">Cerrar</button>')
		.openPopup()
		.on('click',function() {
			ver_info_mapa(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento, telefono, email, fax);
			
		});

	mapa.setView([latitud, longitud], 16);
	ver_info_mapa(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento, telefono, email, fax);



	if($('#mapa_coleccion').length >0) {
		marcador = new L.marker([latitud,longitud])
		mapa_coleccion.addLayer(marcador);
		marcador.addTo(mapa_coleccion)
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
		marcador = new L.marker([latitud,longitud])
		mapa_coleccion.addLayer(marcador);
		marcador.addTo(mapa_coleccion)
			.bindPopup('<a href="'+url_web+'">' + nombre + '</a><br />')
			.openPopup();

		mapa_coleccion.setView([latitud, longitud], 16);
	}	
}



//FUNCIONES PESTAÑA "PRINCIPAL"
var es_null = function (dato) {
	if(dato === null) {
		return 'Información no disponible.';
	}
	else{
		return dato;
	}
}
var mostrar_fotos = function(path_multimedia) {
	fotos_alojamiento='<div id="fotos">';
	for (var num_fotos=0; num_fotos < path_multimedia.media.length; num_fotos++) {
	    fotos_alojamiento += '<img class= "fotos" src="'+path_multimedia.media[num_fotos].url+'">';
	    console.log(fotos_alojamiento);
    }
    fotos_alojamiento += '</div>'
    return fotos_alojamiento;
}
var mostrar_alojamientos = function () {
	var alojamiento = alojamientos[$(this).attr('numero')];
	/*Cogemos sólo alguno de los datos que están en el json y los almacenamos en variables de nuestra aplicación*/
	var latitud = es_null(alojamiento.geoData.latitude);
	var longitud = es_null(alojamiento.geoData.longitude);
	var direccion = es_null(alojamiento.geoData.address);
	var descripcion = es_null(alojamiento.basicData.body);
	var url_web = es_null(alojamiento.basicData.web);
	var telefono = es_null(alojamiento.basicData.phone);
	var nombre = es_null(alojamiento.basicData.name);
	var email = es_null(alojamiento.basicData.email);
	var fax = es_null(alojamiento.basicData.fax);
	try {
		var imagen = mostrar_fotos(alojamiento.multimedia);	
	}catch(e) {
		if ( e.message === 'alojamiento.multimedia is null') {
 			alert('No hay imágenes de este alojamiento')
		}
	}
	var categoria = es_null(alojamiento.extradata.categorias.categoria.item[1]['#text']);
	try{
		var subcategoria = es_null(alojamiento.extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text']);	
	}catch(e) {
		//alert(e.message);
		 if ( e.message === 'alojamiento.extradata.categorias.categoria.subcategorias is undefined') {
 	 		console.log('ERROR: No hay subcategoría');
		}
	}
	var id_alojamiento = es_null(alojamiento['@id']);
	console.log(id_alojamiento)




	marcador = new L.marker([latitud,longitud])
	mapa.addLayer(marcador);
	marcador.addTo(mapa)
		.bindPopup('<a href="'+url_web+'" >' + nombre + '</a><br /> <button type="button" onclick="eliminar_marcador(marcador)">Cerrar</button>')
		.openPopup()
		.on('click',function() {
			ver_info_mapa(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento, telefono, email, fax);
			
		});
	ver_info_mapa(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento, telefono, email, fax);
}
 var eliminar_marcador = function (marcador) {
	mapa.removeLayer(marcador)
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
		
		$('ol li').click(mostrar_alojamientos);
	})
	$('#buscar_nombre').css({'display':'block'});
	$('#borrar_nombre').css({'display':'block'});
	$('#boton_ver_alojamientos').remove();
};

var ver_info_mapa = function(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento, telefono, email, fax) {
	

	if ($('#descripcion').length > 0) {
		$('#descripcion').remove()
		$('#mapa').after('<div id="descripcion"></div>');
	}
	else {
		$('#mapa').after('<div id="descripcion"></div>');	
	}
	
	mapa.setView([latitud, longitud], 16);
	$('#descripcion').html('<h2 style = "text-decoration: underline; font-weight: bold;font-style: oblique;">'+nombre+'</h2>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Dirección:</p><p>' + direccion + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Descripción: </p><p>' + descripcion + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Categoria: </p><p>' + categoria + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Subcategoría: </p><p>' + subcategoria + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Teléfono: </p><p>' + telefono + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Fax: </p><p>' + fax + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Correo Electrónico: </p><p>' + email + '</p>' +
		'<p style = "text-decoration: underline; font-weight: bold;font-style: oblique;">Página Web: </p><a href="'+url_web+'">' + url_web + '</a>' +
		fotos_alojamiento);
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
	mostrar_alojamiento_seleccionado(latitud, longitud, direccion, descripcion, url_web, nombre, imagen, categoria, subcategoria, id_alojamiento, telefono, email, fax);
}

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

	if (nombre_buscado !== '')
		if (valor_categoria ==='0') {
			console.log('busca por nombre');
			console.log(nombre_buscado);
		}

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


	$.getJSON('alojamientos.json', function (datos_alojamientos) {

		console.log('empieza a leer');
		alojamientos = datos_alojamientos.serviceList.service;
		console.log('hay '+alojamientos.length+' alojamientos leidos');
		if ($('#resultado_busqueda').length > 0 ) {
			$('#resultado_busqueda').remove();
			$('#buscar_alojamiento').after('<div id="resultado_busqueda"></div>');		
		}
		else {
			$('#buscar_alojamiento').after('<div id="resultado_busqueda"></div>');	
		}
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
							
							subcategoria_leida = es_null(alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text']);
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
					case '2':
						if (categoria_leida ==='Hostales') {
							subcategoria_leida = es_null(alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text']);
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
							}
							break;
						}
						break;
					case '3':
						if (categoria_leida === 'Apartahoteles') {
							$('#resultado_busqueda').empty();
							subcategoria_leida = es_null(alojamientos[j].extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text']);
							switch (valor_subcategoria) {
								case '1':
									if(subcategoria_leida === '1 llave') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '2':
									if(subcategoria_leida === '2 llaves') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '3':
									if(subcategoria_leida === '3 llaves') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
								case '4':
									if(subcategoria_leida === '4 llaves') {
										lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
									}
									break;
							}

						}
						break;
					case '4':
						if (categoria_leida === 'Residencias universitarias') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';	
						}
						break;
					case '5':
						if (categoria_leida === 'Camping') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';	
						}
						break;
					case '6':
						if (categoria_leida === 'Albergues') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';	
						}
						break;
					case '7':
						if (categoria_leida === 'Pensiones') {
							$('#resultado_busqueda').empty();
							lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';	
						}
						break;							
				}
			}
			else {
				// console.log(nombre_leido);
				// console.log('El nombre buscado es:'+nombre_buscado);
				if (nombre_leido === nombre_buscado) {
					$('#resultado_busqueda').empty();
					lista_alojamientos_encontrados = lista_alojamientos_encontrados + '<li numero='+j+'>' + nombre_leido + '</li>';
				}
				else {
					console.log('No se han encontrado coincidencias.');
				}
			}
		}
		lista_alojamientos_encontrados = lista_alojamientos_encontrados + '</ol>';
		//$('#resultado_busqueda').remove();
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
				$('#borrar_nombre').remove();
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
				$('#borrar_nombre').remove();
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
				$('#borrar_nombre').remove();
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
    					console.log('Tiene que aparecer el boton de buscar');
						$('#seleccion_categoria').after('<input id="botonBuscar" type="submit" value="Buscar" onclick="leer_formulario()" />');	
					}
    				$("#buscar_nombre").remove();
    				$('#borrar_nombre').remove();	
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
	coleccion = [];
	array_nombres_alojamientos = [];
	//fotos_alojamiento='<div id="fotos">';
	//var contenido_fichero= '';
	console.log('Lista_alojamientos: longitud = '+ $('#lista_alojamientos').length);

	/*Inicializamos el mapa*/
	mapa = L.map('mapa');
	mapa.setView([40.415556, -3.707222],10);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	 	maxZoom: 20
	}).addTo(mapa);

	
	/*Leemos todos los alojamientos llamando a la función "leer_alojamientos"*/
	$('#boton_ver_alojamientos').click(leer_alojamientos);
	if(($('div#lista_alojamientos').children('ol')).length === 0 ) {
		$('#buscar_nombre').css({'display':'none'});
		$('#borrar_nombre').css({'display':'none'});
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
	$('#enviar_formulario').click(guardar);
	$('#boton_cargar_fichero').click(cargar);
});