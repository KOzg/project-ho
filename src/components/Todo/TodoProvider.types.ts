import { Dispatch, SetStateAction } from "react";

export interface TodoContextType {
    items: string[];
    setItems: Dispatch<SetStateAction<string[]>>;
    announcement: string;
    setAnnouncement: Dispatch<SetStateAction<string>>;
  }
  