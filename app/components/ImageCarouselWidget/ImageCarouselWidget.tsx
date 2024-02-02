import {Widget, WidgetType} from '~/types/types';
import Form from './Form/Form';

const additionalData = {
  label: 'Image Carousel Widget',
  required: false,
  placeHolder: 'Image Carousel ',
  content: '',
};
const type: WidgetType = 'CarouselImageWidget';
const carouselImageWidget: Widget = {
  type,
  name: 'image Carousel',
  construct: ({id, containerId}) => ({
    id,
    containerId,
    type,
    additionalData,
  }),
  button: {name: 'Image Carousel'},
  widget: Form,
};

export default carouselImageWidget;
