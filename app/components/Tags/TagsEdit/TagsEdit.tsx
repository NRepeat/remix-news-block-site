import {Tag} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import React, {FC} from 'react';

type TagsEditType = {
  tag: SerializeFrom<Tag>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const TagsEdit: FC<TagsEditType> = () => {
  return <div></div>;
};

export default TagsEdit;
