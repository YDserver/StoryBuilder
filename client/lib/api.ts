import { Scene, CreateScenePayload } from '@shared/api';

export async function fetchScenes(): Promise<Scene[]> {
  const res = await fetch('/api/scenes');
  if (!res.ok) throw new Error('Failed to load scenes');
  return res.json();
}

export async function addScene(payload: CreateScenePayload): Promise<Scene> {
  const res = await fetch('/api/scenes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create scene');
  return res.json();
}

export async function updateScene(id: number, data: Partial<Scene>): Promise<Scene> {
  const res = await fetch(`/api/scenes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update scene');
  return res.json();
}

export async function deleteScene(id: number): Promise<void> {
  await fetch(`/api/scenes/${id}`, { method: 'DELETE' });
}

export async function downloadPdf(): Promise<Blob> {
  const res = await fetch('/api/pdf');
  if (!res.ok) throw new Error('Failed to generate pdf');
  return res.blob();
}
