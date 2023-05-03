import {Props} from "../lib/props";
import styles from '../styles/Table.module.css';
import React, {useState} from "react";

import {DraggableContainer, DraggableItem} from "shared/components";


export const Table = (props: Props) => {
    const [list, setList] = useState<DraggableItem[]>([
        {
            id: 1,
            title: 'Item',
            order: 1,
        },
        {
            id: 2,
            title: 'Item',
            order: 2,
        },
        {
            id: 3,
            title: 'Item',
            order: 3,
        },
        {
            id: 4,
            title: 'Item',
            order: 4,
        },
        {
            id: 5,
            title: 'Item',
            order: 5,
        },
        {
            id: 6,
            title: 'Item',
            order: 6,
        },
        {
            id: 7,
            title: 'Item',
            order: 6,
        },
    ]);

    return (
        <div>
            <DraggableContainer
                list={list}
                setList={setList}
                // isDragX={true}
                // isScalableItem={true}
                // scalableValue={}
                // activeCursor={}
                // defaultCursor={}
            />
        </div>
    );
};