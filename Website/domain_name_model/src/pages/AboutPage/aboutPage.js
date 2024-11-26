import React from 'react';
import { Shield, Network, Target, Search } from 'lucide-react';
import Navbar from '../../components/navbar';

const AboutPage = () => {
  const InfoSection = ({
    title,
    description,
    points,
    icon: Icon,
    color,
    imageSrc,
    imageAlt,
    reverse = false,
  }) => (
    <div className={`flex items-center gap-8 mb-16 ${reverse ? 'flex-row-reverse' : ''}`}>
      {/* Image Container */}
      <div className="w-1/2 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
      </div>

      {/* Content Container */}
      <div className="w-1/2 bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-all duration-300">
        <div className={`p-3 rounded-full mb-4 ${color} bg-opacity-10 inline-block`}>
          <Icon className="w-8 h-8" />
        </div>
        <h2 className={`text-2xl font-bold mb-4 ${color}`}>{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="space-y-2 text-gray-600">
          {points.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r pb-2 from-blue-600 to-indigo-600 mb-4">
              Malware Domains & DGA Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the intricate world of malicious domains and understand how cybercriminals leverage sophisticated techniques to compromise digital security.
            </p>
          </div>

          {/* Staggered Sections */}
          <div className="space-y-16">
            <InfoSection
              title="Malware Domains"
              description="Digital traps designed to compromise your online safety and spread harmful software."
              points={[
                'Hosts malicious websites and email servers',
                'Key infrastructure for cyberattacks',
                'Primary vector for ransomware and phishing',
              ]}
              icon={Shield}
              color="text-red-600"
              imageSrc="/images/image2.png"
              imageAlt="Malware Domains Visualization"
            />

            <InfoSection
              title="Domain Generation Algorithms"
              description="Automated systems creating dynamic domains to evade detection and maintain malicious networks."
              points={[
                'Dynamically generates new domains',
                'Enables persistent botnet communication',
                'Complicates cybersecurity defense strategies',
              ]}
              icon={Network}
              color="text-purple-600"
              imageSrc="/images/image3.png"
              imageAlt="DGA Network Visualization"
              reverse={true}
            />

            <InfoSection
              title="Threat Detection"
              description="Proactive identification and neutralization of potential cyber threats before they cause damage."
              points={[
                'Prevents data breaches',
                'Stops financial fraud attempts',
                'Protects sensitive organizational information',
              ]}
              icon={Target}
              color="text-green-600"
              imageSrc="/images/image1.png"
              imageAlt="Cybersecurity Threat Detection"
            />

            {/* <InfoSection
              title="AI-Powered Detection"
              description="Cutting-edge machine learning algorithms that continuously learn and adapt to new malicious patterns."
              points={[
                'Identifies complex domain generation patterns',
                'Analyzes traffic and behavioral anomalies',
                'Provides real-time threat intelligence',
              ]}
              icon={Search}
              color="text-blue-600"
              imageSrc="/api/placeholder/600/400"
              imageAlt="AI Cybersecurity Detection"
              reverse={true}
            /> */}
          </div>
          <div className="text-center mt-16 bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-blue-700 mb-4">AI-Powered Detection</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
            <ul>
                <li>Identifies complex domain generation patterns</li>
                <li>Provides real-time threat intelligence</li>
                <li>Analyzes traffic and behavioral anomalies',</li>
            </ul>
            </p>
          </div>
          {/* Closing Section */}
          <div className="text-center mt-16 bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Stay Vigilant, Stay Secure</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding malware domains and DGAs is the first step in building a robust cybersecurity strategy.
              Continuous learning, advanced detection techniques, and proactive measures are key to maintaining digital safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
