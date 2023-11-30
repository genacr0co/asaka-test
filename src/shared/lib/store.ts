import {action, makeAutoObservable} from 'mobx';
import {Item} from "./types";

export default class Store {
    constructor() {
        makeAutoObservable(this);
    }

    public list: Item[] = [
        {
            id: 1,
            title: 'Mastercard',
            sub: [
                {
                    id: 1,
                    title: 'Максимал фойда (Нац. валюта)',
                },
                {
                    id: 2,
                    title: 'On-line (Нац. валюта)',
                },
                {
                    id: 3,
                    title: 'Аванс (Нац. валюта)',
                },
            ]
        },
        {
            id: 2,
            title: 'Вклады',
            sub: [
                {
                    id: 1,
                    title: 'Максимал фойда (Нац. валюта)',
                },
                {
                    id: 2,
                    title: 'On-line (Нац. валюта)',
                },
                {
                    id: 3,
                    title: 'Аванс (Нац. валюта)',
                },
            ]
        },
        {
            id: 3,
            title: 'Кредиты',
            sub: [
                {
                    id: 1,
                    title: 'Максимал фойда (Нац. валюта)',
                },
                {
                    id: 2,
                    title: 'On-line (Нац. валюта)',
                },
                {
                    id: 3,
                    title: 'Аванс (Нац. валюта)',
                },
            ]
        },
    ]

    @action
    public sortListByOrder(list: Item[], dragItem: number, dragOverItem: number) {
        const dragItemContent = list[dragItem];
        list.splice(dragItem, 1);
        list.splice(dragOverItem, 0, dragItemContent);
    }

    public isDragX: boolean = false;
    public isScalableItem: boolean = false;

    @action
    public setIsDragX = (isDragX: boolean) => {
        this.isDragX = isDragX;
    }

    @action
    public setIsScalableItem = (isScalableItem: boolean) => {
        this.isScalableItem = isScalableItem;
    }

}
