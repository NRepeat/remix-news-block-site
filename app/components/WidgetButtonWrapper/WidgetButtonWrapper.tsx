import {UniqueIdentifier} from '@dnd-kit/core';
import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useSubmit} from '@remix-run/react';
import {FC, useState} from 'react';
import {DropInstance, WidgetButton, WidgetInstance} from '~/types/types';
import Modal from '../Modal/Modal';
import widgets from '../Widgets/Widgets';
import styles from './styles.module.css';

type WidgetButtonWrapper = {
  button: WidgetButton;
  dropZones: DropInstance[];
  widgetsArr: WidgetInstance[] | undefined;
  page: SerializeFrom<Page>;
};

const WidgetButtonWrapper: FC<WidgetButtonWrapper> = ({
  page,
  button,
  dropZones,
  widgetsArr,
}) => {
  const [open, setIsOpen] = useState<boolean>(false);
  const sub = useSubmit();
  const {id, type} = button;

  const widgetButtonData = widgets[type].button;

  const addWidgetToContainer = (containerId: string | UniqueIdentifier) => {
    const newElement = widgets[type].construct({
      id: `widget-button-${id}`,
      containerId,
    });
    const stringifiedNewElement = JSON.stringify(newElement);
    sub(
      {
        newElement: stringifiedNewElement,
        page: page.slug,
        index: widgetsArr?.length ? widgetsArr.length : 0,
      },
      {method: 'post'}
    );
  };

  const excludedTypes = [
    'TagsPageAdditionalContentControl',
    'SearchPageAdditionalNewsContainer',
  ];

  const zones = dropZones.filter(zone => !excludedTypes.includes(zone.type));
  return (
    <>
      {page.slug === 'main' && (
        <button
          onClick={() => {
            addWidgetToContainer(dropZones[0].id);
          }}
          className={styles.widgetButton}
        >
          <p>{widgetButtonData.name}</p>
        </button>
      )}
      {page.slug !== 'main' && (
        <>
          <button
            onClick={() => setIsOpen(true)}
            onKeyDown={() => setIsOpen(true)}
            className={styles.widgetButton}
          >
            <p>{widgetButtonData.name}</p>
          </button>
          {open && (
            <div>
              <Modal head="Chose container" setIsOpen={setIsOpen}>
                <div className="flex flex-col items-center w-50% gap-4">
                  {zones.map(zone => (
                    <button
                      className={styles.modalButton}
                      onClick={() => {
                        setIsOpen(false), addWidgetToContainer(zone.id);
                      }}
                      key={zone.id}
                    >
                      {zone.name}
                    </button>
                  ))}
                </div>
              </Modal>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WidgetButtonWrapper;
