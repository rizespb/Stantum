let UIController = (function() {
    
     // Создаем объект, в котором будем хранить все строки: в случае изменения имен классов мы можем изменить значение переменной в одном месте
    let DOMStrings = {
        sliderImageClass: '.slider__image',
        sliderImageClassActive: '.slider__image--active',
        leftBtn: '#slider-arrow-left',
        rightBtn: '#slider-arrow-right',
        sliderMarker: '.slider__marker',

        imageIDPrefix: 'sliderImage'
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
    
    // ActiveImageID - переменная для хранения ID активного изображения
    let activeImageID;

    // Помещаем в переменную imageNodeList селекторы изображений слайдера
    let imagesNodeList = document.querySelectorAll(DOM.sliderImageClass);


    // Добавляем первому изображению класс '.slider__image--active'
    imagesNodeList[0].classList.add('slider__image--active');


    // Добавляем маркеры изображений на страницу
    let setupMarkers = function(nodeList) {

        // Создаем переменную, в которой храним html-код добавляемого маркера
        let HTMLStringForMarker = '<span class="slider__marker" id="sliderMarker-%markerID%"></span>'
        
        //в соответствии с количеством изображений (nodeList.length) добавляем необходимое количество маркеров, заменяя %markerID% на нужную цифру
        for (let i = 0; i < nodeList.length; i++) {
            let newHTML = HTMLStringForMarker.replace('%markerID%', i);
            document.querySelector('.slider__markers-container').insertAdjacentHTML('beforeend', newHTML);
        };

        document.getElementById('sliderMarker-0').classList.add('slider__marker--active');
    }

    let setupEventListener = function() {
        document.querySelector(DOM.leftBtn).addEventListener('click', slideLeft);
        document.querySelector(DOM.rightBtn).addEventListener('click', slideRight);


        // querySelectorAll возвращает коллекцию элементов nodeList. На коллекцию нельзя повесить обработчик событий. Поэтому мы коллекцию сохраняем в переменную MarkerNodeList. А затем с помощью цикла навешиваем на каждый элемент коллекции MarkerNodeList обработчик событий
        
        let MarkerNodeList =  document.querySelectorAll('.slider__marker');

        for (let i=0; i < MarkerNodeList.length; i++) {
            MarkerNodeList[i].addEventListener('click', SliderMarkerControl);
        }
    };

    

    let slideLeft = function () {
        activeImageID = parseInt(document.querySelector(DOM.sliderImageClassActive).id.split('-')[1]);

        // Удаляем класс .slider__image--active у текущего изображения
        imagesNodeList[activeImageID].classList.remove('slider__image--active');

        if (activeImageID === 0) {
            imagesNodeList[imagesNodeList.length - 1].classList.add('slider__image--active');
        } else {
            imagesNodeList[activeImageID - 1].classList.add('slider__image--active');
        }
    };

    let slideRight = function () {

        // Получаем id элемента с классом .slider__image--active (sliderImageClassActive), отсекаем первую часть ID ('sliderImage-') и преобразуем в число, которое сохраняем в переменную activeImageID
        activeImageID = parseInt(document.querySelector(DOM.sliderImageClassActive).id.split('-')[1]);

        // Удаляем класс .slider__image--active у текущего изображения
        imagesNodeList[activeImageID].classList.remove('slider__image--active');


        if (activeImageID === imagesNodeList.length - 1) {
            imagesNodeList[0].classList.add('slider__image--active');
        } else {
            imagesNodeList[activeImageID + 1].classList.add('slider__image--active');
        }
    }

    let SliderMarkerControl = function() {
        alert('Marker was clicked');
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