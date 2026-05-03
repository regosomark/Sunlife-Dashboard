import { useState, useEffect } from 'react';
import TeamDashboard from './components/TeamDashboard';
import AdvisorDetail from './components/AdvisorDetail';
import ClientDetail from './components/ClientDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'advisor' | 'client'>('dashboard');
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedAdvisorId(null);
    setSelectedClientId(null);
  };

  const navigateToAdvisor = (advisorId: string) => {
    setSelectedAdvisorId(advisorId);
    setCurrentPage('advisor');
  };

  const navigateToClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentPage('client');
  };

  return (
    <div className="size-full bg-gray-50 overflow-auto">
      {currentPage === 'dashboard' && (
        <TeamDashboard onNavigateToAdvisor={navigateToAdvisor} />
      )}
      {currentPage === 'advisor' && selectedAdvisorId && (
        <AdvisorDetail
          advisorId={selectedAdvisorId}
          onNavigateBack={navigateToDashboard}
          onNavigateToClient={navigateToClient}
        />
      )}
      {currentPage === 'client' && selectedClientId && (
        <ClientDetail
          clientId={selectedClientId}
          onNavigateBack={() => setCurrentPage('advisor')}
        />
      )}
    </div>
  );
}
