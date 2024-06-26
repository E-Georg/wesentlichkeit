import axios from "axios";
import { Cell, Stackholder, SubGroup } from "../utils/data.interfaces";

const API = "http://192.168.20.53/wa/api/";
const phpExtension = ".php?param=";

// Fetch data from the API
export const fetchCells = async (
  clientID: number,
  groupID: number,
  setCells: (cell: Cell[]) => void
): Promise<void> => {
  try {
    const response = await axios.get<Cell[]>(
      `${API}clientStakeholderSignificanceAll${phpExtension}{ "clientId":${clientID}, "groupId":${groupID} }`
    );
    const fetchedStackholders: Cell[] = response.data;
    // const subGroups: SubGroup[] = fetchedStackholders.map(convertCellToSubGroup);
    setCells(fetchedStackholders);
  } catch (error) {
    console.error("Error fetching stackholders:", error);
  }
};

export const convertCellToSubGroup = (cell: Cell): SubGroup => {
  return {
    id: cell.id,
    text: `${cell.clientStakeholderId}.${cell.clientSubGroupId}`,
  };
};

export const fetchData = async (
  typeParameter: string,
  setData: (data: Stackholder[] | SubGroup[]) => void,
  clientID: number,
  groupID?: number
): Promise<void> => {
  let url;

  if (groupID === undefined) {
    url = `${API}${typeParameter}${phpExtension}{"clientId":${clientID}}`;
  } else {
    url = `${API}${typeParameter}${phpExtension}{"clientId":${clientID},"groupId":${groupID}}`;
  }

  try {
    const response = await axios.get(url);
    const fetchedData = response.data;

    setData(fetchedData);
  } catch (error) {
    console.error(`Error fetching ${typeParameter}:`, error);
  }
};

// TO POST DATA

export const AddCellToDatabase = async (
  cell: Cell,
  clientID: number,
  groupID: number
) => {
  const url = `http://example.com?clientId=${clientID}&groupId=${groupID}`;
  try {
    // const response = await axios.post(url, cell);
    // handle response here
    // console.log(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const AddDataToDatabase = async (
  matrixObject: SubGroup | Stackholder,
  typeParameter: string,
  clientID: number,
  groupID?: number
) => {
  let url;

  if (groupID === undefined) {
    url = `${API}${typeParameter}${phpExtension}{"clientId":${clientID}}`;
  } else {
    url = `${API}${typeParameter}${phpExtension}{"clientId":${clientID},"groupId":${groupID}}`;
  }

  const urlTemp = `http://example.com?clientId=${clientID}&groupId=${groupID}`;
  try {
    // const response = await axios.post(url, matrixObject);
    // handle response here
    // console.log(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// UPDATE DATA

// DELETE DATA
