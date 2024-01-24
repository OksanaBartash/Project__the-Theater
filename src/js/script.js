// start modal burger menu
function displayBlock() {
    let displayBox = document.querySelector(".display-box");
    let computedStyle = window.getComputedStyle(displayBox);

    if (computedStyle.display === "none") {
        displayBox.style.display = "block";
        document.body.style.overflow = "hidden";
    } else {
        displayBox.style.display = "none";
        document.body.style.overflow = "auto";
    }
}
function displayClose() {
    let displayBox = document.querySelector(".display-box");
    let computedStyle = window.getComputedStyle(displayBox);
    if (computedStyle.display === "block") {
        displayBox.style.display = "none";
        document.body.style.overflow = "auto";
    } else {
        displayBox.style.display = "block";
    }
}
//end modal burger menu
//burger menu close link start
const navItemLinks = document.querySelectorAll('.nav-item a');
const displayBox = document.querySelector(".display-box");
navItemLinks.forEach(navItemLinks => {
    navItemLinks.addEventListener('click', function () {
        let computedStyle = window.getComputedStyle(displayBox);
        if (computedStyle.display === "block") {
            displayBox.style.display = "none";
            document.body.style.overflow = "auto"
        } else {
            displayBox.style.display = "block";
        }

    });
});
//burger menu close link end
//start clearing the fields
const closeFormWindow = document.getElementById('close-form-window');
const closeSecondWindow = document.getElementById('close-second-window');
const phoneNumberInput = document.querySelector('.phone-number');
const inputName = document.querySelector('.input-name');

closeFormWindow.addEventListener('click', function () {
    phoneNumberInput.value = '';
    inputName.value = '';
});

closeSecondWindow.addEventListener('click', function () {
    phoneNumberInput.value = '';
    inputName.value = '';
});

