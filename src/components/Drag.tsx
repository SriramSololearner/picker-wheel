import React, { useState } from "react";
const items = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
  { id: "5", content: "Item 5" },
];

const MyArray = () => {
  const [itemsState, setItemsState] = useState(items);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragEnter = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setItemsState((prevState) => {
      const newState = [...prevState];
      const [movedItem] = newState.splice(
        parseInt(event.dataTransfer.getData("text/plain")),
        1
      );
      newState.splice(index, 0, movedItem);
      return newState;
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setItemsState((prevState) => {
      const newState = [...prevState];
      const [movedItem] = newState.splice(
        parseInt(event.dataTransfer.getData("text/plain")),
        1
      );
      newState.splice(index, 0, movedItem);
      return newState;
    });
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setItemsState((prevState) => {
      const newState = [...prevState];
      const [movedItem] = newState.splice(index, 1);
      newState.splice(
        parseInt(event.dataTransfer.getData("text/plain")),
        0,
        movedItem
      );
      return newState;
    });
  };

  return (
    <div>
      {itemsState.map((item, index) => (
        <div
          key={item.id}
          data-index={index}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnter={(event) => handleDragEnter(event, index)}
          onDragOver={handleDragOver}
          onDragLeave={(event) => handleDragLeave(event, index)}
          onDrop={(event) => handleDrop(event, index)}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default MyArray;
