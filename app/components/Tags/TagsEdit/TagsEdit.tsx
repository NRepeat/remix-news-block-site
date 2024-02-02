import { Tag } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import React, { FC } from 'react'
import { ValidatedForm } from 'remix-validated-form'


type TagsEditType = {
	tag: SerializeFrom<Tag>
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	isOpen: boolean
}

const TagsEdit: FC<TagsEditType> = ({ tag }) => {
	return (
		<ValidatedForm>


		</ValidatedForm>
	)
}

export default TagsEdit