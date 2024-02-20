"use client";
import React from 'react';
import Link from 'next/link';
import Navigation from '@ocmi/frontend/components/navigation/navigation';

/* eslint-disable-next-line */
export interface DashboardProps { }

export default function Dashboard(props: DashboardProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
   
      <Navigation />
      {/* Main content */}
      <div className="flex-1 bg-gray-200 p-4">
        {/* Contenido del dashboard */}
        <h1 className="text-2xl font-semibold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet felis vitae neque viverra porttitor.</p>
      </div>
    </div>
  );
}
