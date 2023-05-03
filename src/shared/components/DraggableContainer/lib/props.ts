import {Dispatch, SetStateAction} from "react";

export interface Item {
    id: number,
    order: number,
    title: string;
}

export interface Props {
    list: Item[];
    setList: Dispatch<SetStateAction<Item[]>>;

    gap?: number;
    isScalableItem?: boolean;
    scalableValue?: number;
    isDragX?: boolean;

    activeCursor?: string;
    defaultCursor?: string;
}