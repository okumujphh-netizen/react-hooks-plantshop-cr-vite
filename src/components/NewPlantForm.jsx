
import React from "react";

function NewPlantForm({ onPlantAdded }) {

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newPlant = {
      name: formData.get("name"),
      image: formData.get("image"),
      price: formData.get("price"),
    };

    try {
  console.log("Submitting plant:", newPlant);

  const response = await fetch("http://localhost:6001/plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlant),
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error("Failed to add plant");
  }

  const createdPlant = await response.json();

  console.log("Created plant:", createdPlant);
  console.log("onPlantAdded:", onPlantAdded);

  onPlantAdded(createdPlant);

  event.target.reset();

} catch (error) {
  console.error("Error adding plant:", error);
}
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          required
        />

        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          required
        />

        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

