import { create } from 'zustand';
import { HttpAction } from './components/Models/data.interfaces';
import { devtools } from 'zustand/middleware';

/// ================================================
// setCellID([row.id, column.id, idOfCell]);
export type CellID = {
  rowID: number;
  coolumnID: number;
  cellID: number;
};

export type ChangeObject = {
  mode: HttpAction;
  ID: number;
};

export type messageValue = {
  title: string;
  text: string;
  subStakeholderId: number;
};

export type relevance = {
  text: string;
  value: number;
};
// TODO: ein state für Stakeholder/ Subgroups usw.

//stakeholder : {id, title, description, classification, }
// onChangePrio({prio: number, id: number})
interface State {
  relevance: relevance;
  DELETE: boolean;
  title: string;
  description: string;
  messageValue: messageValue[];
  classification: number;
  showModal: boolean;
  onChangeSubGroup: ChangeObject;
  onChangeStakeholder: ChangeObject;
  onChangeSubStakeholder: ChangeObject;
  onChangeCells: ChangeObject;
  cellID: CellID;
  ClientID: number;
  GroupID: number;
}

interface Action {
  setRelevance: (obj: relevance) => void;
  SetDELETE: () => void;
  setTitle: (title: string) => void;
  setDescription: (text: string) => void;
  setMessageValue: (value: messageValue) => void;
  setMessageValueByIndex: (index: number, value: messageValue) => void;
  setClassification: (num: number) => void;
  setShowModal: () => void;
  setOnChangeSubGroup: (obj: ChangeObject) => void;
  setOnChangeStakeholder: (obj: ChangeObject) => void;
  setOnChangeSubStakeholder: (obj: ChangeObject) => void;
  setOnChangeCells: (obj: ChangeObject) => void;
  setCellID: (cellID: CellID) => void;
  setClientID: (id: number) => void;
  setGroupID: (id: number) => void;
  reset: () => void;
}

export const useStore = create<State & Action>()(
  devtools((set) => ({
    relevance: { text: '', value: 0 },
    setRelevance: (obj: relevance) => set(() => ({ relevance: obj })),
    DELETE: false,
    SetDELETE: () => set((state) => ({ DELETE: !state.DELETE })),
    title: '',
    setTitle: (title: string) => set(() => ({ title: title })),
    description: '',
    setDescription: (text: string) => set(() => ({ description: text })),

    messageValue: [{ title: '', text: '', subStakeholderId: 0 }],
    setMessageValue: (value: messageValue) => set((state) => ({ messageValue: [...state.messageValue, value] })),
    setMessageValueByIndex: (index: number, value: messageValue) =>
      set((state) => {
        const newMessageValue = [...state.messageValue];

        while (newMessageValue.length <= index) {
          newMessageValue.push({ title: '', text: '', subStakeholderId: 0 });
        }

        newMessageValue[index] = { ...newMessageValue[index], title: value.title, text: value.text, subStakeholderId: value.subStakeholderId };

        return { messageValue: newMessageValue };
      }),

    classification: 0,
    setClassification: (num: number) => set(() => ({ classification: num })),
    showModal: false,
    setShowModal: () => set((state) => ({ showModal: !state.showModal })),
    onChangeSubGroup: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeSubGroup: (obj: ChangeObject) => set(() => ({ onChangeSubGroup: obj })),
    onChangeSubStakeholder: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeSubStakeholder: (obj: ChangeObject) => set(() => ({ onChangeSubStakeholder: obj })),
    onChangeStakeholder: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeStakeholder: (obj: ChangeObject) => set(() => ({ onChangeStakeholder: obj })),
    onChangeCells: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeCells: (obj: ChangeObject) => set(() => ({ onChangeCells: obj })),
    cellID: { rowID: 0, coolumnID: 0, cellID: 0 },
    setCellID: (cellID: CellID) => set(() => ({ cellID: cellID })),
    reset: () =>
      set((state) => ({
        title: '',
        description: '',
        classification: 0,
        showModal: false,
        textsCell: [''],
        onChangeSubGroup: { mode: HttpAction.DEFAULT, ID: state.onChangeSubGroup.ID },
        onChangeStakeholder: { mode: HttpAction.DEFAULT, ID: state.onChangeStakeholder.ID },
        onChangeCells: { mode: HttpAction.DEFAULT, ID: state.onChangeCells.ID },
        messageValue: [{ title: '', text: '', subStakeholderId: 0 }],
        relevance: { text: '', value: 0 },
      })),
    ClientID: 2,
    GroupID: 1,
    setClientID: (id: number) => set(() => ({ ClientID: id })),
    setGroupID: (id: number) => set(() => ({ GroupID: id })),
  }))
);
