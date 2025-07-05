import { Scene, CreateScenePayload } from "@shared/api";

function readLocal(): Scene[] {
  const raw = localStorage.getItem("scenes");
  try {
    return raw ? (JSON.parse(raw) as Scene[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(scenes: Scene[]) {
  localStorage.setItem("scenes", JSON.stringify(scenes));
}

export async function fetchScenes(): Promise<Scene[]> {
  try {
    const res = await fetch("/api/scenes");
    if (!res.ok) throw new Error("Failed to load scenes");
    const data = await res.json();
    writeLocal(data);
    return data;
  } catch {
    return readLocal();
  }
}

export async function addScene(payload: CreateScenePayload): Promise<Scene> {
  try {
    const res = await fetch("/api/scenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create scene");
    const created = await res.json();
    const scenes = readLocal();
    scenes.push(created);
    writeLocal(scenes);
    return created;
  } catch {
    const scenes = readLocal();
    const newScene: Scene = { id: Date.now(), ...payload };
    scenes.push(newScene);
    writeLocal(scenes);
    return newScene;
  }
}

export async function updateScene(
  id: number,
  data: Partial<Scene>,
): Promise<Scene> {
  try {
    const res = await fetch(`/api/scenes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update scene");
    const updated = await res.json();
    const scenes = readLocal().map((s) => (s.id === id ? updated : s));
    writeLocal(scenes);
    return updated;
  } catch {
    const scenes = readLocal();
    const idx = scenes.findIndex((s) => s.id === id);
    if (idx !== -1) {
      scenes[idx] = { ...scenes[idx], ...data } as Scene;
      writeLocal(scenes);
      return scenes[idx];
    }
    throw new Error("Failed to update scene");
  }
}

export async function deleteScene(id: number): Promise<void> {
  try {
    await fetch(`/api/scenes/${id}`, { method: "DELETE" });
    const scenes = readLocal().filter((s) => s.id !== id);
    writeLocal(scenes);
  } catch {
    const scenes = readLocal().filter((s) => s.id !== id);
    writeLocal(scenes);
  }
}

export async function downloadPdf(scenes: Scene[]): Promise<Blob> {
  try {
 
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
      body: JSON.stringify({ scenes }),
    });
    if (!res.ok) throw new Error("Failed to generate pdf");
 
    return await res.blob();
  } catch (err) {
    throw new Error("Failed to generate pdf");
  }
}
