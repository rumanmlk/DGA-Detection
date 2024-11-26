import React from 'react';
import { Upload, Shield, Info, ArrowRight, Check } from 'lucide-react';
import Card from '../../components/card';
import CardContent from '../../components/cardContent';
import Navbar from '../../components/navbar';
import {Link} from "react-router-dom"
const Homepage = () => {
  return (
    
  
   
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Detect Malicious Domains with AI</h1>
            <p className="text-xl mb-8 opacity-80">
              Advanced AI-powered platform to identify and protect against malware domains.
            </p>
           <Link to ="/analyze">
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center mx-auto hover:bg-blue-800 transition-colors">
              Start Detection <ArrowRight className="ml-2" />
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Advanced Detection</h3>
                <p className="text-gray-600">
                  Cutting-edge AI to identify malicious domains with high precision.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Integration</h3>
                <p className="text-gray-600">
                  Seamless interface for analyzing domain data efficiently.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="text-center">
                <Info className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Results</h3>
                <p className="text-gray-600">
                  Provide status of domain in a few seconds
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ step: 1, text: "Enter the domain" }, { step: 2, text: "AI analyzes domain activity" }, { step: 3, text: "Show the state of domain" }].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <p className="font-medium text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why It Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">90%+</h3>
              <p className="text-gray-600">Detection Accuracy</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">1M+</h3>
              <p className="text-gray-600">Domains Analyzed</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">&lt;5s</h3>
              <p className="text-gray-600">Processing Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Get Started Now</h2>
          <div className="max-w-xl mx-auto">
            <Card className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="space-y-4 text-gray-800">
                  <div className="flex items-center">
                    <Check className="text-green-500 mr-3" />
                    <p>No registration required</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-500 mr-3" />
                    <p>Free for basic usage</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-500 mr-3" />
                    <p>Supports all domain formats</p>
                  </div>
               <Link to ="/analyze">   <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-colors">
                    Try It Now
                  </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    
  );

};

export default Homepage;
