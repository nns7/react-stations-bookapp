import { store } from "../components/store";

export type RootState = ReturnType<typeof store.getState>;
