import React, {CSSProperties, Dispatch, MutableRefObject, ReactNode} from "react";

export interface useDraggableContainerProps {
    list: any[];
    sortListByOrder: (list: any[], dragItem: number, dragOverItem: number) => void;

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
    params: DraggableContainerParams;
    id: number;
    index: number;

    dropIndicatorClass?: string;
    TableRowClass?: string;
    onPointerDown?: () => void;
    styleRow?: CSSProperties;
    styleIndicator?: CSSProperties;
}

export interface DraggableContainerParams {
    dragOverItem: MutableRefObject<number | null>;
    isMouseDown: MutableRefObject<boolean>;
    previousDragOverItem: React.MutableRefObject<number | null>;
    dragItem: MutableRefObject<number | null>;
    cords: MutableRefObject<{ startY: number, lastY: number, startX: number }>;
    // containerRef: MutableRefObject<any>;
    setCurrentOverDragging: Dispatch<React.SetStateAction<number | null>>;
    itemsRef: React.MutableRefObject<HTMLDivElement[] | null[]>;
    currentOverDragging: number | null;
    isDragging: boolean;
}