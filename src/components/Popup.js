/*function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc)
}

// закрытие попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// закрытие попап через (esc)
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

export {
    openPopup,
    closePopup,
    closePopupEsc,
}*/

export class Popup{
    constructor(selector){
        this.popup = document.querySelector(selector);
    }


    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.popup.classList.remove('popup_opened');
    }
}

    setEventListeners(){
        const removeButton = this.popup.querySelector('.popup__close-min')
        this.popup.addEventListener("click",(evt)=>{
            if(evt.target === this.popup || evt.target === removeButton){
            this.close()
            }
        })
    }

    open(){
        this.popup.classList.add('popup_opened');
        document.addEventListener("keydown", (evt)=>this._handleEscClose(evt))
    }

    close(){
        this.popup.classList.remove('popup_opened');
        document.removeEventListener("keydown", (evt)=>this._handleEscClose(evt))
    }
}