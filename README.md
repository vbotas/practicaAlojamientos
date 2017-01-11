##MEJORAS
  - Los formularios de carga y guardado, serán "pop-up" y mostrarán una alerta cuando se haya conseguido cargar o guardar un fichero según lo que se realice.
  - Formulario de búsqueda en la pestaña "principal" con las opciones de :
      . Búsqueda por nombre,
      . Búsqueda por categoría (hoteles, hostales...)
      . Búsqueda por subcategoría con un formulario dinámico, en función de la categoría seleccionada.
  Los resultados de la búsqueda aparecerán en una nueva zona, y todos los elementos de esa zona mostrarán la información del alojamiento cuando son clickados.


# ALOJAMIENTOS EN MADRID
La práctica consiste en la creación de una aplicación HTML5 que permita explorar los alojamientos en Madrid, construida a partir de los datos proporcionados por el propio ayuntamiento.
Se trata de mostrar los datos de la forma más atractiva posible, incluyendo una descripción, fotos, su categoría, su localización en el mapa, etc...
También se permitirá contruir colecciones personales de alojamientos, y almacenarlas de forma persistente.

##ENUNCIADO

Concretamente, la aplicación mostrará al arrancar un panel con varias pestañas.
#### En la pestaña "Principal" estarán:
    - Un banner (imagen) con el nombre y/o logotipo del sitio
    - Una zona con un mapa, donde se mostrará la localización de los hoteles seleccionados. Cuando se seleccione un hotel, se mostrará un marcador sobre el mapa con su nombre. Cada marcador tendrá una opción para quitarlo.
    - Una zona donde se mostrará una lista con todos los hoteles. Cuando arranque la aplicación, no habrá ninguno sino que en su lugar habrá un botón para cargar el fichero JSON con todos los hoteles. Como sin hoteles la aplicación no puede hacer gran cosa, hasta que la lista haya sido cargada, las demás zonas de información de los hoteles estarán desactivadas. Un vez cargado el fichero JSON, como son muchos hoteles, se mostrarán en una tabla con scroll (barra de desplazamiento) o similar.
    - Una zona donde se mostrarán, de forma similar, los hoteles de la colección seleccionada, si hay alguna.
    - Una zona donde se mostrará la información sobre el hotel seleccionado (al menos su nombre, su dirección, y su descripción, y un carrusel con sus fotos, si las hay).
    - Los hoteles podrán seleccionarse bien picando sobre ellos en la lista, o sobre su marcador en el mapa.
####En la pestaña "Gestión de colecciones" se mostrará:
    - Un listado de todos los hoteles, una vez han sido cargados, de forma similar a como se ven en la pestaña principal.
    - un listado de las colecciones que se hayan creado, y un formulario para crear una nueva colecciones indicando su nombre. Sobre el listado se podrá seleccionar una colección picando sobre ella.
    - Un listado de los hoteles en la colección seleccionada.
    
Para añadir hoteles a una coleccion, se podrá "arrastrar" un hotel desde el listado de hoteles al listado de la colección seleccionada.
####En la pestaña "Gestiñon de Alojados", se mostrará:
    - La descripción del hotel seleccionado.
    - La lista de los usuarios de Google+ asignados a ese hotel.
    - Un formulario para incluir el "id" de un usuario de Googl+, que será la forma de asignar nuevos usuarios de Google+ a un hotel.
####En todas las pestañas se verán dos botones:
    - Un botón para guardar las colecciones y las asignaciones de usuarios de Google+ a hoteles. Cuando se pulse, aparecerá un formulario para rellenar un token de GitHub y el nombre de un repositorio y un fichero, y se almacenará en él toda la información, como un documento JSON.
    - Un botón para cargar la información desde un fichero en GitHub, que cargará el contenido de un fichero JSON con colecciones y asignaciones de usuarios de Google+ a goteles, y las mostrará en esta pestaña.
    
Para la maquetación de la aplicación se utilizará Bootstrap, hacieno lo posible para que la aplicación sea usable tanto en un navegador de escritorio (con una ventana utilizable grande) como en un móvil (con una pantalla utilizable pequeña, en la que no se podrán ver todos los elementos de la aplicación a la vez). Se utilizará, en la medida de los razonable, CSS3 para todo lo relacionado con el aspecto de la aplicación. Se usará Leflet para mostrar los mapas. Se podrán utilizar otras bibliotecas JavaScript en lo que pueda ser conveniente.
El fichero JSON con la lista de hoteles que se usará será el que proporciona el Ayuntamiento de Madrid (adaptado a partir del fichero XML original).
