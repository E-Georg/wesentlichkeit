import { MutationFunction } from '@tanstack/react-query';
import {
  AccessibilityHelp,
  AutoLink,
  Autosave,
  Bold,
  Code,
  EditorConfig,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  ImageBlock,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  SimpleUploadAdapter,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
  Undo,
} from 'ckeditor5';
const API_URL = import.meta.env.VITE_API_URL;

export const editorConfig: EditorConfig = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'findAndReplace',
      'selectAll',
      '|',
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'code',
      '|',
      'link',
      'insertImage',
      'insertTable',
      'highlight',
      '|',
      'accessibilityHelp',
    ],
    shouldNotGroupWhenFull: false,
  },
  plugins: [
    AccessibilityHelp,
    AutoLink,
    Autosave,
    Bold,
    Code,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    Highlight,
    ImageBlock,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    SimpleUploadAdapter,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Underline,
    Undo,
  ],
  fontFamily: {
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true,
  },
  fontColor: {
    columns: 5,
    documentColors: 10,
    colors: [
      {
        color: 'hsl(0, 0%, 0%)',
        label: 'Black',
      },
      {
        color: 'hsl(0, 0%, 30%)',
        label: 'Dim grey',
      },
      {
        color: 'hsl(0, 0%, 60%)',
        label: 'Grey',
      },
      {
        color: 'hsl(0, 0%, 90%)',
        label: 'Light grey',
      },
      {
        color: 'hsl(0, 0%, 100%)',
        label: 'White',
        hasBorder: true,
      },
      // Add more colors if needed
    ],
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6',
      },
    ],
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      '|',
      'imageStyle:alignBlockLeft',
      'imageStyle:block',
      'imageStyle:alignBlockRight',
      '|',
      'resizeImage',
    ],
    styles: {
      options: ['alignBlockLeft', 'block', 'alignBlockRight'],
    },
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },
  placeholder: 'Type or paste your content here!',
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
  },
  simpleUpload: {
    uploadUrl: `${API_URL}ImageUpload`,
    // uploadUrl: 'http://localhost:8080/upload',
    withCredentials: true,
  },
};

export const handleDelete = async (
  cellMessageId: number,
  setDelteMessageValueByIndex: (cellMessageId: number) => void,
  deleteCellMutation: MutationFunction<number, number>
) => {
  if (cellMessageId.toString().length === 13) {
    setDelteMessageValueByIndex(cellMessageId);
    return;
  }
  const res = await deleteCellMutation(cellMessageId);
  if (res === 1) setDelteMessageValueByIndex(cellMessageId);
};
