import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

export type PageLayoutMode = 'horizontal' | 'vertical';

interface SiteSettingState {
  hydrated: boolean;
  layoutMode: PageLayoutMode;
}

const defaultState: SiteSettingState = {
  hydrated: false,
  layoutMode: 'vertical'
};

interface SiteSettingStore extends SiteSettingState {
  setHydrated: () => void;
  setLayoutMode: (mode: PageLayoutMode) => void;
}

export const useSiteSettingStore = createWithEqualityFn(
  persist<SiteSettingStore>(
    (set, get) => ({
      ...defaultState,
      setHydrated() {
        set({
          hydrated: true
        });
      },
      setLayoutMode(mode) {
        set({
          layoutMode: mode
        });
      }
    }),
    {
      name: 'siteSetting',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['hydrated', 'openCookiesEditor'].includes(key))
        ) as SiteSettingStore,
      storage: createJSONStorage(() => localStorage),
      version: 0.1,
      skipHydration: true,
      onRehydrateStorage() {
        return (state, error) => {
          if (!error && typeof state?.hydrated !== 'undefined' && !state?.hydrated) {
            state?.setHydrated?.();
          }
        };
      }
    }
  ),
  shallow
);
