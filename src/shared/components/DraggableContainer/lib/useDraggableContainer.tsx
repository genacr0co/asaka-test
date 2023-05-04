import {useDraggableContainerProps} from "./props";
import {MouseEvent, useEffect, useRef, useState} from "react";

export const useDraggableContainer = (props: useDraggableContainerProps) => {

    const containerRef = useRef<any | null>(null); // ссылка на род. контейнер
    const itemsRef = useRef<HTMLDivElement[] | null[]>([]); // массив ссылкок на элементы списка которые можно двигать
    const isMouseDown = useRef<boolean>(false);
    const dragItem = useRef<number | null>(null); // индекс текущего элемента которые мы двигаем
    const dragOverItem = useRef<number | null>(null); // индекс текущего элемента которые мы перекрываем
    const previousDragOverItem = useRef<number | null>(null); // индекс предыдущего элемента которые мы перекрываем

    // то же что и dragOverItem но вызывается, так ка без него чет не работает, видать перерендер идет, когда изменяется
    const [currentOverDragging, setCurrentOverDragging] = useState<number | null>(null);


    // cords - это КООРДИНАТЫ, лень писать длинное слово :)
    const cords = useRef<{
        startY: number;
        lastY: number;
        startX: number;
        lastX: number;
    }>({
        startY: 0,
        lastY: 0,
        startX: 0,
        lastX: 0,
    });


    // не помню зачем нужна, но без нее не работет, видать перерендер идет, когда изменяется
    const [isDragStart, setIsDragStart] = useState<boolean>(false);

    const [isDragEnd, setIsDragEnd] = useState<boolean>(false);

    useEffect(() => {
        if (isDragEnd) {
            sortList();
        }
    }, [isDragEnd])

    const sortList = () => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            console.log("sortList")

            const copyListItems = [...props.list];
            const dragItemContent = copyListItems[dragItem.current!];
            copyListItems.splice(dragItem.current!, 1);
            copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
            props.setList(copyListItems);

            dragItem.current = null;
            dragOverItem.current = null;
        }
    }

    useEffect(() => {
        const container = containerRef.current;

        if (container !== null) {
            container.style.cursor = props.defaultCursor || 'grab';
        }

        const handlePointerDown = (e: MouseEvent) => {
            container.style.cursor = props.activeCursor || 'grabbing';

            if (itemsRef.current !== null) {
                for (let i = 0; i < itemsRef.current.length; i++) {

                    itemsRef.current[i]!.style.transitionProperty = 'transform';

                    itemsRef.current[i]!.style.transitionDuration = `0.4s`;
                }
            }
        }

        const handlePointerMove = (e: MouseEvent) => {
            if (isMouseDown.current) {
                // console.log(currentOffsetTop.current)
                setIsDragEnd(false);

                if (props.onPointerMove) {
                    props.onPointerMove!();
                }

                if (container !== null) {
                    container.style.cursor = props.activeCursor || 'grabbing';
                }

                setIsDragStart(true);

                if (itemsRef.current) {

                    const current = dragItem.current;
                    const over = dragOverItem.current;
                    const previous = previousDragOverItem.current;

                    if (current !== null && over !== null && previous !== null) {

                        // console.log(itemsRef.current[dragOverItem.current!]!.offsetTop, itemsRef.current[current]!.offsetTop)

                        // ТУТ ИДЕТ СУХИЕ ЛОГИЧЕСКИЕ ВЫЧИСЛЕНИЯ, ПОТРАТИЛ НА ЭТО БОЛЬШУЮ ЧАСТЬ ВРЕМЕНИ
                        // ТУТ МОЖНО ПОРЕФАКТОРИТЬ , НО НУЖНО ВСПОМНИТЬ ЗАКОНЫ ПОГЛАЩЕНИЯ И ТД, А ВРЕМЕНИ НЕТ

                        // console.log('o:', over, ' c:', current, ' p:', previous)
                        // console.log('o:', overNode.offsetTop, ' c:', currentNode.offsetTop, ' p:', previousNode.offsetTop)


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
                    const nextX = e.clientX - cords.current.startX + cords.current.lastX;

                    if (dragItem.current !== null) {
                        itemsRef.current[dragItem.current!]!.style.zIndex = '9999';
                        itemsRef.current[dragItem.current!]!.style.top = `${nextY}px`;

                        if (props.isDragX) {
                            itemsRef.current[dragItem.current!]!.style.left = `${nextX}px`;
                        }

                        if (props.isScalableItem) {
                            itemsRef.current[dragItem.current!]!.style.transform = `scale(${props.scalableValue || 1})`;
                        }

                        itemsRef.current[dragItem.current!]!.style.boxShadow = `0px 2px 20px rgba(0, 0, 0, 0.13)`;
                    }

                }
            }
        }

        const handlePointerUp = () => {
            isMouseDown.current = false;
            setIsDragStart(false);


            if (itemsRef.current !== null && dragItem.current !== null && dragOverItem.current !== null) {
                const current = itemsRef.current[dragItem.current!]!;
                const over = itemsRef.current[dragOverItem.current!]!;

                current.style.transitionProperty = 'transform, left, top';
                current.style.transitionDuration = `0.4s`;
                current.style.top = `${((current.offsetHeight + (props.gap || 0)) * dragOverItem.current)}px`;
                // console.log(dragOverItem.current, current.offsetHeight)
                current.style.left = `0px`;
                current.style.zIndex = '2';
                current.style.transform = `scale(1)`;
                current.style.boxShadow = `none`;

                cords.current.lastY = current.offsetTop;
                cords.current.lastX = 0;


                for (let i = 0; i < itemsRef.current.length; i++) {
                    if (i !== dragItem.current!) {
                        itemsRef.current[i]!.style.zIndex = '1';
                        // itemsRef.current[i]!.style.transform = `translateY(0px)`;

                        // itemsRef.current[i]!.style.transitionDuration = `0s`;
                        // itemsRef.current[i]!.style.transitionProperty = 'transform';
                    }
                }

            }


            setIsDragEnd(true);


            containerRef.current.style.cursor = props.defaultCursor || 'grab';
        }


        const handlePointerLeave = () => {

        }

        container!.addEventListener('pointermove', handlePointerMove);
        container!.addEventListener('pointerup', handlePointerUp);
        container!.addEventListener('pointerleave', handlePointerLeave);
        container!.addEventListener('pointerdown', handlePointerDown);


        return () => {
            container!.removeEventListener('pointermove', handlePointerMove);
            container!.removeEventListener('pointerup', handlePointerUp);
            container!.removeEventListener('pointerleave', handlePointerLeave);
            container!.removeEventListener('pointerdown', handlePointerDown);

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
    }
}