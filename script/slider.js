let UIController = (function() {
    
     // Создаем объект, в котором будем хранить все строки: в случае изменения имен классов мы можем изменить значение переменной в одном месте
    let DOMStrings = {
        sliderImageClass: '.slider__image',
        sliderImageClassActive: '.slider__image--active',
        imageIDPrefix: 'sliderImage',
        leftBtn: '#slider-arrow-left',
        rightBtn: '#slider-arrow-right'
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

    
    var setupEventListener = function() {
        document.querySelector(DOM.leftBtn).addEventListener('click', slideLeft);
        document.querySelector(DOM.rightBtn).addEventListener('click', slideRight);
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


    return {
        activeImageIDFn: function() {
            return activeImageID;
        },

        init: function() {
            setupEventListener();
        }
    };

})(UIController);

controller.init();