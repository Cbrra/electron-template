import { createContext } from "react";
import type { Data } from "../../types/Data";

export const dataContext = createContext<Data | null>(null);