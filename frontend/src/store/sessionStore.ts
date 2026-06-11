import { create } from "zustand";

interface SessionState {
  token?: string;
  activeFamilyId: string;
  setToken: (token?: string) => void;
  setActiveFamilyId: (familyId: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  token: undefined,
  activeFamilyId: "family-lin",
  setToken: (token) => set({ token }),
  setActiveFamilyId: (activeFamilyId) => set({ activeFamilyId }),
}));
