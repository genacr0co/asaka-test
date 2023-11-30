import {DraggableItemProps} from "./props";
import React, {CSSProperties} from "react";

export const useDraggableItem = (props: DraggableItemProps) => {
    const onPointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
        if (props.params.isDragging) {
            props.params.dragOverItem.current = props.index;
            props.params.setCurrentOverDragging(props.index);
        }
    }

    const onPointerLeave = () => {
        if (props.params.isDragging) {
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

    const dropIndicatorStyle: CSSProperties = {
        opacity: props.params.isDragging && props.params.currentOverDragging === props.index ? '1' : '0',
    }

    const tableRowStyle: CSSProperties = {
        pointerEvents: props.params.isDragging ? 'none' : 'auto',
    }

    return {
        dropIndicatorStyle,
        tableRowStyle,
        onPointerOver,
        onPointerLeave,
        onPointerDown
    }
}