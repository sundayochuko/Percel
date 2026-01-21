import type { Parcel } from '../types/parcel';

interface ParcelListProps {
    parcels: Parcel[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ParcelList = ({ parcels, onEdit, onDelete }: ParcelListProps) => {
    if (parcels.length === 0) {
        return <div className="text-center text-gray-500 mt-8">No parcels found</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {parcels.map((parcel) => (
                        <tr key={parcel.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{parcel.name}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 max-w-xs truncate">{parcel.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{parcel.quantity}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{parcel.weight}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(parcel.id)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(parcel.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
