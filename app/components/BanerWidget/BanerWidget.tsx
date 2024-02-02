import {Widget, WidgetType} from '~/types/types';
import Form from './Form/Form';

const additionalData = {
  label: 'Baner Widget',
  required: false,
  placeHolder: 'Baner ',
  content: '',
};
const type: WidgetType = 'Baner';
const banerWidget: Widget = {
  type,
  name: 'Baner',
  construct: ({id, containerId}) => ({
    id,
    containerId,
    type,
    additionalData,
  }),
  button: {name: 'Baner '},
  widget: Form,
};

export default banerWidget;
