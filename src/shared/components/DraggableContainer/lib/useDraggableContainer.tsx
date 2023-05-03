import {Props} from "./props";
import {MouseEvent, useEffect, useRef, useState} from "react";

export const useDraggableContainer = (props: Props) => {

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

    const [currentOverDragging, setCurrentOverDragging] = useState<number | null>(null);

    const [isDragStart, setIsDragStart] = useState<boolean>(false);


    useEffect(() => {
        const container = containerRef.current;

        const handlePointerMove = (e: MouseEvent) => {
            //when dropping

            if (isMouseDown.current) {
                setIsDragStart(true);

                if (itemsRef.current) {
                    const current = dragItem.current;
                    const over = dragOverItem.current;
                    const previous = previousDragOverItem.current;

                    if (current !== null && over !== null && previous !== null) {

                        // console.log('o:', over, ' c:', current, ' p:', previous)

                        if (current > over && current > previous && over < previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(100% + ${props.gap || 0}px))`;
                        }
                        if (current > over && current > previous && over > previous) {
                            itemsRef.current[previous]!.style.transform = `translateY(0px)`;
                        }
                        if (over < previous && over < current && current === previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(100% + ${props.gap || 0}px))`;
                        }
                        if (over > previous && over > current && current < previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(-100% - ${props.gap || 0}px))`;
                        }
                        if (over > previous && over > current && current === previous) {
                            itemsRef.current[over]!.style.transform = `translateY(calc(-100% - ${props.gap || 0}px))`;
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

                        if (props.isDragX) {
                            itemsRef.current[dragItem.current!]!.style.left = `${nextX}px`;
                        }

                        if (props.isScalableItem) {
                            itemsRef.current[dragItem.current!]!.style.transform = `scale(${props.scalableValue || 0.98})`;
                        }


                        itemsRef.current[dragItem.current!]!.style.transitionProperty = 'transform, opacity';


                        itemsRef.current[dragItem.current!]!.style.boxShadow = `0px 2px 20px rgba(0, 0, 0, 0.13)`;
                    }

                }
            }
        }

        const handlePointerUp = () => {
            if (dragItem.current !== null && dragOverItem.current !== null) {
                const copyListItems = [...props.list];
                const dragItemContent = copyListItems[dragItem.current!];
                copyListItems.splice(dragItem.current!, 1);
                copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
                props.setList(copyListItems);
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
                itemsRef.current[dragItem.current!]!.style.left = `0px`;
                itemsRef.current[dragItem.current!]!.style.top = `0px`;
                itemsRef.current[dragItem.current!]!.style.transitionProperty = 'transform, opacity, top, left';
            }


            dragItem.current = null;
            dragOverItem.current = null;

            containerRef.current.style.cursor = props.defaultCursor || 'grab';
        }

        container!.addEventListener('pointermove', handlePointerMove);
        container!.addEventListener('pointerup', handlePointerUp);
        container!.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            container!.removeEventListener('pointermove', handlePointerMove);
            container!.removeEventListener('pointerup', handlePointerUp);
            container!.removeEventListener('pointerleave', handlePointerLeave);

        }
    }, [props])

    return {
        containerRef,
        itemsRef,
        currentOverDragging,
        setCurrentOverDragging,
        cords,
        isMouseDown,
        dragOverItem,
        previousDragOverItem,
        dragItem,
        isDragStart
    }
}