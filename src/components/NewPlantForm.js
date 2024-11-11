import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {
const [formData, setFormData] = useState({name: "", image: "", price: ""});

function handleSubmit(event){
  event.preventDefault();
 fetch("https://my-json-server.typicode.com/ZippyKitche/react-hooks-cc-plantshop/plants", {
  method: "POST",
  headers: {
    "Content-Type": "Application/JSON",
  },
  body: JSON.stringify(formData),
 })
 .then((response) => response.json())
 .then((newPlant) => {
  onAddPlant(newPlant);
  setFormData({ name: "", image: "", price: "" });
 });
}

function handleChange(e){
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
}

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit= {handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
