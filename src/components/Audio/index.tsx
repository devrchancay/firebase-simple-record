import React from 'react';

interface AudioProps {
  filename: string;
  isActive: boolean;
  date: any;
}

const Audio = ({ filename, isActive, date }: AudioProps) => {
  return (
    <div
      className={`w-full h-20 border-gray-200 flex cursor-pointer ${
        isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-800'
      }`}
    >
      <div className="w-5/6">
        <div className="w-full h-full pl-1">
          <p className="text-white text-lg">{filename}</p>
          {date && (
            <p className="m-0 text-gray-700">
              {date.toDate().toLocaleString()}{' '}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Audio;
