import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./App.css";
import NavBar from "./components/NavBar";
import axios from "axios";
import ItemList from "./components/ItemList ";
import Pagination from "./components/Pagination";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [itemsLoaded, setItemsLoaded] = useState(false);

  useEffect(() => {
    if (isVerified && !itemsLoaded) {
      async function fetchItems() {
        try {
          const response = await axios.get("https://fakestoreapi.com/products");
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setItemsLoaded(true);
        }
      }
      fetchItems();
    }
  }, [isVerified, itemsLoaded]);

  const handleReCAPTCHAVerify = (token) => {
    if (token) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const handleLogout = () => {
    setIsVerified(false);
    setItems([]);
    setItemsLoaded(false);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  if (!isVerified) {
    return (
      <div className="signupContainer">
        <div className="text-center recaptcha-container">
          <ReCAPTCHA
            sitekey="6LcfZqcqAAAAAEregqtTrjVsYdIDOEySzVe5geOs"
            onChange={handleReCAPTCHAVerify}
          />
          <p>Please complete the CAPTCHA to access the application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main_container">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <NavBar setQuery={setQuery} />

      <button
        onClick={() => setItemsLoaded(false)}
        disabled={itemsLoaded}
        className="load-items-btn"
      >
        {itemsLoaded ? "Items Loaded" : "Load Items"}
      </button>

      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <ItemList items={paginatedItems} />
      </DndContext>
      <Pagination
        itemsPerPage={itemsPerPage}
        dataLength={filteredItems.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
