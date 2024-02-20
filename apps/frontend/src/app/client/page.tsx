"use client";

import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Navigation from '@ocmi/frontend/components/navigation/navigation';
import Pagination from '@ocmi/frontend/components/pagination/pagination';
import Card from '@ocmi/frontend/components/card/card';
import Modal from '@ocmi/frontend/components/modal/Modal';

interface Client {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  // Otros campos del cliente
}

/* eslint-disable-next-line */
export interface ClientProps {
  clients: Client[];
}

export default function ClientPage(props: ClientProps) {
  const [clients, setClients] = useState<Client[]>([]);

  const [totalItems, setTotalItems] = useState(0); // Cantidad total de clientes
  const [pageSize, setPageSize] = useState(10); // Tamaño de página
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Página actual
  const [showModal, setShowModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(0)


  const handleOpenModal = (clientId: number) => {
    setSelectedClientId(clientId);
    setShowModal(true);
  };

  const handleGeneratePaymentConfig = (clientId: string) => {
    //setShowModal(true)
  }
  const handlePageChange = ({ selected }: { selected: number }) => {
    console.log(selected);
    setCurrentPage(selected);
    // Aquí puedes cargar los datos de la página seleccionada desde la API
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clients');
        const data = await response.json();
        setClients(data.data);
        setCurrentPage(data.meta.page);
        setTotalItems(data.meta.itemCount)
        setPageSize(data.meta.take)
        setTotalPages(data.meta.pageCount);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchData();
  }, [currentPage]);


  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 bg-gray-200 p-4">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Empleados</h1>
            <a href='/new-client' className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Nuevo Empleado</a>
          </div>
          
        </Card>
        <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">id</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Direccion</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                {/* Agregar más columnas según los datos del cliente */}
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.firstname}</td>
                  <td>{client.lastname}</td>
                  <td>{client.address}</td>
                  <td>
                    <button onClick={() => handleOpenModal(client.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        {/* Icono de engranaje */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2 17.2l2-1.2m18-1.2l-2-1.2m-11-9.6V4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1zM7.5 4.5l1 2m8 0l-1-2m-9 0a3 3 0 004.5 2.598m4.5-2.598a3 3 0 11-4.5 0m0 0l-1-2m9 2l1-2M5.5 19.5l1-2m12 2l-1-2"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
        <Pagination
          pageCount={totalPages} // Número total de páginas
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
        </div>
        </Card>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onSubmit={() => {
            // Lógica para generar el nuevo payment config
              handleGeneratePaymentConfig('clientId');
              setShowModal(false);
            }}
            clientId={selectedClientId}
          />
        )}
      </div>
    </div>
   
  );
}
