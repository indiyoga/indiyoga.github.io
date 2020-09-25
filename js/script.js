// эта команда, пишется чтобы какой- либо дальнейший скрипт выполнялся только после полной загрузки страницы
// window.addEventListener ('load')

// но если вся страница загружена а какая- нибудь картинка большая и грузится очень долго
// тогда надо загрузить только структуру страницы а кртинки догрузятся потом.
// на первом экране  не работает меню (ЭТО ТАБЫ)
window.addEventListener('DOMContentLoaded', function() {
 // получим элементы прописанные в info-header, 46,52 строки HTML 
    'use strict'; /*переводим код в строгий режим*/
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    // теперь нам надо скрыть лишние картинки и информацию в блоке и при переключении меню
    // должна показываться только нужная инфа а остальные скрываться? делаем для первой
    function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show'); /*удаляем видимые, затем скрываем*/
        tabContent[i].classList.add('hide');
        }
    }
    // предаем а=1 т.е. 0 элемент массива будет виден, а остальные скроются
    hideTabContent(1);

    // здесь для других
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide'); /*тут делаем наоборот*/
            tabContent[b].classList.add('show');
        }
    }
    // будем дилегировать события для обработки каждой кнопки
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            // определяем связь пункта меню ОТДЫХ с АНТИСТРЕСС а ПРИРОДА с ВОССТАНОВЛЕНИЕ и т.д.
            for (let i=0; i<tab.length; i++) {
                if (target == tab[i]) {
                // скрываем все табы
                hideTabContent(0);
                // показываем в соответствии найденныйм соответствием
                showTabContent(i);
                // останавливаем
                break;
                }
            }
        }
    });

     // =================Timer ======================
     function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          total: t,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        };
      }
      
      function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector(".days");
        var hoursSpan = clock.querySelector(".hours");
        var minutesSpan = clock.querySelector(".minutes");
        var secondsSpan = clock.querySelector(".seconds");
      
        function updateClock() {
          var t = getTimeRemaining(endtime);
      
          if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = '2020-11-24'
              
      
          //   new Date(Date.parse(new Date()) + 1600 * 1000);
            initializeClock('countdown', deadline);
            
          }
      
          document.getElementById('countitle').innerHTML = "до конца акции осталось:"; 
      
          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
          minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
          secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        }
      
        
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
      }
      
      var deadline = 0;
      // new Date(Date.parse(new Date()) + 0 * 1000);
      
      initializeClock("countdown", deadline);





    // =======================modal window======================
    // HTML  строка overlay -описывает модальное окно, надо его вызвать 
    // через класс more, описанный в кнопке "Узнать больше" HTML 
    // и через кнопку закрытия popup-close HTML 

    let more = document.querySelector('.more'),
        dbtn = document.querySelector('.description-btn'),/** */
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    // при нажатии на кнопку more - Узнать больше" появляется модальное окно
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        // можно запретить прокрутку страницы, пока висит модальное окно
        document.body.style.overflow = 'hidden';
    });
     // при нажатии кнопки close - крестик, оно исчезает и разрешаем дальнейшую прокрутку страницы
     close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

// кнопки "Узнать подробнее" в первом окне description-btn HTML 93   
        dbtn.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            // можно запретить прокрутку страницы, пока висит модальное окно
            document.body.style.overflow = 'hidden';
        });
    // });

    // =======================Forms======================
    // ответы сервера
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };
    // пременные со страницы строки 218, 149, 177, и помещаем в новый div
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
    // вешаем обработчик событий на форму
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);
    // отправляем данные, используя  файл PHP
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        // request.setRequestHeader('Content-type', 'application/json; x-www-form-urlencoded');
    // достаем данные из заполненной пользователем формы
        let formData = new FormData(form);
        // request.send(formData);
        //  после этой команды  идем в консоль во вкладку Network и видим отправляемую информацию
    // для того, чтобы  передать данные в формате JSON
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);
    // всего 4 состояния сервера, о них было в AJAX
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;                      /*загрузка */
            } else if(request.readyState === 4 && request.status == 200) {      /* обработка */
                statusMessage.innerHTML = message.success;                      /* сообщение в случае успеха */
            } else {
                statusMessage.innerHTML = message.failure;                      /* что- то не так */
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
    // ========================Slider========================================
    // <div class="slider" id="photo"> 116 строка HTML, 119 -wrap, 121-125 -фото, 134-135-стрелки, 
   // 137-142-точки, все это пропишем в пременных
    let slideIndex = 1, /* индекс - текущий слайд, изначально первый */
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'), /* обертка точек */
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex); /* показать слайд с индексом */
    // функция, которая скрывает все слайды и показывает нужный
    function showSlides(n) {
    // проверяем кол-во слайдов, если закончились- показываем первый или в обратную наоборот
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        /* верхняя запись более современна, но можно записать более понятно
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        */
        dots.forEach((item) => item.classList.remove('dot-active')); /* срываем все */

        slides[slideIndex - 1].style.display = 'block'; /* показываем слайд, который надо(-1 для массива) */
        dots[slideIndex - 1].classList.add('dot-active'); /* то же самое для точек */
    }
    // увеличиваем индекс слайда и сразу показываем
    function plusSlides(n) {
        showSlides(slideIndex += n); 
    }
    // определяем текщий слайд и показываем его
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    // используем данные функции при нажатии стрелок
    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    // 
    next.addEventListener('click', function() {
        plusSlides(1);
    });
    // а здесь обрабатываем точки
    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
    // ========================calculator=========================


    const startPrice = 12000;

    // можно изменить в зависимости от количества:new Array(['>=1', 150], ['>=3', 200], ['>=5', 250]);
    // const firstInputStep = new Array(['>=1', 150]);
    // const secondInputStep = new Array(['>=1', 200]);
    
    let firstSlider,
        secondSlider,
        a,
        b;
 
    const persons = document.getElementById('persons'),
          days = document.getElementById('days'),
          place = document.getElementById('select'),  
          totalValue = document.getElementById('total');
    
    init();
    addListeners();
    calculatePrice();
    //  количество людей ( в зависимости от номера 1-4 мест)
    function init () {
      
      firstSlider = noUiSlider.create(document.getElementById('first-slider'), {
        start: [1],
        connect: true,
        tooltips: [true],
        step: 1,
        range: {
            'min': 1,
            'max': 4
        }
      });
      // количество суток  от 3 до 20
      secondSlider = noUiSlider.create(document.getElementById('second-slider'), {
        start: [1],
        connect: true,
        tooltips: [true],
        step: 1,
        range: {
            'min': 3,
            'max': 21
        }
      });

    }
    
    function addListeners () {
      firstSlider.on('slide', calculatePrice);
      secondSlider.on('slide', calculatePrice);
    }
    
    function calculatePrice () {
      const firstValue = firstSlider.get(),
            secondValue = secondSlider.get(),
    // единичная сумма
        cost= 4000;
    
        persons.innerText = `Количество человек:  ${firstValue}`;
        days.innerText = `Количество дней: ${secondValue}`;
        totalValue.innerText = `Стоимость: ${firstValue*secondValue*cost}`;
        a = `${firstValue*secondValue*cost}`;
    }

    place.addEventListener('change', function() {
        b = this.options[this.selectedIndex].value;
        totalValue.innerText = `Стоимость: ${a*b}`;
    
    });

});
