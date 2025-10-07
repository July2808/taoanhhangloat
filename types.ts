export interface Scene {
  id: string;
  name: string;
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  sceneName: string;
  imageUrl: string;
}

export interface SceneCategory {
  name: string;
  scenes: Scene[];
}
