import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X, Shield } from 'lucide-react';
import { useSceneShield } from '@/contexts/SceneShieldContext';

const SceneAlert: React.FC = () => {
  const { currentScene, dismissAlert, settings } = useSceneShield();

  if (!currentScene) return null;

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'border-red-500 bg-red-50 text-red-900';
    if (score >= 6) return 'border-orange-500 bg-orange-50 text-orange-900';
    return 'border-yellow-500 bg-yellow-50 text-yellow-900';
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96 max-w-[90vw]">
      <Alert className={`${getRiskColor(currentScene.riskScore)} border-2 shadow-lg animate-pulse`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold">PARENTAL WARNING</AlertTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissAlert}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <p className="font-semibold">{currentScene.alert}</p>
            <p className="text-sm">Scene: {currentScene.scene}</p>
            <div className="flex flex-wrap gap-1">
              {currentScene.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/50 rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Risk Score: {currentScene.riskScore}/10</span>
              {settings.safeMode && (
                <span className="text-blue-600 font-medium">Safe Mode Active</span>
              )}
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SceneAlert;