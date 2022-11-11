export class Section{
    constructor({items, render}, contSelector){
        this.items = items;
        this.render = render;
        this.parentElement = document.querySelector(contSelector);
    }

    addItem(item){
        this.parentElement.prepend(item)
    }

    renderItems(){
        this.items.forEach((item)=>{
            this.render(item)
        })
    }
}