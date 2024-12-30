const Pagination = ({ itemsPerPage, dataLength, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-btns">
      {pageArray.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
