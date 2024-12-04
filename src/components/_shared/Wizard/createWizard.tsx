import { FC } from "react";
import { create } from "zustand";
import { NativeWizard } from "./NativeWizard";
import { Schema } from "joi";

export type WizardStore = {
  steps: Step<any>[];
  currentIndex: number;
  goNext: () => void;
  goPrev: () => void;
  data: Record<number, Record<string, any>>;
  setData: (step: number, key: any, value: any) => void;
};

export type WizardPage<D extends Record<string, unknown> = {}> = {
  set: <K extends keyof D>(key: K, value: D[K]) => void;
  data: D;
};

type Step<D extends Record<string, unknown> = any> = {
  icon: string;
  content: FC<WizardPage<D>>;
  schema?: Schema<any>;
  hideInStepper?: boolean;
  skippable?: boolean;
  hideStepper?: boolean;
};

export const createWizard = (steps: Step[]) => {
  const controller = create<WizardStore>((set, get) => ({
    currentIndex: 0,
    steps,
    data: {},
    setData: (step, key, value) => {
      const { data } = get();

      if (!data[step]) {
        data[step] = {};
      }

      data[step] = {
        ...data[step],
        [key]: value,
      };

      set({ data });
    },
    goNext: () => {
      const { currentIndex, steps } = get();

      if (currentIndex === steps.length - 1) return;

      set((store) => ({ currentIndex: store.currentIndex + 1 }));
    },
    goPrev: () => {
      const { currentIndex } = get();
      if (currentIndex === 0) return;

      set((store) => ({ currentIndex: store.currentIndex - 1 }));
    },
  }));

  const Wizard: FC = () => {
    return <NativeWizard {...controller()} />;
  };

  return {
    controller,
    Wizard,
  };
};
