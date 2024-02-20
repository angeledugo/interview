"use client"
import Card from '@ocmi/frontend/components/card/card';
import Navigation from '@ocmi/frontend/components/navigation/navigation';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Companies {
  id: number;
  name: string;  
  // Otros campos del cliente
}

/* eslint-disable-next-line */
export interface NewClientProps { }

export default function NewClient(props: NewClientProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }


    // Realiza una solicitud GET para obtener todas las compañías
    fetch('http://localhost:3000/api/company',{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        return response.json();
      })
      .then(data => {
        setCompanies(data.data);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);



  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      companyId: ''
    }, onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response) {
          throw new Error('Error saving client');
        }

        setShowNotification(true);
        toast.success('Client saved successfully!', {
          onClose: () => setShowNotification(false),
        });
        // Redirigir a la página de listado de clientes después de guardar
        // window.location.href = '/clients';
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while saving the client.');
      }
    },
    validate: (values) => {
      const errors: any = {};
      // Agrega tus validaciones aquí si es necesario
      if (!values.firstname) {
        errors.firstname = 'Required';
      }
      if (!values.lastname) {
        errors.lastname = 'Required';
      }
      if (!values.email) {
        errors.email = 'Required';
      }
      return errors;
    },
  });

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 bg-gray-200 p-4">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Empleados</h1>
            <a href='/client' className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Volver</a>
          </div>
        </Card>
        <Card>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className="block mb-1">Nombre completo</label>
              <input type="text" id="firstname" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded" />
              {formik.touched.firstname && formik.errors.firstname && <div className="text-red-500">{formik.errors.firstname}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block mb-1">Apellido</label>
              <input type="text" id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded" />
              {formik.touched.lastname && formik.errors.lastname && <div className="text-red-500">{formik.errors.lastname}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1">Dirección</label>
              <input type="text" id="address" name="address" value={formik.values.address} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded" />
              {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block mb-1">Compañia</label>
              <select
                id="companyId"
                name="companyId"
                className="w-full px-3 py-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.companyId}
              >
                <option value="">Select a company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
          </form>
           {/* Notificación */}
            {showNotification && (
              <div className="fixed top-0 right-0 p-4 m-4 bg-green-500 text-white rounded shadow-md">
                Client saved successfully!
              </div>
            )}
        </Card>
      </div>
    </div>
  );
}
