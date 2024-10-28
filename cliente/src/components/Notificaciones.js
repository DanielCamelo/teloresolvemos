// src/pages/notificaciones.js
import React from 'react';

const Notificaciones = ({ notifications }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
      <h3 className="font-bold text-lg mb-2">Notificaciones</h3>
      <ul className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="text-gray-700 text-sm border-b border-gray-200 pb-2">
              {notification}
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-sm">No hay notificaciones</li>
        )}
      </ul>
    </div>
  );
};

export default Notificaciones;