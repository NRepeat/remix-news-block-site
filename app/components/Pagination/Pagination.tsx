import { FC } from 'react';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers: number[] = [];
	console.log("🚀 ~ pageNumbers:", pageNumbers)

	const generatePageNumbers = (): number[] => {
		for (let i = 1; i <= totalPages; i++) {
			console.log("🚀 ~ generatePageNumbers ~ totalPages:", totalPages)
			pageNumbers.push(i);
		}
		return pageNumbers;
	};

	return (

		<>
			{totalPages &&
				<div className="inline-flex w-full justify-center pt-2 ">
					<ul className="inline-flex w-full justify-center gap-1" >
						<>
							{generatePageNumbers().map((page) => (
								<li key={page} className={`  ${currentPage === page ? ' bg-sky-200 border-2 border-sky-600' : 'bg-white border-2 '}`}>
									<button className="h-6 w-6 inline-flex items-center justify-center p-2" onClick={() => onPageChange(page)}>{page}</button>
								</li>
							))}
						</>

					</ul>
				</div>}
		</>


	);
};

export default Pagination