import React from "react";
import {Props} from "../lib/props";
import styles from '../styles/DraggableContainer.module.css';
import {useDraggableContainer} from "../lib/useDraggableContainer";

export const DraggableContainer = (props: Props) => {

    const {
        isMouseDown,
        containerRef,
        itemsRef,
        previousDragOverItem,
        setCurrentOverDragging,
        currentOverDragging,
        dragOverItem,
        dragItem,
        cords,
    } = useDraggableContainer(props);

    return (
        <div className={styles.Root} ref={containerRef}>
            {
                props.list.map((item, index) => <div
                    className={styles.DragItem}
                    key={item.id}

                    onPointerOver={(e) => {
                        dragOverItem.current = index;
                        setCurrentOverDragging(index);
                    }}

                    onPointerLeave={() => {
                        if (isMouseDown.current) {
                            previousDragOverItem.current = dragOverItem.current
                        }
                    }}


                    onPointerDown={(e) => {
                        isMouseDown.current = true;
                        dragItem.current = index;
                        cords.current.startY = e.clientY;
                        cords.current.startX = e.clientX;
                        containerRef.current.style.cursor = 'grabbing';
                    }}

                >
                    <div className={`${styles.dropIndicator}`}
                         style={{
                             opacity: isMouseDown.current && currentOverDragging === index ? '1' : '0',
                         }}
                    />

                    <div className={styles.TableRow}
                         ref={el => itemsRef.current[index] = el}

                         style={{
                             pointerEvents: isMouseDown.current ? 'none' : 'auto',
                         }}
                    >
                        №: {item.id} <b>{item.title}</b> очередь: {index + 1}
                    </div>
                </div>)
            }
        </div>
    );
};