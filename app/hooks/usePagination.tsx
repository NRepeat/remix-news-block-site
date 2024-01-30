import { useSubmit } from '@remix-run/react';
import Pagination from '~/components/Pagination/Pagination';

type UsePaginationParams = {
	currentPage: number;
	totalPages: number;
};

const usePagination = ({ currentPage, totalPages }: UsePaginationParams) => {
	const submit = useSubmit();

	const handlePageChange = (page: number) => {
		submit({ page });
	};

	return (
		<Pagination
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={handlePageChange}
		/>
	);
};

export default usePagination;
