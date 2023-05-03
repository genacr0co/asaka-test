import {Props} from "../lib/props";
import styles from '../styles/Table.module.css';
import React, {MouseEvent, useEffect, useRef, useState} from "react";

interface Item {
    id: number,
    order: number,
    title: string;
}

export const Table = (props: Props) => {
    const [list, setList] = useState<Item[]>([
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

    const containerRef = useRef<any | null>(null);
    const itemsRef = useRef<HTMLDivElement[] | null[]>([]);
    const isMouseDown = useRef<boolean>(false);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);
    const previousDragOverItem = useRef<number | null>(null);

    const cords = useRef<{
        startY: number;
        lastY: number;
        startX: number;
        // dropY: number;

    }>({
        startY: 0,
        lastY: 0,
        startX: 0,
        // dropY: 0,
    });

    const [currentDragging, setCurrentDragging] = useState<number | null>(null);
    const [currentOverDragging, setCurrentOverDragging] = useState<number | null>(null);
    // const [isDragging, setIsDragging] = useState<boolean>(false);

    const [isDragStart, setIsDragStart] = useState<boolean>(false);


    useEffect(() => {
        const container = containerRef.current;

        const handlePointerMove = (e: MouseEvent) => {
            //when dropping

            if (isMouseDown.current) {
                setIsDragStart(true);

                if (itemsRef.current) {


                    // o: 0  c: 0  p: 0
                    // o: 1  c: 0  p: 0
                    // o: 1  c: 0  p: 1
                    // o: 2  c: 0  p: 1
                    // o: 2  c: 0  p: 2
                    // o: 1  c: 0  p: 2
                    // o: 0  c: 0  p: 1
                    // o: 0  c: 1  p: 1
                    // o: 1  c: 1  p: 0
                    // o: 0  c: 2  p: 1
                    // o: 1  c: 2  p: 0


                    const current = dragItem.current;
                    const over = dragOverItem.current;
                    const previous = previousDragOverItem.current;

                    if (current !== null && over !== null && previous !== null) {

                        // console.log('o:', over, ' c:', current, ' p:', previous)

                        if (current > over && current > previous && over < previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(100% + 4px))`;
                        }
                        if (current > over && current > previous && over > previous) {
                            itemsRef.current[previous]!.style.transform = `translateY(0px)`;
                        }
                        if (over < previous && over < current && current === previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(100% + 4px))`;
                        }
                        if (over > previous && over > current && current < previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(-100% - 4px))`;
                        }
                        if (over > previous && over > current && current === previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(-100% - 4px))`;
                        }
                        if (over < previous && over === current) {
                            itemsRef.current[previous]!.style.transform = `translateY(0px)`;
                        }
                        if (over > previous && over === current) {
                            itemsRef.current[previous]!.style.transform = `translateY(0px)`;
                        }
                        if (over < previous && over > current && current < previous) {
                            itemsRef.current[previous]!.style.transform = `translateY(0px)`;
                        }
                    }


                    const nextY = e.clientY - cords.current.startY + cords.current.lastY;
                    const nextX = e.clientX - cords.current.startX;

                    if (dragItem.current !== null) {
                        itemsRef.current[dragItem.current!]!.style.zIndex = '9999';
                        itemsRef.current[dragItem.current!]!.style.top = `${nextY}px`;
                        // itemsRef.current[dragItem.current!]!.style.left = `${nextX}px`;
                        // itemsRef.current[dragItem.current!]!.style.transform = `scale(0.98)`;


                        itemsRef.current[dragItem.current!]!.style.transitionProperty = 'transform, opacity';


                        itemsRef.current[dragItem.current!]!.style.boxShadow = `0px 2px 20px rgba(0, 0, 0, 0.13)`;
                    }

                }
            }
        }

        const handlePointerUp = () => {
            if (dragItem.current !== null && dragOverItem.current !== null) {
                const copyListItems = [...list];
                const dragItemContent = copyListItems[dragItem.current!];
                copyListItems.splice(dragItem.current!, 1);
                copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
                setList(copyListItems);
            }

            handlePointerLeave();
        }

        const handlePointerLeave = () => {

            isMouseDown.current = false;
            setIsDragStart(false);

            if (itemsRef.current !== null) {
                for (let i = 0; i < itemsRef.current.length; i++) {
                    itemsRef.current[i]!.style.transform = `translateY(0px)`;
                }
            }

            if (itemsRef.current !== null && dragItem.current !== null) {

                itemsRef.current[dragItem.current!]!.style.zIndex = '1';
                itemsRef.current[dragItem.current!]!.style.background = 'white';
                itemsRef.current[dragItem.current!]!.style.transform = `scale(1)`;
                itemsRef.current[dragItem.current!]!.style.boxShadow = `none`;

                // cords.current.lastY = cords.current.dropY;
                itemsRef.current[dragItem.current!]!.style.left = `0px`;

                itemsRef.current[dragItem.current!]!.style.top = `0px`;


                itemsRef.current[dragItem.current!]!.style.transitionProperty = 'transform, opacity, top, left';


            }


            dragItem.current = null;
            dragOverItem.current = null;

            containerRef.current.style.cursor = 'grab';


            isMouseDown.current = false;
            setIsDragStart(false);
            // setIsDragging(false);

            // setCurrentDragging(null);

        }

        container!.addEventListener('pointermove', handlePointerMove);
        container!.addEventListener('pointerup', handlePointerUp);

        container!.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            container!.removeEventListener('pointermove', handlePointerMove);
            container!.removeEventListener('pointerup', handlePointerUp);
            container!.removeEventListener('pointerleave', handlePointerLeave);

        }
    }, [list])

    return (
        <div className={styles.Root} ref={containerRef}>
            {
                list.map((item, index) => <div
                    className={styles.DragItem}
                    key={item.id}

                    onPointerOver={(e) => {
                        dragOverItem.current = index;
                        setCurrentOverDragging(index);
                    }}

                    onPointerLeave={() => {
                        if (isMouseDown.current) {
                            // if (index !== dragItem.current) {
                            //     previousDragOverItem.current = dragOverItem.current
                            // }
                            previousDragOverItem.current = dragOverItem.current
                        }
                    }}


                    onPointerDown={(e) => {
                        isMouseDown.current = true;

                        dragItem.current = index;

                        dragItem.current = index;
                        // setIsDragging(true)

                        setCurrentDragging(index)

                        cords.current.startY = e.clientY;
                        cords.current.startX = e.clientX;

                        // cords.current.dropY = e.clientY;
                        // cords.current.lastY = 0;

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


                         onPointerOver={(e) => {

                             if (isMouseDown.current) {
                                 // dragOverItem.current = index;
                                 // setCurrentOverDragging(index);

                                 // if(index !== dragItem.current) {
                                 //     dragOverItem.current = index;
                                 //     setCurrentOverDragging(index);
                                 // }

                                 // console.log(index)
                                 // cords.current.dropY = e.currentTarget.offsetTop;
                                 // console.log(cords.current.dropY)

                                 // if (index === currentDragging) {
                                 //     itemsRef.current[index]!.style.opacity = '1'
                                 // } else {
                                 //     itemsRef.current[index]!.style.opacity = '0'
                                 // }
                             }


                             // if (isDragging) {
                             //
                             //     console.log(currentDragging, ' === ', currentOverDragging, currentDragging === currentOverDragging)
                             //
                             //
                             //     if (currentDragging !== currentOverDragging) {
                             //
                             //
                             //         // if(currentOverDragging !== index) {
                             //         //     itemsRef.current[index]!.style.opacity = '0'
                             //         // }
                             //         // else {
                             //         //     itemsRef.current[index]!.style.opacity = '1'
                             //         // }
                             //     }
                             // }

                         }}

                         style={{
                             pointerEvents: isMouseDown.current ? 'none' : 'auto',
                             // opacity: currentOverDragging !== index ? '1' : '0',

                             // opacity: currentOverDragging !== currentDragging && currentOverDragging === index ? '1' : '0',

                             // display: item.id !== 2 ? 'none' : 'block',

                             // transform: isMouseDown.current && currentDragging !== dragItem.current && currentDragging === index ?
                             //     (dragItem.current! < dragOverItem.current!) ?
                             //         `translateY(calc(-${100}% - 4px))` : `translateY(calc(${100}% + 4px))` : ``,

                         }}
                    >
                        №: {item.id} <b>{item.title}</b> очередь: {index + 1}
                    </div>
                </div>)
            }
        </div>
    );
};