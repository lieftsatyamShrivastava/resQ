/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

function page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState(""); // State for user-defined prompt

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.10.20.118:8182/ai/", {
        method: "POST",
        body: JSON.stringify({
          data: "question", // Replace with your actual data type if needed
          prompt: prompt, // Include user-defined prompt
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Set error message in state
    }
  };

  // Fetch data when the prompt changes (user types and presses Enter)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        fetchData();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown); // Cleanup
  }, [prompt]); // Dependency on prompt state

  return (
    <div>
      {error ? (
        <p className="error-message">{error}</p> // Display error message
      ) : data ? (
        <div className='bg-blue-300 flex justify-center'>
          <Markdown>{data}</Markdown>
        </div>
      ) : (
        <p>Loading data...</p> // Display loading message while fetching
      )}

      <div className="prompt-container">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs"
          value={prompt} // Use state value for input
          onChange={(event) => setPrompt(event.target.value)} // Update prompt state
        />
        <button onClick={() => fetchData()}>Submit</button> </div>
    </div>
  );
}

export default page;
