import React from "react";
import { Table } from "@egovernments/digit-ui-react-components";

const ApplicationTable = ({ t, currentPage, columns, data, getCellProps, onNextPage, onPrevPage, onPageSizeChange, pageSizeLimit }) => {
  return (
    <Table
      t={t}
      data={data}
      currentPage={currentPage}
      columns={columns}
      getCellProps={getCellProps}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      pageSizeLimit={pageSizeLimit}
      onPageSizeChange={onPageSizeChange}
    />
  );
};

export default ApplicationTable;
