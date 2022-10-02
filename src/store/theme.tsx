import create from "zustand";


export enum ThemeType {
    light,
    dark
}

interface ThemeProps {
  type: ThemeType;
  setType: (value: ThemeType) => void;
}

const useThemeStore = create<ThemeProps>((set) => ({
  type: ThemeType.dark,
  setType: (value: ThemeType) => set(() => ({
    type: value,
  })),
}));

export default useThemeStore;
