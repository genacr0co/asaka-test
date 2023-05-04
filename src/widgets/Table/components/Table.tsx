import React, {useState} from "react";
import {DraggableItem, useDraggableContainer, ArrowCheckbox, FolderIcon} from "shared/components";

import {useStore} from "shared/lib/vStore";

import {Props} from "../lib/props";
import styles from '../styles/Table.module.css';
import {SubTable} from "./SubTable";

export const Table = (props: Props) => {

    const {list, setList, isDragX, setIsDragX, setIsScalableItem, isScalableItem} = useStore();

    const params = useDraggableContainer({
        onPointerMove: () => setDivider(null),
        list, setList,
        gap: 4, // пропуск между элемнтами, по умолчанию 0
        isDragX: isDragX, // ставьте True, чтобы drag и по оси X был, по умолчанию false
        isScalableItem: isScalableItem, // ставьте True, чтобы при drag, уменьшался элемент, по умолчанию false
        scalableValue: isScalableItem ? 0.9 : undefined, // на сколько уменьшается элемент при drag - css значание scale , по умолчанию 1
        // activeCursor: 'move', // css - свойство , активный курсосор, по умолчанию grabbing
        // defaultCursor: 'pointer',  // css - свойство , дефолтный курсосор, по умолчанию grab
    });

    const [divider, setDivider] = useState<number | null>(null);

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

            <div ref={params.containerRef}>
                <div className={styles.Root}>
                    {list.map((item, index) =>
                        <DraggableItem key={item.id}
                                       index={index} params={params}
                                       dropIndicatorClass={styles.dropIndicator}
                                       TableRowClass={`${styles.TableRow}`}
                                       styleIndicator={{
                                           height: `${item.sub ? divider !== item.id ? 82 : 72 * item.sub!.length + 87 : 82}px`
                                       }}
                        >
                            <div className={styles.SpaceBetween}>

                                <div className={styles.FlexRow}>
                                    <div className={styles.column} style={{width: 62, marginRight: 8}}>
                                        <div className={styles.columnTitle}>
                                            №
                                        </div>
                                        <div className={styles.Title}>
                                            <span>{item.id}</span>
                                        </div>
                                    </div>


                                    <div className={styles.column} style={{width: 290, marginRight: 8}}>
                                        <div className={styles.columnTitle}>
                                            Название
                                        </div>
                                        <div className={styles.Name}>
                                            <FolderIcon/>
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
                                    <ArrowCheckbox checked={divider === item.id} onClick={() => {
                                        if (divider !== item.id) {
                                            setDivider(item.id)
                                        } else {
                                            setDivider(null)
                                        }
                                    }}/>
                                </div>
                            </div>

                            {item.sub && <SubTable id={item.id} sub_list={item.sub}/>}
                        </DraggableItem>
                    )}
                </div>
            </div>
        </div>
    );
};