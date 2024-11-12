import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";


function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/ZippyKitche/react-hooks-cc-plantshop/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
      });
  }, []);

function onAddPlant(newPlant){
  setPlants([...plants, newPlant]);
}

const filteredPlants = plants.filter((plant) => 
plant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

function onSearch(term){
  setSearchTerm(term);
}

const onUpdatePrice = (id, newPrice) => { 
  fetch(`https://my-json-server.typicode.com/ZippyKitche/react-hooks-cc-plantshop/plants/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ price: newPrice }),
  })
  .then((response) => response.json())
  .then((updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  })
  .catch((error) => console.error('Error updating price:', error));
};

const onDelete = (id) => {
  fetch(`https://my-json-server.typicode.com/ZippyKitche/react-hooks-cc-plantshop/plants/${id}`, {
     method: 'DELETE',
     })
    .then(() => {
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    })
    .catch((error) => console.error('Error deleting plant:', error));
};

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant}/>
      <Search onSearch={onSearch} />
      <PlantList plants={filteredPlants} onUpdatePrice={onUpdatePrice} onDelete={onDelete} />
    </main>
  );
}

export default PlantPage;
