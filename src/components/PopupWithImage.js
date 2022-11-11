import {Popup} from "./Popup"
import {popupImageUrl,
    popupImageName} from "./utils"

export class PopupWithImage extends Popup {
    open(src, text){
        popupImageUrl.src = src;
        popupImageName.textContent = text;
        super.open()
    }
}