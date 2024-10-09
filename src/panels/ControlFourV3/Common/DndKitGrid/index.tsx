import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { Layout } from "../Layout";

const DndKitGrid = forwardRef((props: any, ref) => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
  ]);

  useEffect(() => {
    if (props.dataSource && props.dataSource.length) {
      setItems(props.dataSource.map((item, index: number) => ({ id: index + '', item })))
    }
  }, [props.dataSource])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5
      }
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const newItems = (items).map((item: any) => item.id)
        const oldIndex = newItems.indexOf(active.id);
        const newIndex = newItems.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getValue = () => {
    return items.map((v: any) => v.item);
  }

  useImperativeHandle(ref, () => ({ getValue }))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {items.length ? <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map(({ item, id }, index) => (
            <SortableItem key={id} id={id} handle={true} value={id}>
              <div className="my-screen-selected" key={`my-screen-${id}`} >
                <Layout
                  style={{ width: 95, height: 95 }}
                  selected={item}
                  width={32}
                  height={32}
                  isPreview={true}
                  isCanDelete={true}
                  onDelete={() => {
                    let _items: any = [...items];
                    _items.splice(index, 1);
                    setItems(_items)
                  }}
                />
              </div>
            </SortableItem>
          ))}
          <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: 100,
                  height: 100,
                  background: '#ccc',
                  opacity: 0.3
                }}
              ></div>
            ) : null}
          </DragOverlay>
        </SortableContext> : <></>}
      </div>
    </DndContext>
  );
});

export default DndKitGrid;