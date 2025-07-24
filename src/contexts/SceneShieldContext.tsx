import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface SceneData {
  scene: string;
  tags: string[];
  riskScore: number;
  alert: string;
  timestamp: Date;
}

interface Settings {
  violence: number;
  sexual: number;
  language: number;
  safeMode: boolean;
  autoMute: boolean;
}

interface SceneShieldContextType {
  isMonitoring: boolean;
  currentScene: SceneData | null;
  sceneLog: SceneData[];
  settings: Settings;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
  dismissAlert: () => void;
  setCurrentScene: (scene: SceneData | null) => void;
  setSceneLog: React.Dispatch<React.SetStateAction<SceneData[]>>;
}

const defaultSettings: Settings = {
  violence: 5,
  sexual: 5,
  language: 5,
  safeMode: false,
  autoMute: false,
};

const SceneShieldContext = createContext<SceneShieldContextType | undefined>(undefined);

export const useSceneShield = () => {
  const context = useContext(SceneShieldContext);
  if (!context) {
    throw new Error('useSceneShield must be used within SceneShieldProvider');
  }
  return context;
};

export const SceneShieldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentScene, setCurrentScene] = useState<SceneData | null>(null);
  const [sceneLog, setSceneLog] = useState<SceneData[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const startMonitoring = () => {
    setIsMonitoring(true);
    toast({ title: "SceneShield Activated", description: "Now monitoring for inappropriate content" });
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    setCurrentScene(null);
    toast({ title: "SceneShield Deactivated" });
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const dismissAlert = () => {
    setCurrentScene(null);
  };

  return (
    <SceneShieldContext.Provider
      value={{
        isMonitoring,
        currentScene,
        sceneLog,
        settings,
        startMonitoring,
        stopMonitoring,
        updateSettings,
        dismissAlert,
        setCurrentScene,
        setSceneLog,
      }}
    >
      {children}
    </SceneShieldContext.Provider>
  );
};