//end clearing the fields
$(document).ready(function () {

    //theater intensive start
    const theaterIntensiveMobileSwiper = new Swiper(".theaterIntensiveMobileSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        
    });

    //thumbnail image slider
    const theaterIntensiveThumbsSwiper = new Swiper(".theaterIntensiveThumbsSwiper", {
        spaceBetween: 10,
        direction: 'vertical',
        slidesPerView: 3,
        loop: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
    });
    const theaterIntensiveDesktopSwiper = new Swiper(".theaterIntensiveDesktopSwiper", {
        spaceBetween: 10,
        thumbs: {
            swiper: theaterIntensiveThumbsSwiper,
        },
        
    });
    theaterIntensiveDesktopSwiper.on('slideChange', function () {
        let videos = document.querySelectorAll(".intensive-block-wrap-dt .swiper-slide iframe.video");    
        for (let stopVideo of videos) {
            if (stopVideo.parentElement.classList.contains("swiper-slide-active")) {
                let videoUrl = stopVideo.src;
                stopVideo.src = "";
                stopVideo.src = videoUrl;
            }
        }
    });
    //theater intensive end

    // our teachers modal start
    $('.teachers-item-btn').on('click', function (event) {
        event.preventDefault();
        let component = $(this).data('component');
        $('.modal-content').load('components/' + component + '.html', function () {
            $('#ourTeachersModal').modal({ show: true, keyboard: true });
        });
    });
    // our teachers modal end


    //--------- mainActors-SWIPER ---------
    //-- mobile-version --
    const swiperMainAct = new Swiper('.swiperMainActMob', {

        direction: 'horizontal',
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        simulateTouch: true,
        touchAngle: 45,
        slideToClickedSlide: true,

        mousewheel: {
            sentivity: 1,
            eventsTarget: ".swiper"
        },

        initialSlide: 1,

        freeMode: true,

        speed: 500,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 14,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });

    //-- desktop-version --
    let mySwiper = new Swiper
        ('#swiperMainActDesc', {
            speed: 2000,
            autoplay: {
                delay: 2300,
            },
            spaceBetween: 40,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'coverflow',
            simulateTouch: false,
            centeredSlides: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 400,
                modifier: 1,
                slideShadows: false,
            },
            slidesPerView: 3,
        })
    //-----------------------------------


    //phone number mask
    jQuery(".phone-number").inputmask({
        mask: "+38 (999) 999-99-99",
        greedy: false,
    });

    // --- modal windows start ---
    //close form window
    document.getElementById('close-form-window').addEventListener('click', () => {
        document.getElementById('form-window').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        mobileOpen == true ? scrollControllerModalMobile.enabledScroll() : scrollControllerModal.enabledScroll();
        mobileOpen = false;
    });
    //close the second window
    document.getElementById('close-second-window').addEventListener('click', () => {
        document.getElementById('second-window').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        //field clearing
        document.querySelectorAll('.registration-form input').forEach(elem => elem.value = "");
        //scroll to top of page
        function reloadAndScrollToTop() {
            const scrollPosition = window.scrollY;
            window.onload = function () {
                window.scrollTo(0, scrollPosition);
            };
        }
        location.reload(); //update
    });
    let isFormValid = false;
    let elemForCheckCaptcha;
    const lang = document.documentElement.lang;
    //validation
    document.querySelector(".check-form").addEventListener("click", (event) => {
        //function that prevents the transition to the next action
        event.preventDefault();
        const form = document.querySelector(".registration-form");
        elemForCheckCaptcha = form;
        //function to check the correctness of the entered name
        function checkProjectName() {
            let inputPrjName = form.querySelector('.input-name');
            let regexPrjName = /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ'`'']{2}[a-zA-Zа-яА-ЯїЇєЄіІґҐ\s'`''-]*$/;
            if (inputPrjName.value.trim() == "") {
                switch (lang) {
                    case 'uk':
                        inputPrjName.closest('.input-wrapper').querySelector('.error-text').textContent = "Заповніть поле";
                        break;
                    case 'en':
                        inputPrjName.closest('.input-wrapper').querySelector('.error-text').textContent = 'Fill in the field';
                        break;
                    default:
                        break;
                }
                inputPrjName.closest('.input-wrapper').querySelector('input').classList.add('error-box');
            } else if (!regexPrjName.test(inputPrjName.value)) {
                switch (lang) {
                    case 'uk':
                        inputPrjName.closest('.input-wrapper').querySelector('.error-text').innerHTML = "Поле має містити не менше двох символів, лише літери та знак \"-\"";
                        break;
                    case 'en':
                        inputPrjName.closest('.input-wrapper').querySelector('.error-text').textContent = "The field must contain at least two characters, only letters and the sign \"-\"";
                        break;
                    default:
                        break;
                }
                inputPrjName.closest(".input-wrapper").querySelector("input").classList.add("error-box");
                inputPrjName.closest(".input-wrapper").classList.add("error");
            } else {
                inputPrjName.closest('.input-wrapper').querySelector('.error-text').innerHTML = "";
                inputPrjName.closest(".input-wrapper").classList.remove("error");
                inputPrjName.closest(".input-wrapper").querySelector('input').classList.remove("error-box");
            }
            return regexPrjName.test(inputPrjName.value);
        }

        //function to check the correctness of the entered phone number
        function checkPhone() {
            let inputPhone = form.querySelector(".phone-number");
            let regexPhone = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;
            if (inputPhone.value.trim() == "") {
                switch (lang) {
                    case 'uk':
                        inputPhone.closest('.input-wrapper').querySelector('.error-text').textContent = 'Заповніть поле';
                        break;
                    case 'en':
                        inputPhone.closest('.input-wrapper').querySelector('.error-text').textContent = 'Fill in the field';
                        break;
                    default:
                        break;
                }
                inputPhone.closest(".input-wrapper").querySelector("input").classList.add("error-box");
            } else if (!regexPhone.test(inputPhone.value)) {
                switch (lang) {
                    case 'uk':
                        inputPhone.closest('.input-wrapper').querySelector('.error-text').textContent = 'Поле заповнено не коректно';
                        break;
                    case 'en':
                        inputPhone.closest('.input-wrapper').querySelector('.error-text').textContent = 'The field is filled out incorrectly';
                        break;
                    default:
                        break;
                }
                inputPhone.closest(".input-wrapper").classList.add("error");
                inputPhone.closest(".input-wrapper").querySelector("input").classList.add("error-box");
            } else {
                inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "";
                inputPhone.closest(".input-wrapper").querySelector("input").classList.remove("error-box");
                inputPhone.closest(".input-wrapper").classList.remove("error");
            }
            return regexPhone.test(inputPhone.value);
        }
        checkProjectName();
        checkPhone();
        if (checkProjectName() && checkPhone()) {
            scrollControllerModal.disabledScroll();
            isFormValid = true;
        }
    })
    // add-reCAPTCHA
    listenEntrantSubmit();
    function getElement(selector) {
        return document.querySelector(selector);
    }

    function onSubmit(event) {
        event.preventDefault();
        // submit to the server if the form is valid
        if (isFormValid) {
            grecaptcha.ready(function () {
                grecaptcha.execute('6LcwRRUaAAAAADavxcmw5ShOEUt1xMBmRAcPf6QP', { action: 'submit' }).then(function (token) {
                    if (elemForCheckCaptcha.checkValidity()) {
                        const actionUrl = 'https://intita.com/api/v1/entrant';
                        const entrantFormData = new FormData(elemForCheckCaptcha);
                        entrantFormData.append('g-recaptcha-response', token);
                        const http = new XMLHttpRequest();
                        http.open('POST', actionUrl, true);
                        http.send(entrantFormData);
                        http.onreadystatechange = function () {
                            if (+http.readyState === 4 && +http.status === 201) {
                                entrantSubmitResponse();
                            } else if (+http.status === 400) {
                                switch (lang) {
                                    case 'uk':
                                        entrantSubmitResponse('Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше');
                                        break;
                                    case 'en':
                                        entrantSubmitResponse('The server is temporary busy. Please try again later');
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        http.onload = function () {
                            if (+http.status !== 201) {
                                switch (lang) {
                                    case 'uk':
                                        entrantSubmitResponse('Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше');
                                        break;
                                    case 'en':
                                        entrantSubmitResponse('The server is temporary busy. Please try again later');
                                        break;
                                    default:
                                        break;
                                }
                                return;
                            }
                            entrantSubmitResponse();
                        }
                    }
                });
            });
        }
    }

    function listenEntrantSubmit() {
        const element1 = getElement('.check-form');
        element1.addEventListener('click', onSubmit);
    }

    function entrantSubmitResponse(errorStr) {
        const elementResponse = getElement('#second-window');
        if (getComputedStyle(elementResponse, null).display === 'none') {
            scrollControllerModal.disabledScroll();
            const elementAnketeText = getElement('.form-name-content');
            if (errorStr) {
                elementAnketeText.innerText = errorStr;
                document.getElementById('form-window').style.display = 'none';
                document.getElementById('second-window').style.display = 'flex';
            } else {
                switch (lang) {
                    case 'uk':
                        elementAnketeText.innerText = "Дякую! Ми зателефонуємо Вам найближчим часом!";
                        break;
                    case 'en':
                        elementAnketeText.innerText = "Thank you! We will call you soon!";
                        break;
                    default:
                        break;
                }
                document.getElementById('form-window').style.display = 'none';
                document.getElementById('second-window').style.display = 'flex';
            }
            elementResponse.style.display = 'block';
            document.getElementById('form-window').style.display = 'none';
            document.getElementById('second-window').style.display = 'flex';
        }
        scroll(0, 0);
    }
    // end of recaptha

});

//open form window
function openForm() {
    document.getElementById('form-window').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'flex';
    scrollControllerModal.disabledScroll();

}
let mobileOpen = false;
function openMobileForm() {
    mobileOpen = true;
    document.getElementById('form-window').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'flex';
    scrollControllerModalMobile.disabledScroll();
}
//scroll lock
const scrollControllerModal = {
    disabledScroll() {
        document.body.style.overflow = 'hidden';
    },
    enabledScroll() {
        document.body.style.overflow = '';
    },
};
const scrollControllerModalMobile = {
    scrollPosition: 0,
    disabledScroll() {
        scrollControllerModal.scrollPosition = window.scrollY;
        document.body.style.cssText = `overflow: hidden;
		 position: fixed;
		 top: -${scrollControllerModal.scrollPosition}px;
		 left: 0;
		 height: 100vh;
		 width: 100vw;
		 `;
    },
    enabledScroll() {
        document.body.style.cssText = "";
        window.scroll({ top: scrollControllerModal.scrollPosition });
    },
};
// --- modal window end ---


//loader start
let allResourcesLoaded = false;

function hideLoader() {
    let loaderImg = document.querySelector('.loader img');
    if (localStorage.getItem('loadedOnce')) {
        loaderImg.style.display = 'block';
    } else {
        loaderImg.style.display = 'none';
        localStorage.setItem('loadedOnce', true);
    }

    if (allResourcesLoaded) {
        let loader = document.getElementById('loader');
        loader.style.opacity = 0;
        setTimeout(() => {
            loader.remove();
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', hideLoader);

window.addEventListener('load', () => {
    allResourcesLoaded = true;
    hideLoader();
});

// loader end

// footer-scrol section start
$(document).ready(function () {
    // footer start
    const scrollUp = $("#footer .scroll-up");
    const offset = 100;
    const getTop = () =>
        window.pageYOffset || document.documentElement.scrollTop;
    if (scrollUp) {
        window.addEventListener("scroll", () => {
            if (getTop() > offset) {
                scrollUp.addClass("scroll-up-active");
            } else {
                scrollUp.removeClass("scroll-up-active");
            }
        });
        scrollUp.on("click", (event) => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
    // Delay the removal of the element to ensure it's available in the DOM
    let Inter;
    $(".arrow").on("mouseenter", function () {
        $(".hov-1").slideUp(300).fadeIn(100);
        $(".hov-2").slideUp(200).fadeIn(200);
        $(".hov-3").slideUp(100).fadeIn(300);
        Inter = setInterval(function () {
            $(".hov-1").slideUp(300).fadeIn(100);
            $(".hov-2").slideUp(200).fadeIn(200);
            $(".hov-3").slideUp(100).fadeIn(300);
        }, 600);
    });
    $(".arrow").on("click", function () {
        clearInterval(Inter);
    });
    $(".arrow").on("mouseleave", function () {
        clearInterval(Inter);
    });
    // footer-scrol section end
});
