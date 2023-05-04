import {Dispatch, SetStateAction} from "react";

export interface useDraggableContainerProps {
    list: any[];
    setList: Dispatch<SetStateAction<any[]>>;

    onPointerMove?: () => void;

    gap?: number;
    isScalableItem?: boolean;
    scalableValue?: number;
    isDragX?: boolean;

    activeCursor?: string;
    defaultCursor?: string;

}
