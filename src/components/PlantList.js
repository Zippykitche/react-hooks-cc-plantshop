import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onUpdatePrice, onDelete}) {
  return (
    <ul className="cards">
      {plants.map((plant, index) => (
        <PlantCard key={plant.id || index} 
        plant={plant}
        onUpdatePrice={onUpdatePrice}
        onDelete={onDelete}
          />
      ))}
    </ul>
  );
}

export default PlantList;
