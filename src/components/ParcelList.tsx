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
        <div className="overflow-x-auto shadow-sm rounded-xl">
            <table className="min-w-full bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/30">
                <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
                    <tr className="border-b border-gray-100">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Weight (kg)</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {parcels.map((parcel) => (
                        <tr key={parcel.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
                                        <span className="text-blue-600 font-medium">{parcel.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">{parcel.name}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-600 max-w-xs truncate">{parcel.description || 'No description'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {parcel.quantity} pcs
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-900">{parcel.weight}</span>
                                    <span className="ml-1 text-sm text-gray-500">kg</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button
                                    onClick={() => onEdit(parcel.id)}
                                    className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(parcel.id)}
                                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
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
