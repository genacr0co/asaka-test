import React, {useState} from "react";
import {DraggableItem, useDraggableContainer, SubFolderIcon} from "shared/components";

import {Item} from "shared/lib/vStore";

import styles from '../styles/SubTable.module.css';

interface Props {
    sub_list: Item[];
    id: number;
}

export const SubTable = (props: Props) => {

    const [list, setList] = useState<Item[]>(props.sub_list)

    const params = useDraggableContainer({
        list, setList,
    });


    return (
        <div onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}>
            <div ref={params.containerRef}>
                <div className={styles.Root}>
                    {list.map((item, index) =>
                        <DraggableItem key={item.id}
                                       id={item.id}
                                       index={index} params={params}
                                       dropIndicatorClass={styles.dropIndicator}
                                       TableRowClass={styles.TableRow}
                        >
                            <div
                                className={params.isMouseDown.current && params.dragItem.current === index ? '' : styles.line}/>

                            <div className={styles.SpaceBetween}>

                                <div className={styles.FlexRow}>
                                    <div className={styles.column} style={{width: 62, marginRight: 8}}>
                                        <div className={styles.columnTitle}>
                                            №
                                        </div>
                                        <div className={styles.Title}>
                                            <span>{props.id}.{item.id}</span>
                                        </div>
                                    </div>


                                    <div className={styles.column} style={{width: 561, marginRight: 8}}>
                                        <div className={styles.columnTitle}>
                                            Название
                                        </div>
                                        <div className={styles.Title}>
                                            <SubFolderIcon/>
                                            <span>{item.title}</span>
                                        </div>
                                    </div>

                                    <div className={styles.column}>
                                        <div className={styles.columnTitle}>
                                            Очередность
                                        </div>
                                        <div className={styles.Title}>
                                            <span>{index + 1}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>

                        </DraggableItem>
                    )}
                </div>
            </div>
        </div>
    );
};