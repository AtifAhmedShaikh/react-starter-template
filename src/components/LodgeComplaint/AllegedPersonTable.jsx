import { DeleteIcon } from "lucide-react";
import React from "react";


const AllegedPersonTable = ({ allegedFields, setAllegedFields }) => {

    const handleDelete = (index) => {
    const updatedList = allegedFields.filter((_, i) => i !== index);
    setAllegedFields(updatedList);
  };

  return (
    <div className="border rounded-md shadow p-4 bg-white">
      <h3 className="text-lg font-semibold mb-4">Alleged Persons List</h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Additional Info</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allegedFields.map((person, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-2">{person.name || <span className="text-xs text-gray-500">Not Provided</span>}</td>
                <td className="px-4 py-2">{person.designation || <span className="text-xs text-gray-500">Not Provided</span>}</td>
                <td className="px-4 py-2">
                  {person.departmentId || <span className="text-xs text-gray-500">Not Provided</span>}
                </td>
                <td className="px-4 py-2">{person.phoneNumber}</td>
                <td className="px-4 py-2">{person.address || <span className="text-xs text-gray-500">Not Provided</span>}</td>
                <td className="px-4 py-2">{person.additionalInfo || <span className="text-xs text-gray-500">None</span>}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {allegedFields.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  No alleged persons added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllegedPersonTable;
