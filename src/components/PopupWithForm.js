import {Popup} from "./Popup"

export class PopupWithForm extends Popup {
    constructor(selector, apiMethod, hideErrorMethod){
        super(selector);
        this.apiMethod = apiMethod;
        this.hideErrorMethod = hideErrorMethod;
        this.form = this.popup.querySelector(".popup__form");
        this.inputsList = this.popup.querySelectorAll(".popup__input");
    }

    setEventListeners(){
        super.setEventListeners()
        const [firstInput,secondInput] = this.inputsList;
        this.form.addEventListener("submit",(evt)=>{
            evt.preventDefault()
            this.apiMethod(firstInput.value, secondInput.value);
            this.close()
        })
    }

    close(){
        super.close()
        this.inputsList.forEach(element => {
            this.hideErrorMethod(element)
        });
        this.form.reset()
    }
}