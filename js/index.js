

const Components = {

    menu: document.querySelector('.btn-open-menu'),
    list: document.querySelector('ul.main-navigation'),
    close: document.querySelector('.btn-close-menu'),
    cards: document.querySelectorAll('.card'),
    accordins: document.querySelectorAll('.acc-heading'),
    nav: document.querySelector('nav'),
    backdiv: document.querySelector('.backdiv'),
    loadingParent: document.querySelector('.loading'),
    loading: document.querySelector('.loading svg'),
}







function onLoadAnimation(){
    //splitext

    
    new SplitText(".quote", { type: "lines", linesClass: "lineChild" });
    new SplitText(".quote", { type: "lines", linesClass: "lineParent" });
    //timeline

    const tl = gsap.timeline({defaults:{ease:Expo.Power2}});
    tl.to(Components.loadingParent, {y:'-200vh',autoAlpha:0,ease:Power2.easeInOut,duration:2.2,onComplete:removeLoading,})
    tl.from(Components.backdiv, {y:-200, autoAlpha:0,})
    tl.from(".lineChild", {y:100, stagger:.1, ease:Power2.In, duration:1});
    tl.from(".home-form", {autoAlpha:0, },"-=.5")
    tl.from(".image-container", {autoAlpha:0, }, "-=.1")
    tl.from("nav ul li", {autoAlpha:0, y:20, stagger:.01 }, "-=1")
    tl.from("nav .logo, nav .cta", {autoAlpha:0, stagger:.1 }, "-=1")
}

function removeLoading() {
    //function to eliminate loading element
    Components.loadingParent.remove()
    document.body.style.overflowY = 'visible'

}

function cardsAnimation() {
    //Cards Hover Animation
    Components.cards.forEach((card) => {
    
        const span = card.querySelector('span');
        const tl = gsap.timeline();
        tl.to(span, {clipPath:'circle(150% at 100% 100%)',ease:Power2.InOut, duration:.5});
    
        tl.pause();
        
        card.addEventListener('mouseover', () => {
            tl.play();
        })
        card.addEventListener('mouseout', () => {
            tl.reverse();
       })
    })
}


// Accordin Click Event Animation Fire
function accordinAnimation(){
    Components.accordins.forEach((accordin)=> {
   
        const accord =  accordin.querySelector('.this-btn');
        const accordChild = accord.children;
        const accordBack = accordin.querySelector('.back-this-btn');
        const tl = gsap.timeline({
            reversed: true,
            paused: true,
        });
        tl.to(accordChild, {
            y:100,
            autoAlpha:0,
            ease:Expo.easeInOut
        })
        tl.to(accord, {
            scaleY:0,
            transformOrigin:'bottom bottom',
            ease:Expo.easeInOut,
            autoAlpha:0,
        }, '-=.2');
        tl.to(accordBack, {
            scaleY:0,
            transformOrigin:'top top',
            ease:Expo.easeInOut,
            autoAlpha:0,
        })
        accordin.addEventListener('click', () => {
            tl.reversed() ? tl.play() : tl.reverse();
    })
   
})
}


//Gsap Scroll Trigger on Cards && Accordin
function scrollTrigger() { 
    gsap.from('.card', { 
        y: 100,
        autoAlpha:0,
        stagger:0.2,
        ease:Expo.easeInOut,
        scrollTrigger: {
            trigger: '.home-container',
            start: 'top top-=100',

            
        }
    });
    gsap.from('.acc-heading', { 
        y: 100,
        autoAlpha:0,
        stagger:0.1,
        ease:Expo.easeInOut,
        scrollTrigger: {
            trigger: '.faqs-accordin',
            start: 'top top+=400',
            
        }
});
}


// If window is greater than 2276px remove Wavy Background
function resizeEvent(){
    window.innerWidth > 2276 ?
    Components.backdiv.classList.add('backdiv-4k') :
    Components.backdiv.classList.remove('backdiv-4k');
    return;
}
// not in use 
function scrollNav(){
    scrollY > 200 ? 
    Components.nav.classList.add('active-nav-background') :
    Components.nav.classList.remove('active-nav-background')
}


// click 
function cardLocation() {
    Components.cards.forEach(card => {
        card.addEventListener('click', e => {
            window.location.href = 'UnderCt.html'
        })
    })
    
}

function dateNow(){
        var d = new Date();
        var n = d.getFullYear() + "  ";
        return document.querySelector(".dateNow").innerHTML = n;
}
// addEventListener('scroll', scrollNav);
addEventListener('resize', resizeEvent);
Components.menu.addEventListener('click', (event) => {Components.list.classList.add('active'); event.preventDefault()});
Components.close.addEventListener('click', (event) => {Components.list.classList.remove('active'); event.preventDefault()});
//callBack Functions 

document.addEventListener("DOMContentLoaded", function(event) {window.addEventListener("load", function(e) {onLoadAnimation();}, false);});
accordinAnimation();resizeEvent();scrollTrigger();cardsAnimation();cardLocation();
dateNow();
