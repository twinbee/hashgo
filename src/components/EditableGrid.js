
import React, { useState } from 'react';

const EditableGrid = ({ data, onSave }) => {
  const [gridData, setGridData] = useState(data);

  const handleEdit = (rowIndex, column, value) => {
    const updatedData = [...gridData];
    updatedData[rowIndex][column] = value;
    setGridData(updatedData);
  };

  const handleSave = () => {
    onSave(gridData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(gridData[0]).map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([col, value]) => (
                <td key={col}>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleEdit(rowIndex, col, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditableGrid;
