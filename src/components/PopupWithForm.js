import {Popup} from "./Popup"

export class PopupWithForm extends Popup {
    constructor(selector, apiMethod, hideErrorMethod, preparePopupMethod = false){
        super(selector);
        this.apiMethod = apiMethod;
        this.hideErrorMethod = hideErrorMethod;
        this.form = this.popup.querySelector(".popup__form");
        this.inputsList = this.popup.querySelectorAll(".popup__input");
        this.preparePopupMethod = preparePopupMethod;
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.popup.classList.remove('popup_opened');
            this.inputsList.forEach(element => {
                this.hideErrorMethod(element)
            });
    }
}

    close(){
        super.close()
        this.inputsList.forEach(element => {
            this.hideErrorMethod(element)
        });
        setTimeout(()=>this.form.reset(), 500)
    }

    open(){
        if(this.preparePopupMethod){
            this.preparePopupMethod()
        }
        super.open()
    }


    setEventListeners(){
        super.setEventListeners()
        const [firstInput,secondInput] = this.inputsList;
        this.form.addEventListener("submit",(evt)=>{
            evt.preventDefault()
            this.apiMethod(firstInput.value, secondInput.value);
        })
    }
}