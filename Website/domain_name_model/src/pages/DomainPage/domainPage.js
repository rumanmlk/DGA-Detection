import React, { useState } from 'react';
import { AlertCircle, Globe, CheckCircle, XCircle } from 'lucide-react';

const SimpleCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

const SimpleCardContent = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

const DomainInputPage = () => {
  const [domainName, setDomainName] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setDomainName(e.target.value);
    setError('');
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!domainName) {
      setError('Domain name cannot be empty.');
      return;
    }

    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domainName)) {
      setError('Please enter a valid domain name (e.g., example.com).');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domainName }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.predicted_class);
      } else {
        setError(data.error || 'An error occurred while analyzing the domain.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-12">
      <div className="w-full max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Domain Security Analysis
        </h1>

        <SimpleCard className="mb-6">
          <SimpleCardContent>
            <div className="flex items-center space-x-4 mb-6 bg-gradient-to-r from-blue-100 to-blue-300 p-4 rounded-xl">
              <Globe className="w-8 h-8 text-indigo-600" />
              <input
                type="text"
                placeholder="Enter domain name (e.g., example.com)"
                value={domainName}
                onChange={handleInputChange}
                className="flex-1 p-4 text-lg border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </SimpleCardContent>
        </SimpleCard>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className={`w-full mt-6 py-3 rounded-lg text-white text-lg ${
            isAnalyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          }`}
        >
          {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
        </button>

        {result !== null && (
          <div
            className={`mt-8 p-6 rounded-lg text-center text-white font-bold ${
              result === 1 ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {result === 1 ? (
              <>
                <CheckCircle className="inline-block w-6 h-6 mr-2" />
                Benign Domain
              </>
            ) : (
              <>
                <XCircle className="inline-block w-6 h-6 mr-2" />
                Malware Domain
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainInputPage;
