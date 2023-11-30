import React, {useContext} from "react";
import {Context} from "shared/lib/context";
import {observer} from "mobx-react";

import {Props} from "../lib/props";
import styles from '../styles/Table.module.css';

import {NestedList} from "features";

export const Table = observer((props: Props) => {

    const {store} = useContext(Context);

    const {list, setIsScalableItem, isScalableItem, isDragX, setIsDragX} = store;

    return (
        <div>

            {/*ЭТО НЕ ПО ДИЗАЙНУ, НО ДЛЯ ПРЕЗЕНТАБЕЛЬНОСТИ ФИЧИ*/}

            <div className={styles.Tools}>
                <span onClick={() => setIsDragX(!isDragX)}>
                    <b>isDragX:</b>
                    <input type="checkbox" checked={isDragX} onChange={() => setIsDragX(!isDragX)}/>
                </span>

                <span onClick={() => setIsScalableItem(!isScalableItem)}>
                    <b>isScalableItem:</b>
                    <input type="checkbox" checked={isScalableItem}
                           onChange={() => setIsScalableItem(!isScalableItem)}/>
                </span>
            </div>

            {/*_________________________________________________*/}

            <NestedList list={list} is_parent={true}/>

        </div>
    );
});

