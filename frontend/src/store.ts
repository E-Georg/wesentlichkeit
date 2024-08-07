import { create } from 'zustand';
import { HttpAction, SurveyAnswer } from './components/Models/data.interfaces';
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
  id: number;
  text: string;
  subStakeholderId: number;
};

export type relevance = {
  text: string;
  value: number;
};

export type Option = {
  value: number | string;
  label: string;
};

export type SurveyText = {
  text: string;
  SubStakeholderId: number;
  groupId: number;
};
export type prevaluationTexts = {
  id: number;
  text: string;
};
interface State {
  prevaluationTexts: prevaluationTexts[];
  surveyText: SurveyText[];
  surveyAnswer: SurveyAnswer[];
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
  deleteprevaluationTextById: (id: number) => void;
  setPrevaluationTexts: (prevaluationText: prevaluationTexts) => void;
  setPrevaluationTextsArray: (prevaluationText: prevaluationTexts[]) => void;
  resetSurvey: () => void;
  setSurveyText: (surveyText: SurveyText) => void;
  getSurveyAnswerById: (id: number) => any;
  setSurveyAnswer: (x: any) => any;
  setRelevance: (obj: relevance) => void;
  SetDELETE: (del: boolean) => void;
  setTitle: (title: string) => void;
  setDescription: (text: string) => void;
  setMessageValue: (value: messageValue) => void;
  setMessageValueByIndex: (index: number, value: messageValue) => void;
  setDelteMessageValueByIndex: (Id: number) => void;
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
  devtools((set, get) => ({
    prevaluationTexts: [],
    setPrevaluationTexts: (prevaluationText: prevaluationTexts) =>
      set((state) => ({ prevaluationTexts: [...state.prevaluationTexts, prevaluationText] })),
    setPrevaluationTextsArray: (prevaluationText: prevaluationTexts[]) =>
      set(() => ({ prevaluationTexts: prevaluationText })),
    deleteprevaluationTextById: (id: number) =>
      set((state) => {
        const newPrevaluationTexts = state.prevaluationTexts.filter((item) => item.id != id);
        console.log('Deleting prevaluationText with id:', id);
        return { prevaluationTexts: newPrevaluationTexts };
      }),
    surveyAnswer: [],
    setSurveyAnswer: (updateFn: (surveyAnswers: SurveyAnswer[]) => SurveyAnswer[]) =>
      set((state) => ({ surveyAnswer: updateFn(state.surveyAnswer) })),
    getSurveyAnswerById: (id: number) => get().surveyAnswer.find((item: any) => item.subGroupId === id)?.answer,
    surveyText: [],
    setSurveyText: (newSurveyText: SurveyText) =>
      set((state) => {
        const existingIndex = state.surveyText.findIndex(
          (item) => item.SubStakeholderId === newSurveyText.SubStakeholderId && item.groupId === newSurveyText.groupId
        );
        if (existingIndex > -1) {
          const updatedSurveyText = [...state.surveyText];
          updatedSurveyText[existingIndex] = { ...updatedSurveyText[existingIndex], text: newSurveyText.text };
          return { surveyText: updatedSurveyText };
        } else {
          return { surveyText: [...state.surveyText, newSurveyText] };
        }
      }),
    resetSurvey: () =>
      set(() => {
        console.log('Resetting survey');
        return { surveyAnswer: [], surveyText: [] };
      }),
    relevance: { text: '', value: 5 },
    setRelevance: (obj: relevance) =>
      set(() => {
        console.log('Setting relevance:', obj);
        return { relevance: obj };
      }),
    DELETE: false,
    SetDELETE: (del: boolean) =>
      set(() => {
        console.log('Setting DELETE:', del);
        return { DELETE: del };
      }),
    title: '',
    setTitle: (title: string) =>
      set(() => {
        console.log('Setting title:', title);
        return { title: title };
      }),
    description: '',
    setDescription: (text: string) =>
      set(() => {
        console.log('Setting description:', text);
        return { description: text };
      }),

    messageValue: [{ id: 0, text: '', subStakeholderId: 0 }],
    setMessageValue: (value: messageValue) =>
      set((state) => {
        console.log('Adding messageValue:', value);
        return { messageValue: [...state.messageValue, value] };
      }),
    setMessageValueByIndex: (index: number, value: messageValue) =>
      set((state) => {
        console.log('Setting messageValue at index', index, 'to', value);
        const newMessageValue = [...state.messageValue];
        while (newMessageValue.length <= index) {
          newMessageValue.push({ id: 0, text: '', subStakeholderId: 0 });
        }

        newMessageValue[index] = {
          ...newMessageValue[index],
          id: value.id,
          text: value.text,
          subStakeholderId: value.subStakeholderId,
        };

        return { messageValue: newMessageValue };
      }),
    setDelteMessageValueByIndex: (Id: number) =>
      set((state) => {
        console.log('Deleting messageValue with id:', Id);
        const newMessageValue = state.messageValue.filter((cellmessage: messageValue) => cellmessage.id != Id);
        return { messageValue: newMessageValue };
      }),

    classification: 5,
    setClassification: (num: number) =>
      set(() => {
        console.log('Setting classification:', num);
        return { classification: num };
      }),
    showModal: false,
    setShowModal: () =>
      set((state) => {
        console.log('Toggling showModal');
        return { showModal: !state.showModal };
      }),
    onChangeSubGroup: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeSubGroup: (obj: ChangeObject) =>
      set(() => {
        console.log('Setting onChangeSubGroup:', obj);
        return { onChangeSubGroup: obj };
      }),
    onChangeSubStakeholder: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeSubStakeholder: (obj: ChangeObject) =>
      set(() => {
        console.log('Setting onChangeSubStakeholder:', obj);
        return { onChangeSubStakeholder: obj };
      }),
    onChangeStakeholder: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeStakeholder: (obj: ChangeObject) =>
      set(() => {
        console.log('Setting onChangeStakeholder:', obj);
        return { onChangeStakeholder: obj };
      }),
    onChangeCells: { mode: HttpAction.DEFAULT, ID: 0 },
    setOnChangeCells: (obj: ChangeObject) =>
      set(() => {
        console.log('Setting onChangeCells:', obj);
        return { onChangeCells: obj };
      }),
    cellID: { rowID: 0, coolumnID: 0, cellID: 0 },
    setCellID: (cellID: CellID) =>
      set(() => {
        console.log('Setting cellID:', cellID);
        return { cellID: cellID };
      }),
    reset: () =>
      set((state) => {
        console.log('Resetting store');
        return {
          title: '',
          description: '',
          classification: 5,
          showModal: false,
          messageValue: [{ id: 0, text: '', subStakeholderId: 0 }],
          relevance: { text: '', value: 5 },
          onChangeSubGroup: { mode: HttpAction.DEFAULT, ID: state.onChangeSubGroup.ID },
          onChangeStakeholder: { mode: HttpAction.DEFAULT, ID: state.onChangeStakeholder.ID },
          onChangeCells: { mode: HttpAction.DEFAULT, ID: state.onChangeCells.ID },
        };
      }),
    ClientID: 2,
    GroupID: 1,
    setClientID: (id: number) =>
      set(() => {
        console.log('Setting ClientID:', id);
        return { ClientID: id };
      }),
    setGroupID: (id: number) =>
      set(() => {
        console.log('Setting GroupID:', id);
        return { GroupID: id };
      }),
  }))
);
