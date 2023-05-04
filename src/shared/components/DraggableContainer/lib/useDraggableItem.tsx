import {DraggableItemProps} from "./props";
import React, {CSSProperties} from "react";

export const useDraggableItem = (props: DraggableItemProps) => {
    const onPointerOver = () => {
        props.params.dragOverItem.current = props.index;
        props.params.setCurrentOverDragging(props.index);
    }

    const onPointerLeave = () => {
        if (props.params.isMouseDown.current) {
            props.params.previousDragOverItem.current = props.params.dragOverItem.current
        }
    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        props.params.isMouseDown.current = true;
        props.params.dragItem.current = props.index;
        props.params.cords.current.startY = e.clientY;
        props.params.cords.current.startX = e.clientX;

        if (props.onPointerDown) {
            props.onPointerDown!();
        }
    }

    const dropIndicatorStyle: CSSProperties = Object.assign({...props.styleIndicator}, {
        opacity: props.params.isMouseDown.current &&
        props.params.currentOverDragging === props.index ? '1' : '0',
    });

    const tableRowStyle: CSSProperties = Object.assign({...props.styleRow}, {
        pointerEvents: props.params.isMouseDown.current ? 'none' : 'auto',
    });

    return {
        dropIndicatorStyle,
        tableRowStyle,
        onPointerOver,
        onPointerLeave,
        onPointerDown
    }
}