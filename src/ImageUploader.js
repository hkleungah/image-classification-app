import React, { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_GATEWAY_ENDPOINT = 'https://255nxunai5.execute-api.ca-central-1.amazonaws.com/dev';

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setResults(null)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    const requestOptions = {
      method: 'POST',
      body: formData
    };

    try {
      const response = await fetch(API_GATEWAY_ENDPOINT, requestOptions);
      const data = await response.json();

      setResults(data);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
      {preview && <img src={preview} alt="preview" width="200" />}
      {results && (
        <div>
          <h3>Results:</h3>
          <ul>
            {results.sorted_labels.map((label, index) => (
              <li key={index}>
                {label}: {(results.sorted_probs[index] * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
