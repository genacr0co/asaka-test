import React, {CSSProperties, Dispatch, MutableRefObject, ReactNode} from 'react';
import styles from '../styles/DraggableItem.module.css';

export interface DraggableItemProps {
    children: ReactNode;
    dropIndicatorClass?: string;
    TableRowClass?: string;
    index: number;
    onPointerDown?: () => void;

    styleRow?: CSSProperties;
    styleIndicator?: CSSProperties;

    params: {
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
}

export const DraggableItem = (props: DraggableItemProps) => {
    return (
        <div className={styles.DragItem}

             onPointerOver={(e) => {
                 props.params.dragOverItem.current = props.index;
                 props.params.setCurrentOverDragging(props.index);
             }}

             onPointerLeave={(e) => {
                 if (props.params.isMouseDown.current) {
                     props.params.previousDragOverItem.current = props.params.dragOverItem.current
                 }
             }}

             onPointerDown={(e) => {
                 props.params.isMouseDown.current = true;
                 props.params.dragItem.current = props.index;
                 props.params.cords.current.startY = e.clientY;
                 props.params.cords.current.startX = e.clientX;

                 if (props.onPointerDown) {
                     props.onPointerDown!();
                 }
                 // props.params.containerRef.current.style.cursor = 'grabbing';
             }}

        >
            <div className={props.dropIndicatorClass}
                 style={Object.assign({...props.styleIndicator}, {
                     opacity: props.params.isMouseDown.current && props.params.currentOverDragging === props.index ? '1' : '0',
                 })}
            />

            <div className={`${styles.TableRow} ${props.TableRowClass}`}
                 ref={el => props.params.itemsRef.current[props.index] = el}
                 style={Object.assign({...props.styleRow}, {
                     pointerEvents: props.params.isMouseDown.current ? 'none' : 'auto',
                 })}
            >
                {props.children}
            </div>
        </div>
    );
};