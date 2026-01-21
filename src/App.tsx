import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Parcel, ParcelFormData } from './types/parcel';
import { ParcelList } from './components/ParcelList';
import { ParcelForm } from './components/ParcelForm';

function App() {
  const [parcels, setParcels] = useState<Parcel[]>(() => {
    const saved = localStorage.getItem('parcels');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingParcel, setEditingParcel] = useState<Parcel | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Save to localStorage whenever parcels change
  const updateParcels = (newParcels: Parcel[]) => {
    setParcels(newParcels);
    localStorage.setItem('parcels', JSON.stringify(newParcels));
  };

  const handleAdd = () => {
    setEditingParcel(null);
    setIsAdding(true);
  };

  const handleEdit = (id: string) => {
    const parcel = parcels.find(p => p.id === id);
    if (parcel) {
      setEditingParcel(parcel);
      setIsAdding(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this parcel?')) {
      updateParcels(parcels.filter(parcel => parcel.id !== id));
    }
  };

  const handleSubmit = (data: ParcelFormData) => {
    if (editingParcel) {
      // Update existing parcel
      updateParcels(
        parcels.map(parcel =>
          parcel.id === editingParcel.id ? { ...data, id: editingParcel.id } : parcel
        )
      );
    } else {
      // Add new parcel
      updateParcels([...parcels, { ...data, id: uuidv4() }]);
    }
    setIsAdding(false);
    setEditingParcel(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingParcel(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 mb-6 md:mb-8 border border-white/50">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">📦 Parcel Management</h1>
          <p className="text-gray-600 mt-1">Manage your parcels with ease</p>
        </header>

        <main className="space-y-6">
          {!isAdding ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/50">
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Your Parcels</h2>
                  <button
                    onClick={handleAdd}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Parcel
                  </button>
                </div>
                <ParcelList
                  parcels={parcels}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto border border-white/50">
              <div className="p-6">
                <ParcelForm
                  initialData={editingParcel}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
