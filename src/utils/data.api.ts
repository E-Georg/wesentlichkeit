import { Cell, SubGroup, Stackholder } from "./data.interfaces";

export const Zellen: Cell[] = [
  {
    clientStakeholderId: 1,
    clientSubGroupId: 1,
    id: 1,
    message: { text: "", title: "2023-01-05" },
  },
  {
    clientStakeholderId: 1,
    clientSubGroupId: 2,
    id: 2,
    message: { text: "Hello", title: "2023-01-05" },
  },
  {
    clientStakeholderId: 2,
    clientSubGroupId: 1,
    id: 3,
    message: { text: "World", title: "2023-01-05" },
  },
];

export const initialRows: SubGroup[] = [
  { id: 1, text: "Row 1" },
  { id: 2, text: "Row 2" },
  // Add more rows as needed
];

export const initialColumns: Stackholder[] = [
  { id: 1, text: "Stackholder 1" },
  { id: 2, text: "Stackholder 2" },
  // Add more columns as needed
];
