function enableValidation(selectors) {
    const popupForms = document.querySelectorAll(selectors.formSelector);
    popupForms.forEach((a) => {
        setEventListener(a, selectors);
    })
}

function setEventListener(formElement, settings) {
    formElement.addEventListener('input', () => {
        const isError = !formElement.checkValidity();
        const submitButton = formElement.querySelector(settings.submitButtonSelector);
        submitButton.disabled = isError;
        submitButton.classList.toggle(settings.inactiveButtonClass, isError);
    });
    const popupInputs = formElement.querySelectorAll(settings.inputSelector);
    popupInputs.forEach((i) => {
        //перебираем все элементы
        i.addEventListener("input", () => {
            if (!i.validity.valid) {
                let errorMessage = i.validationMessage;
                if (i.validity.patternMismatch) {
                    errorMessage = i.dataset.error;
                }
                const spanError = document.querySelector('#' + i.id + settings.spanError);
                // костана с ошибкой + id -error
                spanError.classList.add(settings.errorClass);
                //добавляем класс
                spanError.textContent = errorMessage;
                // выводим ошибку
            } else {
                const spanError = document.querySelector('#' + i.id + settings.spanError);
                spanError.textContent = '';
                spanError.classList.remove(settings.errorClass);// убираем класс
                spanError.textContent = '';// скидываем содержимое
            }
        });
    });
}

export {
    enableValidation,
}
