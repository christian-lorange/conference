class Entity
    constructor: (@template, @container) ->
        @fetch()

    attach: (data) ->
        @container.append(@template(data))
        @container.trigger('create')

    fetch: ->
        $('#loader').show()
        self = this
        request = $.get @url, (json) ->
            self.attach({items: json})
        request.complete ->
            $('#loader').hide()


class Noticias extends Entity
    url: 'http://phpconf.aws.af.cm/noticias'

class Palestrantes extends Entity
    url: 'http://phpconf.aws.af.cm/palestrantes'

class Dia1 extends Entity
    url: 'http://phpconf.aws.af.cm/agenda/2012-11-30'

class Dia2 extends Entity
    url: 'http://phpconf.aws.af.cm/agenda/2012-12-01'

class Tweets extends Entity
    url: 'http://phpconf.aws.af.cm/tweets'

class Palestra extends Entity
    constructor: (@template, @container, @url) ->
        @fetch()

class Marker
    constructor: (map, latlng, title, icon) ->
        marker = new google.maps.Marker(
            position: latlng,
            map: map
            title: title
            animation: google.maps.Animation.DROP
            icon: icon
        )

        infowindow = new google.maps.InfoWindow(content: title)
        google.maps.event.addListener marker, "click", ->
            infowindow.open map, marker

class Map
    constructor: (@lat, @lng) ->
        options = {
            zoom: 14,
            center: new google.maps.LatLng(@lat, @lng),
            overviewMapControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_TOP
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        @map = new google.maps.Map document.getElementById('map_canvas'), options
        @resize()
        navigator.geolocation.getCurrentPosition (position) -> 
            userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            @map.setCenter(userLocation)

        new Marker @map, new google.maps.LatLng(-23.540855, -46.768198), 'UNIFIEO - PHP Conference Brasil', 'img/maps-target.png'
        new Marker @map, new google.maps.LatLng(-23.536600, -46.783009), 'Best Western Osasco Hotel', 'img/maps-hotel.png'
        new Marker @map, new google.maps.LatLng(-23.531298, -46.774128), 'David Plaza Hotel', 'img/maps-hotel.png'
        new Marker @map, new google.maps.LatLng(-23.530611, -46.781658), 'San Jose Palace Hotel', 'img/maps-hotel.png'
        new Marker @map, new google.maps.LatLng(-23.425253, -46.451321), 'Guarulhos International Airport', 'img/maps-airport.png'
        new Marker @map, new google.maps.LatLng(-23.628796, -46.659069), 'Congonhas Airport', 'img/maps-airport.png'

    resize: ->
        $('#map_canvas').height($(window).height())
        $('#map_canvas').width($(window).width())
        google.maps.event.trigger(@map, 'resize')

Handlebars.registerHelper "raw", (text) ->
    new Handlebars.SafeString(text)

$(document).bind "mobileinit", ->
  $.extend $.mobile,
    defaultPageTransition: "slide"

$ ->
    $('#noticias').live 'pageinit', (event) ->
        new Noticias Handlebars.templates['noticias-list'], $('#noticias-list')

    $('#palestrantes').live 'pageinit', (event) ->
        new Palestrantes Handlebars.templates['palestrantes-list'], $('#palestrantes-list')

    $('#dia1').live 'pageinit', (event) ->
        new Dia1 Handlebars.templates['agenda-list'], $('#dia1-list')

    $('#dia2').live 'pageinit', (event) ->
        new Dia2 Handlebars.templates['agenda-list'], $('#dia2-list')

    $('#tweets').live 'pageinit', (event) ->
        new Tweets Handlebars.templates['tweets-list'], $('#tweets-list')

    $('#mapa').live 'pageinit', (event) ->
        new Map -23.540855, -46.768198

    $('.palestra').live 'click', (event) ->
        id = $(this).attr('name')
        $('#palestra-show').html('')
        new Palestra Handlebars.templates['palestra-show'], $('#palestra-show'), "http://phpconf.aws.af.cm/palestras/#{id}"
        $.mobile.changePage($('#palestra'));