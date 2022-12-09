import React, { FC, useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from './Grid';
import SortableItem from './SortableItem';
import Item from './Item';

const GridDnD: FC = (props) => {
  const { dataSource = [], onChange = () => { }, maxLength = 6 } = { ...props };
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    // console.log(event.active, dataSource);
    setActiveId(event.active.id);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const ids = items.map(item => item.id);
        const oldIndex = ids.indexOf(active.id);
        const newIndex = ids.indexOf(over!.id);
        const _items = arrayMove(items, oldIndex, newIndex);
        onChange(_items);
        return _items;
      });
    }

    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  useEffect(() => {
    setItems(dataSource);
  }, [dataSource])

  const getActiveContent = () => {
    const { content = '' } = { ...items.filter(item => item?.id === activeId) }[0]
    return content;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={3}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} content={item.content} onClick={props.onClick} />
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
        {activeId ? <Item id={activeId} content={getActiveContent()} isDragging onClick={props.onClick} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default GridDnD;
