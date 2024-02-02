import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {DropInstance} from '~/types/types';

export const getDropZones = (page: SerializeFrom<Page>) => {
  if (page.slug === 'main') {
    const dropZones: DropInstance[] = [
      {
        id: `1`,
        type: 'MainPage',
        name: 'Main page widget container ',
      },
    ];
    return dropZones;
  }
  if (page.slug === 'tags') {
    const dropZones: DropInstance[] = [
      {
        id: `2`,
        type: 'TagsPageTopBanerContainer',
        name: 'Top baner container ',
      },
      {
        id: `8`,
        type: 'TagsPageAdditionalContentControl',
        name: 'Tags Page additional content container',
      },
      {
        id: `3`,
        type: 'TagsPageBottomBanerContainer',
        name: 'Bottom baner container ',
      },
    ];
    return dropZones;
  }
  if (page.slug === 'search') {
    const dropZones: DropInstance[] = [
      {
        id: `4`,
        type: 'SearchPageTopBanerContainer',
        name: 'Top baner container ',
      },
      {
        id: `22`,
        type: 'SearchPageAdditionalNewsContainer',
        name: 'Search Page Additional News Container',
      },
      {
        id: `5`,
        type: 'SearchPageBottomBanerContainer',
        name: 'Bottom baner container ',
      },
    ];
    return dropZones;
  }
  if (page.slug === 'post') {
    const dropZones: DropInstance[] = [
      {
        id: `6`,
        type: 'PostPageTopBanerContainer',
        name: 'Top baner container ',
      },
      {
        id: `7`,
        type: 'PostPageBottomBanerContainer',
        name: 'Bottom baner container ',
      },
    ];
    return dropZones;
  }
};
