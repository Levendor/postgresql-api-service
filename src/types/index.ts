import { Column } from "../resources/columns";

export type TBoardBody = {
  id: string;
  title: string;
  columns: Column[] | null;
}