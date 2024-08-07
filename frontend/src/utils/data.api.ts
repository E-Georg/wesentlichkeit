import { Cell, SubGroup, Stakeholder, SubStakeholder } from '../components/Models/data.interfaces';

export const Zellen: Cell[] = [
  {
    clientStakeholderId: 1,
    clientSubGroupId: 1,
    id: 1,
    message: [
      {
        title: '',
        text: '2023-01-05',
        id: 0,
        subStakeholderId: 0,
      },
    ],
    clientGroupId: 0,
  },
  {
    clientStakeholderId: 1,
    clientSubGroupId: 2,
    id: 2,
    message: [
      {
        title: 'Hello',
        text: '2023-01-05',
        id: 0,
        subStakeholderId: 0,
      },
    ],
    clientGroupId: 0,
  },
  {
    clientStakeholderId: 2,
    clientSubGroupId: 1,
    id: 3,
    message: [
      {
        title: 'World',
        text: '2023-01-05',
        id: 0,
        subStakeholderId: 0,
      },
    ],
    clientGroupId: 0,
  },
];

export const initialRows: SubGroup[] = [
  { id: 1, title: 'Row 1', description: 'Beispiueltitle1' },
  { id: 2, title: 'Row 2', description: 'Beispiueltitle2' },
  // Add more rows as needed
];

export const initialColumns: Stakeholder[] = [
  { id: 1, title: 'COLUMN 1', description: 'Beispiueltitle1', classification: 1 },
  { id: 2, title: 'Column 2', description: 'Beispiueltitle2', classification: 1 },
  // Add more columns as needed
];

export const subStakeholderList: SubStakeholder[] = [
  { id: 1, name: 'Daimler', email: 'info@daimler.com', stakeholderId: 17 },
  { id: 2, name: 'Mahle', email: 'info@mahle.com', stakeholderId: 21 },
  { id: 3, name: 'E.Infra', email: 'info@e-infra.com', stakeholderId: 21 },
  { id: 4, name: 'Bosch', email: 'info@bosch.com', stakeholderId: 17 },
  { id: 5, name: 'Porsche', email: 'info@porsche.com', stakeholderId: 17 },
];
