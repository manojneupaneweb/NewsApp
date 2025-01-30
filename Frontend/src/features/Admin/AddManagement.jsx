import React, { useState } from 'react';

const AddManagement = () => {
  const [ads, setAds] = useState([
    { id: 1, title: 'Ad 1', description: 'Description for Ad 1' },
    { id: 2, title: 'Ad 2', description: 'Description for Ad 2' },
    { id: 3, title: 'Ad 3', description: 'Description for Ad 3' },
  ]);

  const addAd = () => {
    const newAd = { id: Date.now(), title: 'New Ad', description: 'Description for new ad' };
    setAds([...ads, newAd]);
  };

  const editAd = (id) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id ? { ...ad, title: 'Updated Ad', description: 'Updated description' } : ad
    );
    setAds(updatedAds);
  };

  const deleteAd = (id) => {
    const filteredAds = ads.filter((ad) => ad.id !== id);
    setAds(filteredAds);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Advertisements</h2>

      <button
        onClick={addAd}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6 hover:bg-blue-600"
      >
        Add New Advertisement
      </button>

      <div className="space-y-4">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{ad.title}</h3>
              <p className="text-gray-600">{ad.description}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => editAd(ad.id)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAd(ad.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddManagement;
