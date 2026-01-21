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
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Parcel Management</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!isAdding ? (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add New Parcel
                </button>
              </div>
              <ParcelList
                parcels={parcels}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              <ParcelForm
                initialData={editingParcel}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
