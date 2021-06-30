const Components = {
    menu: document.querySelector('.btn-open-menu'),
    list: document.querySelector('ul.main-navigation'),
    close: document.querySelector('.btn-close-menu'),
    nav: document.querySelector('nav'),
    loadingParent: document.querySelector('.loading'),
    loading: document.querySelector('.loading svg'),
    coursesLinks:document.querySelectorAll('.breadCrumb a'),
    pOfCourses:document.querySelector('.courses-header-content p'),
    rootVar: document.querySelector(':root'),
    sectCourses:document.querySelectorAll('.sect-01'),
    disLinks: document.querySelectorAll('.disbtn'), 
    registerLinks: document.querySelectorAll('.regButton'),
    modPop: document.querySelector('.regFormParent'),
    regmain: document.querySelector('.regmain'),
    courseTitle: document.querySelector('.c-title'),
    cMove: document.querySelector('.c-move'),
    modalClose:document.querySelector('.mdl-close'),
    shareui:document.querySelector('.share-ui'),
    shareBtns:document.querySelectorAll('.share-btn'),
    courseValue: document.querySelector('.courseValue'),
    successAlert: document.querySelector('.succes-alert'),
    FormBtn: document.querySelector('.s-btn'),
}
const tl = gsap.timeline({defaults:{ease:Expo.Power2}});

function onLoadAnimation(){
    //splitext
    new SplitText(".quote", { type: "lines", linesClass: "lineChild" });
    new SplitText(".quote", { type: "lines", linesClass: "lineParent" });
    //timeline
    tl.to(Components.loadingParent, {y:'-200vh',autoAlpha:0,ease:Power2.easeInOut,duration:1.5,onComplete:removeLoading,})
    tl.from(".lineChild", {y:100, stagger:.1, ease:Power2.In, duration:1});
    tl.from(Components.pOfCourses, {autoAlpha:0,y:20})
    tl.from(Components.cMove, {scale:0})
    tl.from("nav ul li", {autoAlpha:0, y:20, stagger:.01 }, "-=1")
    tl.from("nav .logo, nav .cta", {autoAlpha:0, stagger:.1 }, "-=1")
    tl.from(Components.coursesLinks, {autoAlpha:0,stagger:.1,y:-20,onComplete: () => gsap.set(Components.coursesLinks, {clearProps:'y'})})

}
onLoadAnimation();



function removeLoading() {
    //function to eliminate loading element
    Components.loadingParent.remove()
    document.body.style.overflowY = 'visible'

}

function discusFunc() {
    Components.disLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            let nextElementText = link.nextElementSibling.textContent;
            window.open(`https://wa.me/923003353095?text=Hi, I'm Intrested in ${nextElementText} Course And want to Discuss About it.`);
            e.preventDefault();
        })
    })
}



function registerFunc() {
    Components.registerLinks.forEach(rlink => {
        rlink.addEventListener('click', (event) => {
            tl.to(Components.modPop, {scale:1,ease:Expo.easeInOut})
            let nextElementeText = rlink.nextElementSibling.nextElementSibling.textContent;
            Components.courseValue.value = nextElementeText;
            Components.courseTitle.textContent = `${nextElementeText}`;
            event.preventDefault();
        })
    })
    Components.modalClose.addEventListener('click', (event) => {
        tl.to(Components.modPop, {scale:0, ease:Expo.easeInOut})
        tform.reverse();
        event.preventDefault();
    })

 


}


let tform = gsap.timeline();
tform.pause(true);

tform.to(Components.regmain, {autoAlpha:0,})
tform.to(Components.regmain, {display:'none',})
tform.to(Components.successAlert, {display:'flex'})
tform.to(Components.successAlert, {autoAlpha:1})
tform.to(Components.successAlert, {scale:1})

function emailWorkAround() {
   
    emailjs.init('user_FZbLPdUUuRphq0FCxBijP');
    Components.regmain.addEventListener('submit', (event) => {
        event.preventDefault();
        
        emailjs.sendForm('service_alisra3397','template_junf2b2',Components.regmain)
            .then(function() {
                tform.play();
                Components.FormBtn.style.background = 'chartreuse'
            }, function(error) {
                Components.FormBtn.style.background = 'red'
            });
    });
}

emailWorkAround();
registerFunc();discusFunc();

Components.menu.addEventListener('click', (event) => {Components.list.classList.add('active'); event.preventDefault()});
Components.close.addEventListener('click', (event) => {Components.list.classList.remove('active'); event.preventDefault()});
function dateNow(){
    const date = new Date();
    const Dateyear = date.getFullYear() + "  ";
    return document.querySelector(".dateNow").textContent = `${Dateyear}`;
}
dateNow();
