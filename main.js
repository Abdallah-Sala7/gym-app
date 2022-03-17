let headerLi = document.querySelectorAll('.header .container ul li'),
    navHeader = document.querySelector('.header'),
    sections = document.querySelectorAll('.section'),
    opeenMenu = document.querySelector('.header .phone-menu'),
    ulHeader = document.querySelector('.header .container ul '),
    ProgramSection = document.querySelector('.programs'),
    activeLi = document.querySelector('ul li.active'),
    homeSection = document.querySelector('.home'),
    planSection = document.querySelector('.plan-section'),
    aboutSection = document.querySelector('.about-section');
    // programToTop = window.pageYOffset + ProgramSection.getBoundingClientRect().top,
    // planToTop = window.pageYOffset + planSection.getBoundingClientRect().top,
    // aboutToTop = window.pageYOffset + aboutSection.getBoundingClientRect().top


window.addEventListener('scroll',()=>{
    window.scrollY > 100 ? navHeader.classList.add('active'): navHeader.classList.remove('active');

    // if (window.scrollY < programToTop) {
    //     document.querySelector('ul li.active').classList.remove('active');
    //     document.querySelector('ul .home-li').classList.add('active')
    // }else if (window.scrollY > programToTop && window.scrollY < planToTop +1 ) {
    //     document.querySelector('ul li.active').classList.remove('active');
    //     document.querySelector('ul .programs-li').classList.add('active')
    // }else if (window.scrollY > planToTop-1 && window.scrollY < aboutToTop ) {
    //     document.querySelector('ul li.active').classList.remove('active');
    //     document.querySelector('ul .plan-section-li').classList.add('active')
    // }else if(window.scrollY > aboutToTop +1){
    //     document.querySelector('ul li.active').classList.remove('active');
    //     document.querySelector('ul .about-section-li').classList.add('active')
    // }

    if (window.scrollY < ProgramSection.offsetTop - 20) {
        document.querySelector('ul li.active').classList.remove('active');
        document.querySelector('ul .home-li').classList.add('active')
    } else if (window.scrollY >= ProgramSection.offsetTop - 20 && window.scrollY < planSection.offsetTop - 20) {
        document.querySelector('ul li.active').classList.remove('active');
        document.querySelector('ul .programs-li').classList.add('active')
    }
    else if (window.scrollY >= planSection.offsetTop -20 && window.scrollY < aboutSection.offsetTop -20) {
        document.querySelector('ul li.active').classList.remove('active');
        document.querySelector('ul .plan-section-li').classList.add('active')
    }else if (window.scrollY >= aboutSection.offsetTop-10) {
        document.querySelector('ul li.active').classList.remove('active');
        document.querySelector('ul .about-section-li').classList.add('active')
    }

})

headerLi.forEach((e)=>{
    e.addEventListener('click', ()=> {
        // document.querySelector('.header .container ul li.active').classList.remove('active')
        // e.classList.add('active')
        let target = e.dataset.filter;
        sections.forEach((sec)=>{
            if (sec.classList.contains(target)) {
                sec.scrollIntoView({
                behavior:'smooth'
            })
            }
            
        })
    })
})

opeenMenu.addEventListener('click',()=>{
    opeenMenu.classList.toggle('active')
    ulHeader.classList.toggle('active')
})




let trainnerInfo = document.querySelector('.trainner-info'),
    testimonialsImgBox = document.querySelector('.testimonials-img-box'),
    testimonialsDesc = document.querySelector('.testimonials-desc');

TestimonialChange = () =>{
    fetch('./api.json').then(res => res.json()).then( data =>{
        data.map(item => {
            testimonialsImgBox.innerHTML += `
                <img class="img ${item.active}" src="${item.img}" alt="" data-id='${item.id}'>
            `
        })
        let index = 0;
        changeDisc()

        document.querySelectorAll('.img').forEach((e)=>{
            e.addEventListener('click',()=>{
                document.querySelector('.img.active').classList.remove('active')
                e.classList.add('active')
                index = parseInt(e.dataset.id - 1)
                console.log(index + 1);
                changeDisc();
            })
        })

        function changeDisc() {trainnerInfo.innerHTML = `
            <div class="testimonials-trainner">
                <h3 class="trainner-name">${data[index].name}</h3>
                <span class="trainner-job">${data[index].job}</span>
                <div class="trainner-rate">
                    ${
                        Array(Math.round(data[index].rate)).fill().map(() =>{
                            return `
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                            `
                        })
                    }
                </div>
            </div>
            <img src="${data[index].img}" alt="" class="trainner-img">
        `
        testimonialsDesc.innerHTML = `
         ${data[index].text}
        `}
    })
    
}

TestimonialChange();