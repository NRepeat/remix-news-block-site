import {Image} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useSubmit} from '@remix-run/react';
import {useEffect} from 'react';
import {useDropzone} from 'react-dropzone-esm';
import {IoClose} from 'react-icons/io5';

function CustomDropzone({
  postId,
  action,
  image,
}: {
  image: SerializeFrom<Image | null>;
  action: string;
  postId: number;
}) {
  const submit = useSubmit();
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
    noClick: true,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const newFormData = new FormData();
      acceptedFiles.map(file => newFormData.set(`file`, file));
      newFormData.set('type', 'postImage');
      submit(newFormData, {
        method: 'post',
        navigate: false,
        action,
        encType: 'multipart/form-data',
      });
    }
  }, [acceptedFiles, action, submit]);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    image: SerializeFrom<Image>
  ) => {
    e.stopPropagation();
    submit(
      {imageId: image.id},
      {
        method: 'delete',
        navigate: false,
        action: `/admin/posts/post/${postId}/edit/delete/image`,
      }
    );
  };
  return (
    <div {...getRootProps({className: 'dropzone w-full h-full flex'})}>
      <input className="input-zone" {...getInputProps()} />
      {image ? (
        <div className="relative w-full  h-full flex">
          <button
            className="absolute rounded-tr-md cursor-pointer bg-slate-100 top-o right-0"
            onClick={e => handleDelete(e, image)}
          >
            <IoClose className="fill-red-500 h-8 w-8" />
          </button>
          <img
            className="w-full  object-cover rounded-sm "
            src={
              image.path.includes('https')
                ? image.path
                : `/uploads/${image.path}`
            }
            alt={image.path}
          />
        </div>
      ) : (
        <div className="flex h-full p-4 w-full justify-center items-center ">
          <p className="flex h-full p-4 w-full justify-center items-center text-lg text-gray-400">
            Drag’n’drop some files here, or click to select files
          </p>
        </div>
      )}
    </div>
  );
}

export default CustomDropzone;
