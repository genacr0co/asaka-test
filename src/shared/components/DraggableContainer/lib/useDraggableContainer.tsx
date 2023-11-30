import {useDraggableContainerProps} from "./props";
import {useEffect, useRef, useState} from "react";

export const useDraggableContainer = (props: useDraggableContainerProps) => {
    const containerRef = useRef<any | null>(null); // ссылка на род. контейнер

    const itemsRef = useRef<HTMLDivElement[] | null[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [currentOverDragging, setCurrentOverDragging] = useState<number | null>(null);

    const dragItem = useRef<number | null>(null);
    const previousDragOverItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const isMouseDown = useRef<boolean>(false);

    const cords = useRef<{
        startY: number;
        lastY: number;
        startX: number;
    }>({
        startY: 0,
        lastY: 0,
        startX: 0,
    });

    useEffect(() => {
        const container = containerRef.current;

        if (container !== null) {
            container.style.cursor = props.defaultCursor || 'grab';
        }
        //
        const handlePointerDown = (e: PointerEvent) => {
            if (container !== null) {
                container.style.cursor = props.activeCursor || 'grabbing';
            }
        }

        const handlePointerMove = (e: PointerEvent) => {
            if (isMouseDown.current) {

                if (props.onPointerMove) {
                    props.onPointerMove!();
                }

                if (container !== null) {
                    container.style.cursor = props.activeCursor || 'grabbing';
                }

                if (itemsRef.current !== null) {
                    for (let i = 0; i < itemsRef.current.length; i++) {
                        itemsRef.current[i]!.style.transitionProperty = 'transform';
                        itemsRef.current[i]!.style.transitionDuration = '0.3s';

                        if (i !== dragItem.current) {
                            itemsRef.current[i]!.style.zIndex = '1';
                        } else {
                            itemsRef.current[i]!.style.zIndex = '2';
                        }
                    }
                }


                setIsDragging(true);


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
                        const current = itemsRef.current[dragItem.current!]!;


                        current.style.top = `${nextY}px`;

                        if (props.isDragX) {
                            current.style.left = `${nextX}px`;
                        }

                        if (props.isScalableItem) {
                            current.style.transform = `scale(${props.scalableValue || 1})`;
                        }

                        current.style.boxShadow = `0px 2px 20px rgba(0, 0, 0, 0.13)`;
                    }

                }
            }
        }

        const handlePointerUp = () => {
            changeCurrentItemPosition();
            setTimeout(reset, 200)
        }

        const reset = () => {
            if (dragItem.current !== null && dragOverItem.current !== null) {
                const current = itemsRef.current[dragItem.current!]!;

                // const copyListItems = [...props.list];
                // const dragItemContent = copyListItems[dragItem.current!];
                // copyListItems.splice(dragItem.current!, 1);
                // copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
                // props.setList(copyListItems);

                props.sortListByOrder(props.list, dragItem.current, dragOverItem.current)

                cords.current.lastY = 0;

                current.style.transitionDuration = '0s';
                current.style.left = `0px`;
                current.style.top = `0px`;

                if (itemsRef.current !== null) {
                    for (let i = 0; i < itemsRef.current.length; i++) {
                        itemsRef.current[i]!.style.transform = `translateY(0px)`;
                        itemsRef.current[i]!.style.transitionDuration = `0s`;
                    }
                }

                dragItem.current = null;
                dragOverItem.current = null;
            }

        }

        const changeCurrentItemPosition = () => {
            setIsDragging(false);
            isMouseDown.current = false;
            container.style.cursor = props.defaultCursor || 'grab';

            if (itemsRef.current !== null && dragItem.current !== null) {

                const current = itemsRef.current[dragItem.current!]!;

                current.style.transform = `scale(1)`;
                current.style.boxShadow = `none`;
                current.style.transitionProperty = 'transform, left, top';
                current.style.left = `0px`;

                let shiftY = dragOverItem.current !== null ? dragOverItem.current! - dragItem.current : 0;
                cords.current.lastY = (shiftY * (current.offsetHeight + (props.gap || 0)));
                current.style.top = `${cords.current.lastY}px`;
            }
        }

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointerleave', handlePointerUp);
        container.addEventListener('pointerdown', handlePointerDown);


        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointerleave', handlePointerUp);
            container.removeEventListener('pointerdown', handlePointerDown);
        }
    }, [props])

    return {
        itemsRef,
        isDragging,
        currentOverDragging,
        setCurrentOverDragging,
        cords,
        isMouseDown,
        dragOverItem,
        previousDragOverItem,
        dragItem,
        containerRef
    }
}