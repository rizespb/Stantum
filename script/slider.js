let UIController = (function() {
    
     // Создаем объект, в котором будем хранить все строки: в случае изменения имен классов мы можем изменить значение переменной в одном месте
    let DOMStrings = {

        sliderImageClass: '.slider__image',
        sliderImageClassActive: '.slider__image--active',
        sliderMarkerClass: '.slider__marker',
        sliderMarkerClassActive: '.slider__marker--active',


        leftBtn: '#slider-arrow-left',
        rightBtn: '#slider-arrow-right',

        imageIDPrefix: 'sliderImage',
        markerIDPrefix: 'sliderMarker'
    };



    return {
        getDOMStrings: function() {
            return DOMStrings;
        }
    }
})();



let controller = (function(UICtrl) {

    // Записываем в переменную DOM объект DOMStrings из UIController
    let DOM = UICtrl.getDOMStrings();
    
    // ActiveImageID - переменная для хранения ID активного изображения и, соответственно, ID активного маркера
    let activeImageID = 0;

    // Помещаем в переменную imageNodeList селекторы изображений слайдера
    let imagesNodeList = document.querySelectorAll(DOM.sliderImageClass);

    // Переменная для хранения коллекции маркеров, которая создается в функции setupMarkers
    let markersNodeList;


    // Добавляем первому изображению класс '.slider__image--active'
    imagesNodeList[activeImageID].classList.add('slider__image--active');

    // ID активного изображения и, соответственно, ID его маркера
    let activeID = 0;

    // Получаем высоту контейнера, чтобы при переключении изображений высота не прыгала (не изменялась)
    

    ///// Добавляем маркеры изображений на страницу
    let setupMarkers = function(nodeList) {

        // Создаем переменную, в которой храним html-код добавляемого маркера
        let HTMLStringForMarker = '<span class="slider__marker" id="sliderMarker-%markerID%"></span>'
        
        // в соответствии с количеством изображений (nodeList.length) добавляем необходимое количество маркеров, заменяя %markerID% на нужную цифру
        for (let i = 0; i < nodeList.length; i++) {
            let newHTML = HTMLStringForMarker.replace('%markerID%', i);
            document.querySelector('.slider__markers-container').insertAdjacentHTML('beforeend', newHTML);
        };

        document.getElementById('sliderMarker-0').classList.add('slider__marker--active');


        // Записываем п переменную markerNodeList коллекцию маркеров
        markersNodeList = document.querySelectorAll(DOM.sliderMarkerClass);
    }



    ///// Устанавливаем обработчики событий
    let setupEventListener = function() {
        document.querySelector(DOM.leftBtn).addEventListener('click', slideLeft);
        document.querySelector(DOM.rightBtn).addEventListener('click', slideRight);


        // querySelectorAll возвращает коллекцию элементов nodeList. На коллекцию нельзя повесить обработчик событий. Поэтому мы коллекцию сохраняем в переменную MarkerNodeList. А затем с помощью цикла навешиваем на каждый элемент коллекции MarkerNodeList обработчик событий
        
        markersNodeList =  document.querySelectorAll('.slider__marker');

        for (let i=0; i < markersNodeList.length; i++) {
            markersNodeList[i].addEventListener('click', sliderMarkerControl);
        }
    };

    
    ///// Функция Стрелка ВЛЕВО - переключение изображения
    let slideLeft = function () {
        //activeImageID = parseInt(document.querySelector(DOM.sliderImageClassActive).id.split('-')[1]);

        // Удаляем класс .slider__image--active у текущего изображения и его маркера
        imagesNodeList[activeImageID].classList.remove('slider__image--active');
        markersNodeList[activeImageID].classList.remove('slider__marker--active');


        if (activeImageID === 0) {
            activeImageID = imagesNodeList.length - 1;

            imagesNodeList[activeImageID].classList.add('slider__image--active');
            markersNodeList[activeImageID].classList.add('slider__marker--active');
        } else {
            activeImageID -= 1
            imagesNodeList[activeImageID].classList.add('slider__image--active');
            markersNodeList[activeImageID].classList.add('slider__marker--active');
        }
    };


    ///// Функция Стрелка ВПРАВО - переключение изображения
    let slideRight = function () {
        // let imageContainer = document.querySelector('.slider__image-container');
        // let containerHeight = imageContainer.clientHeight;
        // imageContainer.style.height = containerHeight + 'px';

        // Удаляем класс .slider__image--active у текущего изображения и его маркера
        imagesNodeList[activeImageID].classList.remove('slider__image--active');
        markersNodeList[activeImageID].classList.remove('slider__marker--active');


        if (activeImageID === imagesNodeList.length - 1) {
            activeImageID = 0;

            imagesNodeList[activeImageID].classList.add('slider__image--active');
            markersNodeList[activeImageID].classList.add('slider__marker--active');
        } else {
            activeImageID = activeImageID + 1;

            imagesNodeList[activeImageID].classList.add('slider__image--active');
            markersNodeList[activeImageID].classList.add('slider__marker--active');
        }

        //imageContainer.style.height = 'auto';
    }


    //// Функция переключения по МАРКЕРУ
    let sliderMarkerControl = function(targetElement) {

        markersNodeList[activeImageID].classList.remove('slider__marker--active');
        imagesNodeList[activeImageID].classList.remove('slider__image--active');

        // Записываем в переменную activeImageID ID выбранного маркера (числовое значение без префикса sliderMarker)
        activeImageID = parseInt(targetElement.target.id.split('-')[1]);

        imagesNodeList[activeImageID].classList.add('slider__image--active');
        markersNodeList[activeImageID].classList.add('slider__marker--active');
    }


    return {
        activeImageIDFn: function() {
            return activeImageID;
        },

        init: function() {
            setupMarkers(imagesNodeList);
            setupEventListener();
        }
    };

})(UIController);

controller.init();