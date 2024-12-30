import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Item = ({ id, title, description, image, price }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="itemCard"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <img src={image} alt={`Image of ${title}`} className="itemImage" />
      <div className="itemInfo">
        <h2 className="itemTitle">{title}</h2>
        <p className="itemDesc">{description}</p>
        <p className="itemPrice">{price}</p>
      </div>
    </div>
  );
};

export default Item;
