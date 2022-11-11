import {Popup} from "./Popup"

export class PopupWithForm extends Popup {
    constructor(selector, apiMethod, hideErrorMethod, changeOnSubmit = false){
        super(selector);
        this.apiMethod = apiMethod;
        this.hideErrorMethod = hideErrorMethod;
        this.form = this.popup.querySelector(".popup__form");
        this.inputsList = this.popup.querySelectorAll(".popup__input");
        this.changeOnSubmit = changeOnSubmit;
    }

    setEventListeners(){
        super.setEventListeners()
        const [firstInput,secondInput] = this.inputsList;
        this.form.addEventListener("submit",(evt)=>{
            evt.preventDefault()
            this.apiMethod(firstInput.value, secondInput.value);
            if(this.changeOnSubmit){
                this.changeOnSubmit[0].textContent = firstInput.value;
                this.changeOnSubmit[1].textContent = secondInput.value;
            }
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

    open(){
        if(this.changeOnSubmit){
            this.inputsList[0].value = this.changeOnSubmit[0].textContent
            this.inputsList[1].value = this.changeOnSubmit[1].textContent
        }
        super.open()
    }
}