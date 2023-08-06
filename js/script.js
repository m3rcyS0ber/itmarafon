document.addEventListener('DOMContentLoaded', () => {
    let headerBurger = document.getElementsByClassName('header__burger')[0];
    let headerClose = document.getElementsByClassName('header__close')[0];
    let overlay = document.getElementsByClassName('overlay')[0];
    //let overlayMobile = document.getElementsByClassName('overlay__mobile')[0];
    let historyPages = document.getElementsByClassName('history__page');
    let historyIndicators = document.querySelector('.history .indicators');
    let isScrollAvailable = true;

    for(let i = 0; i <= historyPages.length-1; i++) {
        let temp = document.createElement(`span`); // <span class="indicator active" slideto="1"></span>
        temp.classList.add('indicator');
        if(i === 0) temp.classList.add('active');
        temp.setAttribute('slideto', `${i+1}`)
        temp.addEventListener('click', (evt) => {
            let toPage = evt.target;
            slideTo(toPage.getAttribute('slideto'))
        })
        historyIndicators.append(temp)
    }

    headerBurger.addEventListener('click', () => {
        overlay.classList.toggle('hidden')
        headerBurger.classList.toggle('hidden');
        headerClose.classList.toggle('hidden');
    })
    headerClose.addEventListener('click', () => {
        overlay.classList.toggle('hidden')
        headerBurger.classList.toggle('hidden');
        headerClose.classList.toggle('hidden');
    })
    window.addEventListener("wheel", evt => {
        const delta = Math.sign(evt.deltaY);
        if(isScrollAvailable) {
            isScrollAvailable = false;
            setTimeout(()=> {
                isScrollAvailable = true;
            },1000)
            if(delta === -1) {
                let prevIndicator = document.querySelector('.history .indicators .indicator.active').getAttribute('slideto');
                if(prevIndicator == 1) return false;
                slideTo(String(Number(prevIndicator)-1));
            } else if(delta === 1) {
                let prevIndicator = document.querySelector('.history .indicators .indicator.active').getAttribute('slideto');
                if(prevIndicator >= historyPages.length) return false;
                slideTo(String(Number(prevIndicator)+1));
            }
        }
    });
    document.addEventListener('touchmove' , (e)=> {
        alert('debug: '+JSON.stringify(e.targetTouches))
    })
    function slideTo(to) {

        let prevIndicator = document.querySelector('.history .indicators .indicator.active');
        let nextIndicator = document.querySelector(`.history .indicators .indicator[slideto='${to}']`)

        if(prevIndicator === nextIndicator) return false;

        if(prevIndicator) prevIndicator.classList.toggle('active');

        let prevSlide = document.querySelector('.history__tree .history__page.active');
        prevSlide.classList.toggle('active')

        nextIndicator.classList.toggle('active');
        let nextSlide = document.querySelector(`.history__tree .history__page[page='${to}']`);
        nextSlide.classList.toggle('active');
    }
})