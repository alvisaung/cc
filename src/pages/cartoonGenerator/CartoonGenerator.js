import React, { useState } from "react";

const CartoonGenerator = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [cartoonUrl, setCartoonUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateCartoon = async () => {
    setIsLoading(true);
    const response = await fetch("https://api.deepart.io/v1/styletransfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "YOUR_API_KEY_HERE",
      },
      body: JSON.stringify({
        style: "cartoon",
        content: photoUrl,
      }),
    });
    const data = await response.json();
    setCartoonUrl(data.output_url);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Cartoon Generator</h1>
      <input type="file" onChange={handlePhotoUpload} />
      <button onClick={handleGenerateCartoon} disabled={!photoUrl || isLoading}>
        Generate Cartoon
      </button>
      {isLoading && <p>Loading...</p>}
      {cartoonUrl && <img src={cartoonUrl} alt="Cartoon" />}
    </div>
  );
};

export default CartoonGenerator;
