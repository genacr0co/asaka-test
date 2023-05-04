# Документация к проекту

!!! В этом проекте не используются сторонние библотеки, только те, что предусмотрены установкой React !!!

Для запуска проекта необходимы:

`node --version: v18.16.0`

`react --version: v18.2.0`

команды:

`npm install`

`npm start`

`npm run build`


готово.

## 1. Компонента App

`src/app/App.tsx`

тупо собирает страницу из других комонент, ну и немного стилизует.

## 2. Фитча DisplayFound ( Найдено _ эл. )

`src/features/components/DisplayFound`

выводит длинну массива данных, из "ненастоящего" `vStore.`

`src/shared/lib/vStore.tsx`

## 3. Shared components

Кнопки:

ArrowCheckbox, MenuButton,

Иконки:

FolderIcon, SubFolderIcon,

Others:

`PageTitle` - ренедрит с заданным стилем текст из props

`DraggableContainer` - тяжелый зверь, ответчает за логику DnD

### Логика Drag & Drop

отвечает модуль `DraggableContainer`

`src/shared/components/DraggableContainer`

...тут нужно дописать куча всего и объяснить,
но времени мало, так что, позже 0_0

## 4. Table Widget

`src/widget/Table`

собирает Таблицу и Внутренню таблицу элемента, так же отвечает за дизайн (но, я бы там тоже порефакторил)

`src/widget/Table/components/SubTable`


!!! Остальное допишу скоро, как руки дойдут :) !!!

p.s. Хотя и так должно быть все понятно, я там где сложно комментарии оставлял. 