import { useState } from "react";
import { SubGroup, Stackholder, Cell } from "../../utils/data.interfaces";
import { AddCell, AddStackholder, AddSubGroup } from "./MatrixFunctions";
import Modal from "../Modal/Modal";

// Wie kann ich den Datanbank aufruf so schaffen, dass die Rows aktualisert werden

interface Props {
  rows: SubGroup[];
  setRows: (row: SubGroup[]) => void;
  columns: Stackholder[];
  setColumns: (column: Stackholder[]) => void;
  cells: Cell[];
  setCells: (cell: Cell[]) => void;
  showAddToMatrix: boolean;
  title: string;
  text: string;
  setTitle: (name: string) => void;
  setText: (name: string) => void;
}

const Matrix = ({
  rows,
  setRows,
  columns,
  setColumns,
  cells,
  setCells,
  showAddToMatrix,
  title,
  text,
  setTitle,
  setText,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [stackholder, setStackholder] = useState(false);
  const [subGroup, setSubGroup] = useState(false);
  const [cell, setCell] = useState(false);
  const [cellID, setCellID] = useState<number[]>([0, 0]);

  const handleModalData = () => {
    if (stackholder) {
      AddStackholder(text, columns, setColumns, 2);
      setStackholder(false);
    } else if (subGroup) {
      AddSubGroup(text, rows, setRows, 2, 1);
      setSubGroup(false);
    } else if (cell) {
      AddCell(cellID[0], cellID[1], title, text, 0, 0, cells, setCells);
      setCell(false);
    }

    // count(1);
    setShowModal(false);
    setTitle("");
    setText("");
  };

  return (
    <>
      {showAddToMatrix ? (
        <div>
          <button
            onClick={() => {
              setShowModal(true);
              setStackholder(true);
            }}
          >
            Add Stackholder
          </button>

          <button
            onClick={() => {
              setShowModal(true);
              setSubGroup(true);
            }}
          >
            Add SubGroup
          </button>

          <Modal
            title={title}
            text={text}
            setTitle={setTitle}
            setText={setText}
            handleData={handleModalData}
            showModal={showModal}
            handleClose={() => setShowModal(false)}
          />
        </div>
      ) : (
        <></>
      )}
      <table>
        <thead>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th
                style={{ border: "1px solid green", fontSize: "1rem" }}
                key={column.id}
              >
                {column.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td
                style={{ border: "1px solid black", fontSize: "1rem" }}
                key={row.id}
              >
                {row.text}
              </td>
              {columns.map((column) => (
                <td
                  style={{ border: "1px solid red" }}
                  key={column.id + row.id}
                  // onClick={() => handleCellClick(row.id, column.id)}
                  onClick={() => {
                    if (
                      !cells.find(
                        (c: Cell) =>
                          c.clientStakeholderId === column.id &&
                          c.clientSubGroupId === row.id
                      )?.message.text
                    ) {
                      setShowModal(true);
                      setCell(true);
                      setCellID([row.id, column.id]);
                    } // else update or delete
                  }}
                >
                  {cells.find(
                    (c: Cell) =>
                      c.clientStakeholderId === column.id &&
                      c.clientSubGroupId === row.id
                  )?.message.text || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Matrix;
