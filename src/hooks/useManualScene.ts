import useSWR from 'swr';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';

interface IManualScene {
  SceneName: string;
  SceneIcon: string;
}

export function useManualScene() {
  const swrResponse = useSWR<IManualScene[]>('AppGetSceneList', async () => {
    const result = h5PanelSdk.requestTokenApi('AppGetSceneList', {
      FamilyId: h5PanelSdk.familyId,
      Offset: 0,
      Limit: 50,
    });
    return result.SceneList;
  });

  return swrResponse;
}
