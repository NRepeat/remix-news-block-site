import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {FC} from 'react';
import {DropInstance, WidgetButton, WidgetInstance} from '~/types/types';
import WidgetButtonWrapper from '../WidgetButtonWrapper/WidgetButtonWrapper';

type WidgetListType = {
  buttons: WidgetButton[];
  dropZones: DropInstance[];
  widgetsArr: WidgetInstance[] | undefined;
  page: SerializeFrom<Page>;
};

const WidgetButtonList: FC<WidgetListType> = ({
  page,
  buttons,
  dropZones,
  widgetsArr,
}) => {
  return (
    <div className="flex flex-col items-center rounded-sm h-min bg-slate-300  p-2 gap-4 border-2 border-slate-400 w-max">
      <h2 className="w-full text-xl font-bold ">Widget buttons</h2>
      {buttons.map((button, i) => (
        <WidgetButtonWrapper
          page={page}
          widgetsArr={widgetsArr}
          dropZones={dropZones}
          key={i}
          button={button}
        />
      ))}
    </div>
  );
};

export default WidgetButtonList;
