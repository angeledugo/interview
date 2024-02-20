import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable-next-line */
export interface ModalProps {
  onClose: () => void;
  onSubmit: (paymentType: string, amount: number) => void;
  clientId: number;
}

export function Modal(props: ModalProps) {
  const [paymentType, setPaymentType] = useState('hour');
  const [amount, setAmount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/payment/payment-config/client/${props.clientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Envía el token en la cabecera
        },
        body: JSON.stringify({ paymentType, amount }),
      });

      if (!response) {
        throw new Error('Error al enviar los datos');
      }

        setShowNotification(true);
        toast.success('Nueva configuracion de pago creada!', {
          onClose: () => setShowNotification(false),
        });

        

      // Si la respuesta es exitosa, cierra el modal
      setTimeout(() => {
        props.onClose();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Nuevo Payment Config</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Pago</label>
            <select  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
             value={paymentType}
             onChange={(e) => setPaymentType(e.target.value)}>
              <option value="hour">Por Horas</option>
              <option value="monthly">Mensual</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Monto</label>
            <input
              type="number"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={props.onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      {showNotification && (
        <div className="fixed top-0 right-0 p-4 m-4 bg-green-500 text-white rounded shadow-md">
          Client saved successfully!
        </div>
      )}
    </div>
    
  );
}

export default Modal;
