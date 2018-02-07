( function( $ ) {
    "use strict";

    var CASULO = window.CASULO || {};
    /*-------------------------------------------------------------------*/
    /*      Remova o carregador de página para o DOM
    /*-------------------------------------------------------------------*/

    CASULO.pageLoader = function(){

        setTimeout(function() {

            $('#loader-wrapper').fadeOut(1000, function(){
                $(this).remove();
            });

        }, 400);
    },
    /*-------------------------------------------------------------------*/
    /*      textrotator
    /*-------------------------------------------------------------------*/
    
    CASULO.textrotator = function(){
        
        $(".rotate").textrotator({
        animation: "dissolve",
        separator: ",",
        speed: 2500
    });

    },

    /*-------------------------------------------------------------------*/
    /*      Count
    /*-------------------------------------------------------------------*/
    
    CASULO.Count = function(){
        
        $('.countdown').downCount({
        date: '02/09/2018 00:00:00' // m/d/y
    });

    },
    /*-------------------------------------------------------------------*/
    /*      backstretch
    /*-------------------------------------------------------------------*/

    CASULO.backstretch = function(){

        $(".main").backstretch([
        "img/home-01.jpg",
        "img/home-02.jpg",
        "img/home-03.jpg"
        
    ], {
        fade: 750,
        duration: 5000
    });

    },    
    /*-------------------------------------------------------------------*/
    /*      Popup Scritps
    /*-------------------------------------------------------------------*/

    CASULO.magnificPopup = function(){

        // abri image
        $('.zoom').magnificPopup({
            type: 'image'
        });
    },
    /*-------------------------------------------------------------------*/
    /*      Substitua cada seleção por um menu suspenso personalizado
    /*-------------------------------------------------------------------*/

    CASULO.selectReplacer = function(){

        $('select').each(function() {
            var $select = $(this),
                $ul = $('<ul></ul>').addClass('select-replacer'),
                $hiddenInput = $('<input type="hidden" name="' + $select.attr('name') + '" value="' + $select.val() + '">');

            $select.after($ul);
            $ul.after($hiddenInput);

            $select.children('option').each(function(){
                var $that = $(this),
                    $li = $('<li data-value="' + $that.val()+'">' + $that.text() + '</li>');
                if ( $that.attr('class') != undefined ) {
                    $li.addClass($that.attr('class'));
                }
                $ul.append($li);
            });

            $ul.children('li').not(':first').hide();

            $ul.children('li').on('click',function(){
                var $clickedLi = $(this),
                    dataValue = $clickedLi.data('value');
                $clickedLi.prependTo($ul.toggleClass('open')).nextAll().toggle();
                $hiddenInput.val(dataValue);
                $('.hidden-field').removeClass('show').find('input').removeClass('required');
                $('#' + $clickedLi.attr('class')).addClass('show').find('input').addClass('required');
            });

            $select.remove();

            //feche a lista clicando fora dela
            $(document).on('click',function(e){

                if ( ! $ul.find(e.target).length ) {
                    $ul.removeClass('open').children('li').not(':first').hide();

                }

            });

        });

    },

    /*-------------------------------------------------------------------*/
    /*      Layout do Album
    /*-------------------------------------------------------------------*/

    CASULO.portfolio = {

        init : function(){

            this.layout();
            this.infoItems();
        },

        // construir o layout do portfólio
        layout : function(){

            $('.works').imagesLoaded( function() {
                $('.works').isotope();
            });

        },

        // abrir / fechar informações do item do portfólio
        infoItems : function(){

            $('.info-link').on('click',function(e){
                e.preventDefault();

                var $that = $(this),
                    $extraItem = $that.parents('.work-thumb').next('.info-work');

                if ($extraItem.length > 0) {
                    $extraItem.slideToggle( 200, function(){
                        $(this).parents('.work').toggleClass('opened');
                        $('.works').isotope('layout');
                    });
                }

            });

        }

    },

    /*-------------------------------------------------------------------*/
    /*      Menu móvel
    /*-------------------------------------------------------------------*/

    CASULO.mobileMenu = {

        init : function(){

            this.toggleMenu();
            this.addClassParent();
            this.addRemoveClasses();

        },

        // alternar menu móvel
        toggleMenu : function() {

            var self = this,
                $body = $('body');

            $('#nav-toggle').click(function(e){
                e.preventDefault();

                if ( $body.hasClass('open') ) {
                    $body.removeClass('open');
                    $('#nav-menu').find('li').removeClass('show');
                } else {
                    $body.addClass('open');
                    self.showSubmenu();
                }

            });

        },

        // adicione a classe 'pai' se um item da lista contiver outra lista
        addClassParent : function() {

            $('#nav-menu').find('li > ul').each(function(){
                $(this).parent().addClass('parent');
            });

        },

        // adicionar / remover classes para uma certa largura da janela
        addRemoveClasses : function() {

            var $nav = $('#nav-menu');

            if ( $(window).width() < 992 ) {
                $nav.addClass('mobile');
            } else {
                $('body').removeClass('open');
                $nav.removeClass('mobile').find('li').removeClass('show');
            }

        },

        // mostrar submenu
        showSubmenu : function() {

            $('#nav-menu').find('a').each(function(){

                var $that = $(this);

                if ( $that.next('ul').length ) {
                    $that.one('click', function(e) {
                        e.preventDefault();
                        $(this).parent().addClass('show');
                    });
                }

            });

        }

    },

    /*-------------------------------------------------------------------*/
    /*      Forms
    /*          1. Email Validador Function
    /*          2. Form Processamento
    /*          3. fecha Form Messagem
    /*-------------------------------------------------------------------*/

    CASULO.forms = function(){

        /* 1. Email validator
        /*-------------------------------------------------------------------*/
        var emailValidator = function(email){

            var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            var valid = emailReg.test(email);

            return valid;
        };

        /* 2. Form Processamento
        -------------------------------------------------------------------*/
        // Add form messagem container
        $('form').append('<div class="form-msg" style="display:none"><span></span><a href="#"></a></div>');

        $('form').submit(function(e){
            e.preventDefault();

            var $that = $(this),
                checkEmpty = false,
                formMessages = config.formMessages,
                $msgForm = $that.find('.form-msg'),
                $msgText = $msgForm.find('span'),
                emailField = $that.find('input[name="email"]').val(),
                postData = $that.serialize();

            $msgForm.removeClass('fail success');
            $msgText.text('');

            // Verifique se todos os campos não estão vazios
            $that.find('.required').each(function() {
                if($.trim($(this).val()) === '' || $(this).is(':checkbox:not(:checked)') ) {
                    checkEmpty = true;
                }
            });

            // Pare tudo se houver pelo menos um campo vazio
            if ( checkEmpty ) {
                $msgText.text(formMessages.emptyFields).parent().addClass('fail').fadeIn('fast');
                return false;
            }

            // Verifique se o e-mail é válido. Caso contrário, pare tudo
            if ( ! emailValidator(emailField) ) {
                $msgText.text(formMessages.failEmail).parent().addClass('fail').fadeIn('fast');
                return false;
            }

            $that.find('.submit').after('<span class="form-loader" />');

            // Enviar dados para o arquivo de processamento correspondente
            $.post($that.attr('action'), postData, function(result){
                if (result == 'success') {
                    $msgText.text(formMessages.sent);               // successo
                    $that.trigger('reset');                         // redefinir todos os campos do formulário
                } else {
                    $msgText.text(formMessages.fail);               // erro
                }
            }).fail(function() {
                $msgText.text(formMessages.fail);                   // erro (problema com o envio de dados)
            }).always(function(result) {
                $that.find('.form-loader').remove();
                $msgForm.addClass(result).fadeIn('fast');           // mostrar mensagem de formulário
            });

        });

        /* 3. fecha form messagens
        -------------------------------------------------------------------*/
        $(document).on('click','.form-msg a', function(){

            $(this).parent().fadeOut();

            if ( $('.form-msg').hasClass('success') ) {
                $.magnificPopup.close();
            }

            return false;
        });

    };
    /*-------------------------------------------------------------------*/
    /*      Scroll
    /*-------------------------------------------------------------------*/
    CASULO.scrollTop = function(){

    $('.scrollup').click(function(){
    $("html, body").stop().animate({ scrollTop: 0 }, 2000);
    return false;
        });
    
    };

    CASULO.scrolldown = function(){

    $('.scrolldown a').click(function(){
    $('html , body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 80
    }, 2000);
    return false;
        });

    },
    /*-------------------------------------------------------------------*/
    /*      Sticky Menu
    /*-------------------------------------------------------------------*/

    CASULO.stickyMenu = function(){

        if ($(window).scrollTop() > 50) {
            $('body').addClass('sticky');
        } else {
            $('body').removeClass('sticky');

        }

    },
    /*-------------------------------------------------------------------*/
    /*      Icializar todas as functions
    /*-------------------------------------------------------------------*/

    $(document).ready(function(){

        CASULO.magnificPopup();
        CASULO.forms();
        CASULO.selectReplacer();
        CASULO.mobileMenu.init();
        CASULO.portfolio.init();
        CASULO.textrotator();
        CASULO.Count();
        CASULO.backstretch();
    });

    // scripts de carregamento de janela
    $(window).load(function() {
        
        CASULO.pageLoader();
    });

     // Janela redimensionar scripts
    $(window).resize(function() {
        
        CASULO.portfolio.layout();
        CASULO.mobileMenu.addRemoveClasses();

    });
    
    // window scroll scripts
    $(window).scroll(function() {
        
        CASULO.stickyMenu();
        CASULO.scrollTop();
        CASULO.scrolldown();
    });
} )( jQuery );