interface Props {
  total_data: number;
  limit: number;
  page: number;
}

const paginationData = ({ total_data, limit, page }: Props) => {
  return {
    total_data,
    max_page: Math.ceil(total_data / limit),
    has_prev: page > 1,
    has_next: page < Math.ceil(total_data / limit),
  };
};

export type PaginationData = ReturnType<typeof paginationData>;

export default paginationData;
