import React from 'react';

interface AudioProps {
  id: string;
  filename: string;
  isActive: boolean;
  date: any;
  updateName: (id: string, filename: string) => void;
}

const Audio = ({ id, filename, isActive, date, updateName }: AudioProps) => {
  const changeNameAction = () => {
    const value = window.prompt(`Edite el nombre`, filename);

    if (value && value !== filename) {
      updateName(id, value);
    }
  };

  return (
    <div
      className={`w-full h-20 border-gray-200 flex cursor-pointer ${
        isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-800'
      }`}
    >
      <div className="w-5/6">
        <div className="w-full h-full pl-1">
          <p className="text-white text-lg flex justify-between ml-2">
            <span>{filename}</span>
            <span onClick={changeNameAction} className="underline text-sm ml-8">
              Cambiar nombre
            </span>
          </p>

          {date && (
            <p className="m-0 text-gray-700 ml-2">
              {new Date(date).toLocaleString()}{' '}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Audio;
