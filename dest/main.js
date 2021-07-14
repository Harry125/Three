$(document).ready(function() {
    /* Set width */
    function setWidth(a,b) {
        let wContent = $('.container').width() / 2;
        let wSlider = $('.container').innerWidth() / 2 + $('.container').offset().left;
        let Content = a.css('width', wContent);
        let Slider = b.css('width', wSlider);
    }

    let ctFeature = $('.features .content');
    let slideFeature = $('.features .slider-feature');
    let ctAbout = $('.about__item .text');
    let slideAbout = $('.about__item .images');
    let ctContact =  $('.contact__item .text');
    let slideContact = $('.contact__item .images');
 
    setWidth(ctFeature,slideFeature);
    setWidth(ctAbout,slideAbout);
    setWidth(ctContact,slideContact);

    let captionSlide = $('.features .content .ct');

    function activeCaptionSlide(index){
        captionSlide.eq(index).addClass('active').siblings().removeClass('active');
    }

    if($('.slider-feature').length) {
        let $slider = $('.features .slider-feature');
         
        $slider.flickity({
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            prevNextButtons: false,
            pageDots: false,
            imagesLoaded: true,
            lazyLoad: 2,
            on: {
                change: function(index) {
                    activeCaptionSlide(index);
                }
            }
        })
        
        $('.features .control .prev').on('click', function() {
            $slider.flickity('previous');
        })
    
        $('.features .control .next').on('click', function() {
            $slider.flickity('next');
        })
    }
    /* team */
    if($('.teams').length) {
        let $teams = $('.teams .team-wrap .list');
        $teams.flickity({
            cellAlign: 'left',
            contain: true,
            freeScroll: true,
            prevNextButtons: false,
            pageDots: false,
            imagesLoaded: true,
            lazyLoad: 2,
        })
        
        $('.teams .control .prev').on('click', function() {
            $teams.flickity('previous');
        })
    
        $('.teams .control .next').on('click', function() {
            $teams.flickity('next');
        })
    }

    $(window).on('resize',function() {
        setWidth(ctFeature,slideFeature);
        setWidth(ctAbout,slideAbout);
        setWidth(ctContact,slideContact);
    })

    /* Add background header when sroll */
    let header = $('header');
    let heightHeader = header.outerHeight();
    function changeBgHeader() {
        let postionScroll = window.pageYOffset;
        let bannerText = $('.banner .banner-text');
        let heightBannerText = bannerText.offset().top;
        if(postionScroll > heightBannerText - heightHeader) {
            header.addClass('active');
        }
        else {
            header.removeClass('active');
        }
    }

    /* Menu */
    let menus = $('header .menu li a');
    let submenus = $('footer .sub-menu li a');
    let sections = [];
    let subsections = [];

    function removeActiveMenu() {
        menus.each(function(index){
            $(this).removeClass('active');
        })
        submenus.each(function(index){
            $(this).removeClass('active');
        })
    }

    menus.each(function(index) {
        let className = $(this).attr('href').replace('#', '');
        let section = $('.' + className);
        sections.push(section);
        $(this).on('click', function(e){
            e.preventDefault();
            window.scrollTo({
                top: section.offset().top - heightHeader + 1,
            });
            removeActiveMenu();
            $(this).addClass('active');
        })
    })

    submenus.each(function(index) {
        let className = $(this).attr('href').replace('#', '');
        let subsection = $('.' + className);
        subsections.push(subsection);
        $(this).on('click', function(e){
            e.preventDefault();
            window.scrollTo({
                top: subsection.offset().top - heightHeader + 1,
            });
            removeActiveMenu();
            $(this).addClass('active');
        })
    })

    function ActiveMenu() {
        let postionScroll = $(window).scrollTop();
        $.each(sections ,function(index, value) {
            if(postionScroll > value.offset().top - heightHeader && postionScroll < value.offset().top + value.outerHeight()) {
                removeActiveMenu();
                menus.eq(index).addClass('active');
            }
            else {
                menus.eq(index).removeClass('active');
            }
        })
    }

    /* Back to top */
    //let backtotop = document.querySelector('.backtotop'); 
    let totop = $('.totop');

    function showBackToTop() {
        let postionScroll = $(window).scrollTop();
        let positionFeature = $('.features').offset().top;

        if(postionScroll > positionFeature - heightHeader) {
            totop.addClass('active');
        }
        else {
            totop.removeClass('active');
        }
    }

    function BackTopTop() {
        window.scrollTo({
            top: 0
        })
    }

    //backtotop.addEventListener('click', BackTopTop);
    totop.on('click', BackTopTop);

    let nav = $('.nav');
    let btnmenu = $('header .btnmenu');

    btnmenu.on('click', function() {
        nav.toggleClass('active');
        $(this).toggleClass('clicked');
    })

    $(window).on('scroll', function() {
        changeBgHeader();
        showBackToTop();
        ActiveMenu();
    })
})