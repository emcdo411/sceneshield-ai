import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Square, Shield, Volume2, VolumeX } from 'lucide-react';
import { useSceneShield } from '@/contexts/SceneShieldContext';

const ControlPanel: React.FC = () => {
  const {
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    settings,
    updateSettings,
  } = useSceneShield();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          SceneShield Control
        </CardTitle>
        <CardDescription>
          Configure content monitoring and parental controls
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Control */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Monitoring Status</Label>
          <Button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isMonitoring ? (
              <><Square className="h-4 w-4" />Stop</>
            ) : (
              <><Play className="h-4 w-4" />Start</>
            )}
          </Button>
        </div>

        {/* Safe Mode Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="safe-mode" className="text-base font-medium">
            Safe Mode
          </Label>
          <Switch
            id="safe-mode"
            checked={settings.safeMode}
            onCheckedChange={(checked) => updateSettings({ safeMode: checked })}
          />
        </div>

        {/* Auto Mute Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-mute" className="text-base font-medium flex items-center gap-2">
            {settings.autoMute ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            Auto Mute
          </Label>
          <Switch
            id="auto-mute"
            checked={settings.autoMute}
            onCheckedChange={(checked) => updateSettings({ autoMute: checked })}
          />
        </div>

        {/* Content Sensitivity Sliders */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">Content Sensitivity</h4>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Violence Threshold: {settings.violence}/10</Label>
              <Slider
                value={[settings.violence]}
                onValueChange={([value]) => updateSettings({ violence: value })}
                max={10}
                min={1}
                step={1}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm">Sexual Content: {settings.sexual}/10</Label>
              <Slider
                value={[settings.sexual]}
                onValueChange={([value]) => updateSettings({ sexual: value })}
                max={10}
                min={1}
                step={1}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm">Language: {settings.language}/10</Label>
              <Slider
                value={[settings.language]}
                onValueChange={([value]) => updateSettings({ language: value })}
                max={10}
                min={1}
                step={1}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;