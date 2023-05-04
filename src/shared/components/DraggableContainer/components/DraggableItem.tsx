import React from 'react';

import styles from '../styles/DraggableItem.module.css';
import {DraggableItemProps} from "../lib/props";
import {useDraggableItem} from "../lib/useDraggableItem";

export const DraggableItem = (props: DraggableItemProps) => {

    const {onPointerLeave, onPointerOver, onPointerDown, tableRowStyle, dropIndicatorStyle} = useDraggableItem(props);

    return (
        <div className={styles.DragItem}
             onPointerDown={onPointerDown}
             onPointerOver={onPointerOver}
             onPointerLeave={onPointerLeave}
        >
            <div className={props.dropIndicatorClass} style={dropIndicatorStyle}/>

            <div className={`${styles.TableRow} ${props.TableRowClass}`}
                 ref={el => props.params.itemsRef.current[props.index] = el}
                 style={tableRowStyle}
            >
                {props.children}
            </div>
        </div>
    );
};