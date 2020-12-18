$(document).ready(function() {

    console.log("v. 0.4 gif")

    var video_fondo = $('#video_fondo');

    var interval_buscar_height;

    var $videoSrc;  

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    $('.estudiante').click(function() {
        $videoSrc = $(this).data( "src" );
        console.log($videoSrc);
    });

    /** Reproducir video al abrir la modal */
    $('#myModal').on('shown.bs.modal', function (e) {

        var src_base = $videoSrc;
        var src_webm = $videoSrc.substr(0, $videoSrc.lastIndexOf(".")) + ".webm";

        $("#myModal .modal-body .video").remove();
        var sources_video =
            '<video controls class="w-100 video" controlsList="nodownload">'+
                '<source type="video/mp4" src="' + src_base + '"></source>' +
                '<source type="video/webm" src="' + src_webm + '"></source>'
            '</video>';

        $("#myModal .modal-body").append(sources_video);

        $("#myModal .modal-body video")[0].play();        
    })
    
    // Detener reproducción al cerrar la modal
    $('#myModal').on('hide.bs.modal', function (e) {
        $("#myModal .modal-body .video").remove();
        $("#myModal .modal-body").append('<video class="w-100 video"></video>');
    });

    // Cerrar modal al finalizar el video
    document.addEventListener('ended', function(e){
        if($(e.target).is('video')){
            $('#myModal').modal('hide');
        }
    }, true);

    /** Ajustar alto de la grilla */
    var redimensionar = function(){

        if(isMobile){
            var he =   $("#imagen_fondo").innerHeight();
            $(".grilla").first().innerHeight(  he );
            console.log("height ", he )
        }
        else{
            $(".grilla").first().innerHeight( $("#video_fondo").innerHeight() );
        }

    };

    /** Cerrar loader */
    var cerrarLoader = function (){
        setTimeout(function(){
            $(".principal").removeClass("oculto");
            $(".section--loaders").addClass("oculto");
        }, 500);        
    }

    /* Intentar cargar el ancho del video, hasta que esté disponible */
    var cargarHeight = function(){

        console.log( $("#imagen_fondo").innerHeight());

        var alto = isMobile ? $("#imagen_fondo").innerHeight() : video_fondo[0].videoHeight;

        // mostrar video y grilla sólo cuando ya se obtuvo el tamaño del video o imagen
        if(alto > 0){
            redimensionar();
            cerrarLoader();
            clearInterval(interval_buscar_height);
        }
    }
    $( window ).resize(redimensionar);

    // Detectar móviles
    if (isMobile){
        $("#imagen_fondo").attr("src", $("#data_principal").data("img"));
        redimensionar();
        $("#rotar_pantalla").show();
        console.log("mobile");
    }
    else{
        $("#video_fondo").attr("src", $("#data_principal").data("video"));
        $("#rotar_pantalla").hide();
    }
    interval_buscar_height = setInterval(cargarHeight, 100);

});
