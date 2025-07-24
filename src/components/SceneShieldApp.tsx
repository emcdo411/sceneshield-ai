import React from 'react';
import { SceneShieldProvider } from '@/contexts/SceneShieldContext';
import SceneAlert from './SceneAlert';
import ControlPanel from './ControlPanel';
import MonitoringStatus from './MonitoringStatus';
import SceneLog from './SceneLog';
import { useSceneSimulator } from '@/hooks/useSceneSimulator';
import { Shield } from 'lucide-react';

const SceneShieldContent: React.FC = () => {
  useSceneSimulator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SceneAlert />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SceneShield AI
              </h1>
              <p className="text-gray-600">Real-time content monitoring and parental controls</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ControlPanel />
            <MonitoringStatus />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2">
            <SceneLog />
          </div>
        </div>
        
        {/* Demo Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Demo Mode</h3>
          <p className="text-blue-800">
            This is a prototype demonstration. In a real implementation, SceneShield would:
          </p>
          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>• Connect to live audio/video streams</li>
            <li>• Use OpenAI Whisper for real-time transcription</li>
            <li>• Run NSFW.js or TensorFlow models for image analysis</li>
            <li>• Provide actual content filtering and parental controls</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const SceneShieldApp: React.FC = () => {
  return (
    <SceneShieldProvider>
      <SceneShieldContent />
    </SceneShieldProvider>
  );
};

export default SceneShieldApp;