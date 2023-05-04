import React, {CSSProperties, Dispatch, MutableRefObject, ReactNode, SetStateAction} from "react";

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

export interface DraggableItemProps {
    children: ReactNode;
    dropIndicatorClass?: string;
    TableRowClass?: string;
    index: number;
    onPointerDown?: () => void;
    styleRow?: CSSProperties;
    styleIndicator?: CSSProperties;
    params: DraggableContainerParams;
}

export interface DraggableContainerParams {
    dragOverItem: MutableRefObject<number | null>;
    isMouseDown: MutableRefObject<boolean>;
    previousDragOverItem: React.MutableRefObject<number | null>;
    dragItem: MutableRefObject<number | null>;
    cords: MutableRefObject<{ startY: number, lastY: number, startX: number }>;
    containerRef: MutableRefObject<any>;
    currentOverDragging: number | null;
    setCurrentOverDragging: Dispatch<React.SetStateAction<number | null>>;
    itemsRef: React.MutableRefObject<HTMLDivElement[] | null[]>;
}