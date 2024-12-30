import Item from "./Item";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

const ItemList = ({ items }) => {
  return (
    <div className="itemGrid">
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <Item
            key={item.id}
            title={item.title.slice(0, 20)}
            description={item.description.slice(0, 40)}
            image={item.image}
            id={item.id}
            price={`${item.price}`}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default ItemList;
