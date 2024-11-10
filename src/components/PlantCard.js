import React, {useState} from "react";

function PlantCard({plant, onUpdatePrice, onDelete}) {
  const [isInStock, setIsInStock] = useState("InStock");
  
  function handleClick(){
    setIsInStock(!isInStock);
  }

  const handleUpdatePrice = () => {
    const newPrice = prompt("Enter the new price for this plant:", plant.price);
    if (newPrice) {
      const parsedPrice = parseFloat(newPrice);
      if (!isNaN(parsedPrice)) {
        onUpdatePrice(plant.id, parsedPrice);
      } else {
        alert("Please enter a valid price.");
      }
    }
  };

   const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${plant.name}?`)) {
      onDelete(plant.id);
    }
  };


  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleClick}>
          In Stock
        </button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleUpdatePrice}>Update Price</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
