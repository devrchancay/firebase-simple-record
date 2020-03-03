import React from 'react';

interface ModalProps {
  title: string;
  onAccept: (title: string) => void;
  onCancel: () => void;
}

const Modal = ({ title, onAccept, onCancel }: ModalProps) => {
  const [filename, setFilename] = React.useState(
    () => `nueva grabacion ${new Date().toISOString()}`
  );
  return (
    <div className="z-50 w-screen h-screen absolute top-0 left-0 bg-gray-900 flex justify-center content-center items-center">
      <div className="w-full md:w-2/3 shadow-lg bg-gray-400 px-4 py-4">
        <p className="p-4 text-center font-bold">{title}</p>
        <input
          type="text"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={filename}
          onChange={evt => {
            setFilename(evt.target.value);
          }}
        />
        <div className="w-full  mt-4 flex justify-end py-2">
          <button
            onClick={() => {
              onAccept(filename);
            }}
            className="mx-2 border rounded-full px-2 py-2 bg-green-500 text-white border-green-700 border-2"
          >
            Guardar
          </button>
          <button
            onClick={onCancel}
            className="mx-2 border rounded-full px-2 py-2 text-white bg-red-500 border-red-700 border-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
