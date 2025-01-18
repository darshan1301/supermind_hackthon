import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KundaliChart = ({ birthdate }) => {
  const [kundali, setKundali] = useState(null);
  const [error, setError] = useState(null);
  const url = `http://localhost:3000/generateKundali?birthdate=${birthdate}`;
  useEffect(() => {
    const fetchKundali = async () => {
      try {
        const response = await axios.get(url);
        setKundali(response.data);
      } catch (err) {
        setError('Error fetching Kundali data');
      }
    };

    if (birthdate) {
      fetchKundali();
    }
  }, [birthdate]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!kundali) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="text-center mt-12">
      <h2 className="text-3xl font-semibold mb-4">Kundali Chart for Birthdate: {birthdate}</h2>
      <div className="text-xl font-medium mb-6">
        <h3>Life Path Number: {kundali.lifePathNumber}</h3>
      </div>
      <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
        {kundali.kundaliChart.map((houseValue, index) => (
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg" key={index}>
            <div className="text-lg font-semibold">House {index + 1}</div>
            <div className="text-2xl font-bold mt-2">{houseValue}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KundaliChart;