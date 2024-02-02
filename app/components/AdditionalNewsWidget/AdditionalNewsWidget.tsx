import {Widget, WidgetType} from '~/types/types';
import Form from './Form/Form';

const additionalData = {
  label: 'Search page additional news',
  required: false,
  placeHolder: 'Additional news ',
  content: '',
};
const type: WidgetType = 'AdditionalNews';
const additionSearchPageNewsWidget: Widget = {
  type,
  name: 'Addition news',
  construct: ({id, containerId}) => ({
    id,
    containerId,
    type,
    additionalData,
  }),
  button: {name: 'Baner '},
  widget: Form,
};

export default additionSearchPageNewsWidget;

[
  {
    id: 'widget-button-974812',
    containerId: '22',
    type: 'AdditionalNews',
    additionalData: {
      label: 'Search page additional news',
      required: false,
      placeHolder: 'Search page additional news',
      content: '',
    },
  },
];
