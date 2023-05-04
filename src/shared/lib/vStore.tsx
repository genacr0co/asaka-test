import {useState} from "react";


// не стал усложнять все редаксом или MobX - (мне кстати он больше нравится)

export interface Item {
    id: number;
    title: string;
    sub?: Item[];
}

export const useStore = () => {

    const [list, setList] = useState<Item[]>([
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
                {
                    id: 4,
                    title: 'Аванс (Нац. валюта)',
                },
                {
                    id: 5,
                    title: 'Аванс (Нац. валюта)',
                }
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
            ]
        },
    ]);

    const [isDragX, setIsDragX] = useState<boolean>(false);
    const [isScalableItem, setIsScalableItem] = useState<boolean>(false);

    return {
        list,
        setList,
        isDragX,
        setIsDragX,
        isScalableItem,
        setIsScalableItem
    }
}