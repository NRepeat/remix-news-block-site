import {Image, Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useSubmit} from '@remix-run/react';
import {withZod} from '@remix-validated-form/with-zod';
import {FC, useEffect, useState} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {z} from 'zod';
import Table from '~/components/ImageCarouselWidget/Table/Table';
import MediaLibrary from '~/components/Media/MediaLibrary/MediaLibrary';
import Modal from '~/components/Modal/Modal';
import {SubmitButton} from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import WidgetFormWrapper from '~/components/WidgetFormWrapper/WidgetFormWrapper';
import {WidgetInstance} from '~/types/types';

type BanerFormType = {
  widget: WidgetInstance;
  images?: SerializeFrom<Image[]>;
  page?: SerializeFrom<Page>;
};

export const banerValidator = withZod(
  z.object({
    id: z.string(),
    isBaner: z.string().default('true'),
    imageId: z.coerce.number(),
    banerId: z.coerce.number().optional(),
  })
);

const Form: FC<BanerFormType> = ({widget, page, images}) => {
  const submit = useSubmit();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectImages, setSelectImage] = useState<(number | undefined)[]>([]);
  const [banerId, setBanerId] = useState<string>();

  useEffect(() => {
    if (page) {
      const content = JSON.parse(page.content) as WidgetInstance[];
      const widgetsInstanceContent = content.find(w => w.id === widget.id)
        ?.additionalData?.content as string;

      if (widgetsInstanceContent) {
        const {banerId, imageId} = JSON.parse(widgetsInstanceContent) as {
          banerId: string;
          imageId: string;
        };
        const parsedPostsIds =
          typeof imageId === 'string'
            ? (JSON.parse(imageId) as number)
            : imageId;
        const filteredPosts = images?.find(
          image => image.id === parsedPostsIds
        );
        setBanerId(banerId);
        setSelectImage([filteredPosts?.id]);
      }
    }
  }, [images, page, widget.id]);

  const deleteWidget = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    submit(
      {containerId: widget.containerId, widgetId: widget.id, type: 'delete'},
      {method: 'delete', action: `/admin/pages/page/${page?.slug}/edit`}
    );
  };
  const selectedImages = selectImages
    .map(id => images?.find(image => image.id === id))
    .filter(post => post !== undefined);
  return (
    <WidgetFormWrapper widget={widget}>
      <button
        className="inline-flex w-full border-2 items-center pt-2 pb-2 border-green-600 bg-green-200 rounded hover:border-black"
        onClick={e => {
          e.preventDefault(), setModalOpen(true);
        }}
        onKeyDown={() => setModalOpen(true)}
      >
        <p className="w-full text-center">Add image</p>
      </button>
      {modalOpen && (
        <Modal setIsOpen={setModalOpen} head="Select or Upload Media">
          <MediaLibrary
            isBaner={true}
            setSelectImage={setSelectImage}
            action={`/admin/pages/pages/${page?.id}/create/upload`}
            images={images}
          />
        </Modal>
      )}
      <Table
        selectImages={selectImages}
        banerId={banerId}
        isBaner={true}
        setSelectImage={setSelectImage}
        images={selectedImages}
      />
      <ValidatedForm
        navigate={false}
        validator={banerValidator}
        action={`/admin/pages/page/${page?.slug}/edit/baner/create`}
        method="post"
      >
        <FormInput name="imageId" value={selectImages[0] ?? ''} type="hidden" />
        <FormInput name="banerId" value={banerId} type="hidden" />
        <FormInput type="hidden" name="id" value={widget.id} />
        <FormInput type="hidden" name="isBaner" value={'true'} />
        <div className="inline-flex w-full justify-between">
          <SubmitButton classNames="border-2 w-1/3 border-green-600 rounded-sm hover:bg-green-200 pr-2 pl-2 hover:border-black">
            Save
          </SubmitButton>
          <button
            className="underline text-red-500 "
            onClick={e => deleteWidget(e)}
          >
            Delete
          </button>
        </div>
      </ValidatedForm>
    </WidgetFormWrapper>
  );
};

export default Form;
