import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Mic, Camera, Volume2 } from 'lucide-react';
import { useSceneShield } from '@/contexts/SceneShieldContext';

const MonitoringStatus: React.FC = () => {
  const { isMonitoring, settings } = useSceneShield();

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Main Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-6 w-6 ${isMonitoring ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="font-semibold">
                {isMonitoring ? 'Active Monitoring' : 'Inactive'}
              </span>
            </div>
            <Badge variant={isMonitoring ? 'default' : 'secondary'}>
              {isMonitoring ? 'ON' : 'OFF'}
            </Badge>
          </div>

          {/* Active Features */}
          {isMonitoring && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Active Features</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mic className="h-4 w-4 text-blue-600" />
                  <span>Audio Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="h-4 w-4 text-purple-600" />
                  <span>Visual Detection</span>
                </div>
                {settings.autoMute && (
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="h-4 w-4 text-orange-600" />
                    <span>Auto Mute</span>
                  </div>
                )}
                {settings.safeMode && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Safe Mode</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sensitivity Levels */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Sensitivity Levels</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Violence:</span>
                <Badge variant="outline" className="text-xs">{settings.violence}/10</Badge>
              </div>
              <div className="flex justify-between">
                <span>Sexual:</span>
                <Badge variant="outline" className="text-xs">{settings.sexual}/10</Badge>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <Badge variant="outline" className="text-xs">{settings.language}/10</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringStatus;