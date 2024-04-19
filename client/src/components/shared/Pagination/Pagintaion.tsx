type PageProps = {
  handlePageChange: (page: number) => void;
  i: number;
};

const Pagintaion = ({ handlePageChange, i }: PageProps) => {
  return (
    <button
      onClick={() => handlePageChange(i + 1)}
      className={`join-item btn dark:bg-[#242535] dark:text-white `}
      key={i}
    >
      {i + 1}
    </button>
  );
};

export default Pagintaion;
