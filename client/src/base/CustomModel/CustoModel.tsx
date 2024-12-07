import React from 'react';

interface CustomPopupProps {
  isOpen: boolean;
  title: string;
  description?: string;
  inputLabel?: string;
  onConfirm: (inputValue?: string) => void;
  onCancel: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  isOpen,
  title,
  description,
  inputLabel,
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-md shadow-md w-1/3 p-5">
        <h2 className="text-lg font-bold">{title}</h2>
        {description && <p className="my-3">{description}</p>}
        {inputLabel && (
          <div className="my-4">
            <label className="block mb-2">{inputLabel}</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => onConfirm(inputValue)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
