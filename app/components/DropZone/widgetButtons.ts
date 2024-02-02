import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {WidgetButton} from '~/types/types';
import {randomId} from '~/utils/randomId';

export const getWidgetButtons = (page: SerializeFrom<Page>) => {
  if (page.slug === 'main') {
    const widgetsButtons: WidgetButton[] = [
      {id: `${randomId()}`, type: 'TextWidget'},
      {id: `${randomId()}`, type: 'CarouselPostWidget'},
      {id: `${randomId()}`, type: 'CarouselImageWidget'},
      {id: `${randomId()}`, type: 'Baner'},
    ];
    return widgetsButtons;
  }
  if (page.slug === 'tags') {
    const widgetsButtons: WidgetButton[] = [
      {id: `${randomId()}`, type: 'Baner'},
    ];
    return widgetsButtons;
  }
  if (page.slug === 'search') {
    const widgetsButtons: WidgetButton[] = [
      {id: `${randomId()}`, type: 'Baner'},
    ];
    return widgetsButtons;
  }
  if (page.slug === 'post') {
    const widgetsButtons: WidgetButton[] = [
      {id: `${randomId()}`, type: 'Baner'},
    ];
    return widgetsButtons;
  }
};
