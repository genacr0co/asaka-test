import React, {useContext, useState} from "react";
import {observer} from "mobx-react";

import {TableRow} from "entities/modules";

import {DraggableItem, useDraggableContainer} from "shared/components";
import {Context} from "shared/lib/context";

import {Props} from "../lib/props";
import styles from '../styles/NestedList.module.css';

export const NestedList = observer((props: Props) => {
    const {store} = useContext(Context);

    const params = useDraggableContainer({
        sortListByOrder: store.sortListByOrder,
        onPointerMove: () => setDivider(null),
        list: props.list,
        gap: props.is_parent ? 4 : 0,
        isDragX: store.isDragX,
        isScalableItem: store.isScalableItem,
        scalableValue: 0.9,
    });

    const [divider, setDivider] = useState<number | null>(null);

    return (
        <div onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}>
            <div
                ref={params.containerRef}
            >
                <div className={`${styles.Root} ${props.is_parent ? styles.RootParent : styles.RootChildren}`}>

                    {
                        props.list.map((item, index) =>
                            <DraggableItem key={item.id}
                                           id={item.id}
                                           index={index} params={params}

                                           dropIndicatorClass={`${styles.DropIndicator} ${props.is_parent ? styles.DropIndicatorParent : styles.DropIndicatorChildren}`}
                                           TableRowClass={`${styles.TableRow} ${props.is_parent ? styles.TableRowParent : styles.TableRowChildren}`}

                                styleIndicator={{
                                    height: `${item.sub ? divider !== item.id ? 82 : 82 * item.sub!.length + 87 : 82}px`
                                }}

                                           // styleIndicator={{
                                           //     height: `${item.sub !== undefined && item.sub.length > 0 && divider === item.id ? '500px' : ''}`
                                           // }}
                            >

                                {!props.is_parent &&
                                    <div className={params.isDragging && params.dragItem.current === index
                                        ? '' : styles.line
                                    }/>}


                                <TableRow
                                    id={item.id}
                                    index={index}
                                    divider={divider}
                                    setDivider={setDivider}
                                    title={item.title} sub={item.sub}
                                    is_parent={props.is_parent}
                                    // parent_id={props.id}
                                />


                                {
                                    item.sub !== undefined ?
                                        <NestedList list={item.sub} is_parent={false} id={item.id}/> : <></>
                                }

                            </DraggableItem>
                        )
                    }
                </div>
            </div>
        </div>
    )
})
