$(document).ready(function() {
	$('#tabs').tabs();
	mapa = L.map('mapa');
	mapa.setView([40.415556, -3.707222], 10);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);
});


var leer_alojamientos = function() {
	$.getJSON('alojamientos.json', function(datos_alojamientos) {
		$('#ver_alojamientos').html('');
		$('#lista_alojamientos').after('<h1>' + datos_alojamientos.serviceList.service.length + '</h1>');
		console.log(datos_alojamientos.serviceList.service.length);

		var lista = '<p>Alojamientos encontrados: ' + datos_alojamientos.serviceList.service.length;
		lista = lista + '<ul>';
		for (var i = 0; i < datos_alojamientos.serviceList.service.length; i++) {
			lista = lista + '<li numero='+i+'>' + datos_alojamientos.serviceList.service.length[i].basicData.name + '</li>';
		}
		lista = lista + '</ul>';
		$('#lista_alojamientos').html(lista);
		$('li').on('click', function(){
			console.log('hola');
		});
	});
};