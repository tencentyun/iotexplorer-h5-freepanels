import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style: any = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};

export default SortableItem;
