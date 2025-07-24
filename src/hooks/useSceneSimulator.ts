import { useEffect, useRef } from 'react';
import { useSceneShield } from '@/contexts/SceneShieldContext';

interface SimulatedScene {
  scene: string;
  tags: string[];
  riskScore: number;
  alert: string;
  delay: number;
}

const mockScenes: SimulatedScene[] = [
  {
    scene: "00:15:23",
    tags: ["profanity", "language"],
    riskScore: 6.2,
    alert: "Strong language detected in 12 seconds",
    delay: 8000
  },
  {
    scene: "00:28:45",
    tags: ["nudity", "sexual"],
    riskScore: 8.7,
    alert: "Inappropriate scene in 10 seconds",
    delay: 15000
  },
  {
    scene: "00:42:18",
    tags: ["violence", "blood"],
    riskScore: 9.1,
    alert: "Violent content approaching in 8 seconds",
    delay: 22000
  }
];

export const useSceneSimulator = () => {
  const { isMonitoring, settings, setCurrentScene, setSceneLog } = useSceneShield();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sceneIndexRef = useRef(0);

  useEffect(() => {
    if (!isMonitoring) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      sceneIndexRef.current = 0;
      return;
    }

    const scheduleNextScene = () => {
      if (sceneIndexRef.current >= mockScenes.length) {
        sceneIndexRef.current = 0;
      }

      const scene = mockScenes[sceneIndexRef.current];
      
      const shouldTrigger = scene.tags.some(tag => {
        if (tag.includes('violence') && scene.riskScore > settings.violence) return true;
        if (tag.includes('sexual') || tag.includes('nudity')) {
          return scene.riskScore > settings.sexual;
        }
        if (tag.includes('profanity') || tag.includes('language')) {
          return scene.riskScore > settings.language;
        }
        return scene.riskScore > 5;
      });

      if (shouldTrigger) {
        timeoutRef.current = setTimeout(() => {
          const sceneData = {
            ...scene,
            timestamp: new Date()
          };
          
          setCurrentScene(sceneData);
          setSceneLog((prev: any[]) => [sceneData, ...prev].slice(0, 50));
          
          sceneIndexRef.current++;
          scheduleNextScene();
        }, scene.delay);
      } else {
        sceneIndexRef.current++;
        scheduleNextScene();
      }
    };

    scheduleNextScene();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMonitoring, settings, setCurrentScene, setSceneLog]);

  return null;
};