import {Widget, WidgetType} from '~/types/types';
import Form from './Form/Form';

const additionalData = {
  label: 'Tag page addition content',
  required: false,
  placeHolder: 'Addition content ',
  content: '',
};
const type: WidgetType = 'AdditionTagPageContent';
const additionTagPageContentWidget: Widget = {
  type,
  name: 'Addition content',
  construct: ({id, containerId}) => ({
    id,
    containerId,
    type,
    additionalData,
  }),
  button: {name: 'Baner '},
  widget: Form,
};

export default additionTagPageContentWidget;
