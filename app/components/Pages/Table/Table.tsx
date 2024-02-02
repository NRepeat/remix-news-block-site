import { Page } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { Link, useNavigate } from '@remix-run/react'
import { FC } from 'react'
import { RiFileEditFill } from 'react-icons/ri'

type PagesTableType = {
	pages: SerializeFrom<Page[]>
}

const Table: FC<PagesTableType> = ({ pages }) => {
	const navigate = useNavigate()
	const handleRowClick = (slug: string) => {

		navigate(`/admin/pages/page/${slug}/edit`);
	}
	return (
		<table className='table-fixed  p-4  w-full  '   >
			<thead className='border-2 border-gray-200  text-pretty '>
				<tr className='  text-xl uppercase text-left text-gray-600'>

					<th className='pl-4 w-12'>id</th>
					<th className='pl-4 w-20'>Name</th>
					<th className=' pl-10 min-w-2/3  '>Created at</th>
					<th className='pr-4 text-right'>Edit</th>
				</tr>
			</thead>
			<tbody className='odd:bg-slate-300  w-full'>
				{pages && pages.map((page) => (
					<tr className='even:bg-slate-300    cursor-pointer hover:text-white hover:bg-sky-800' key={page.id} onClick={() => handleRowClick(page.slug)}>

						<td className='w-12 pt-4 pb-4 text-center'>{page.id}</td>
						<td className='pl-4' >{page.name} </td>
						<td className='pl-10 w-2/3 '>{page.createdAt} </td>
						<td className='  text-right pr-5' > <Link className='inline-flex items-center' to={`/admin/pages/page/${page.id}/edit`}><RiFileEditFill className='fill-blue-500 w-8 h-8' /> </Link> </td>
						{/* <td>{page.createdAt}</td> */}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Table