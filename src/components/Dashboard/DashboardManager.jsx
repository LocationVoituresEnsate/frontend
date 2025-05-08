import React from 'react';
import { FaCarSide, FaUsers, FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { FiAlertCircle } from 'react-icons/fi';

const DashboardManager = () => {
  // Données fictives pour le tableau de bord
  const stats = [
    { id: 1, title: 'Voitures disponibles', value: '18', change: '+2', icon: <FaCarSide />, color: 'bg-green-100 text-green-600' },
    { id: 2, title: 'Réservations actives', value: '24', change: '+8', icon: <FaCalendarCheck />, color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Nouveaux clients', value: '7', change: '+3', icon: <FaUsers />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Revenus du mois', value: '9 750 €', change: '+12%', icon: <HiCurrencyDollar />, color: 'bg-amber-100 text-amber-600' },
  ];

  const recentReservations = [
    { id: 1, client: 'Mohammed Alaoui', car: 'Porsche 911', startDate: '05/05/2025', endDate: '08/05/2025', status: 'En cours', statusColor: 'bg-green-100 text-green-600' },
    { id: 2, client: 'Fatima Benani', car: 'Audi A5', startDate: '07/05/2025', endDate: '10/05/2025', status: 'À venir', statusColor: 'bg-blue-100 text-blue-600' },
    { id: 3, client: 'Karim Idrissi', car: 'Mercedes GLC', startDate: '03/05/2025', endDate: '06/05/2025', status: 'Terminée', statusColor: 'bg-gray-100 text-gray-600' },
    { id: 4, client: 'Leila Tahiri', car: 'BMW X5', startDate: '06/05/2025', endDate: '12/05/2025', status: 'À venir', statusColor: 'bg-blue-100 text-blue-600' },
    { id: 5, client: 'Youssef Benziane', car: 'Range Rover', startDate: '02/05/2025', endDate: '05/05/2025', status: 'Terminée', statusColor: 'bg-gray-100 text-gray-600' },
  ];

  const alerts = [
    { id: 1, message: 'Entretien nécessaire pour BMW X3 (MA-123456)', urgency: 'haute' },
    { id: 2, message: 'Renouvellement d\'assurance pour 3 véhicules', urgency: 'moyenne' },
    { id: 3, message: 'Contrôle technique prévu pour Mercedes E300', urgency: 'basse' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Dashboard Manager</h1>
        <div className="relative inline-block">
          <p className="text-fuchsia text-lg">Bienvenue dans votre espace de gestion</p>
          <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 300 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2C75 1 225 3 300 2" stroke="#D4006D" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-text mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-sm font-medium text-green-600">
              {stat.change} cette semaine
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Réservations récentes */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text">Réservations récentes</h2>
            <button className="text-fuchsia text-sm font-medium hover:underline">
              Voir toutes
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b">
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Voiture</th>
                  <th className="pb-3 font-medium">Période</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-gray-50 text-sm">
                    <td className="py-4 font-medium text-text">{reservation.client}</td>
                    <td className="py-4 text-gray-600">{reservation.car}</td>
                    <td className="py-4 text-gray-600">{reservation.startDate} - {reservation.endDate}</td>
                    <td className="py-4">
                      <span className={`${reservation.statusColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertes et notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-text mb-6">Alertes</h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start p-3 rounded-lg bg-gray-50">
                <div className={`
                  flex-shrink-0 mr-3 mt-1
                  ${alert.urgency === 'haute' ? 'text-red-500' : 
                    alert.urgency === 'moyenne' ? 'text-amber-500' : 'text-blue-500'}
                `}>
                  <FiAlertCircle size={18} />
                </div>
                <div>
                  <p className="text-sm text-text">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Urgence: {alert.urgency}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Graphique simple des réservations */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-text">Activité de réservation</h3>
              <FaChartLine className="text-fuchsia" />
            </div>
            <div className="h-40 flex items-end space-x-2">
              {[20, 35, 15, 45, 30, 50, 25].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary hover:bg-fuchsia transition-colors duration-300 rounded-t"
                    style={{ height: `${height * 2}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{`J${index + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Autres sections que vous pourriez ajouter */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-text">Véhicules les plus réservés</h2>
          <span className="text-sm text-gray-500">Dernier mois</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Premier véhicule */}
          <div className="bg-primary/10 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 bg-fuchsia/20 rounded-full flex items-center justify-center mr-4">
              <FaCarSide className="text-fuchsia" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-text">Porsche 911</h3>
              <p className="text-sm text-gray-500">18 réservations</p>
            </div>
            <div className="ml-auto">
              <span className="text-green-600 text-sm font-medium">+24%</span>
            </div>
          </div>
          
          {/* Deuxième véhicule */}
          <div className="bg-primary/10 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 bg-fuchsia/20 rounded-full flex items-center justify-center mr-4">
              <FaCarSide className="text-fuchsia" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-text">Range Rover Sport</h3>
              <p className="text-sm text-gray-500">15 réservations</p>
            </div>
            <div className="ml-auto">
              <span className="text-green-600 text-sm font-medium">+18%</span>
            </div>
          </div>
          
          {/* Troisième véhicule */}
          <div className="bg-primary/10 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 bg-fuchsia/20 rounded-full flex items-center justify-center mr-4">
              <FaCarSide className="text-fuchsia" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-text">Mercedes Classe S</h3>
              <p className="text-sm text-gray-500">12 réservations</p>
            </div>
            <div className="ml-auto">
              <span className="text-green-600 text-sm font-medium">+10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;