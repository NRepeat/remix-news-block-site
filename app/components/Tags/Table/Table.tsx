import { Tag } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { FC } from 'react'


type TableTagsType = {
	tags: SerializeFrom<Tag[]>
}

const Table: FC<TableTagsType> = ({ tags }) => {
	// const handleEdit = (slug:string) =>{
	// 	submit({slug},{method})
	// }

	return (
		<table className="table-fixed  p-4  w-full  ">
			<thead className="border-2 border-gray-200  text-pretty ">
				<tr className="  text-xl uppercase text-left text-gray-600">
					<th className="pl-4 w-12">id</th>
					<th className="pl-4 w-20">Name</th>
					<th className=" pl-10  ">Slug</th>

				</tr>
			</thead>
			<tbody className="odd:bg-slate-300  w-full">
				{tags &&
					tags.map(tag => (
						<tr
							className="even:bg-slate-300    cursor-pointer hover:text-white hover:bg-sky-800"
							key={tag.id}
						// onClick={() => handleRowClick(text.id)}
						>
							<td className="w-12 pt-4 pb-4 text-center">{tag.id}</td>
							<td className="pl-4">{tag.name} </td>
							<td className="pl-10 ">
								{tag.slug}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	)
}

export default Table