import Axios from "axios";
import MaterialTable from "material-table";
import React, { useState } from "react";

const TableGenerator = ({
  title,
  columns,
  data,
  onEditClick,
  onRefresh,
  options,
  url,
  disableActions = false,
  forwardButton = false,
  forwardToStation,
  customPage = 0,
}) => {
  const [tdata, setTData] = useState(data);

  const handleRowDelete = (oldData, resolve) => {
    Axios.delete(`${url}/${oldData.Id}`)
      .then((res) => {
        const dataDelete = [...tdata];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setTData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        resolve();
      });
  };

  return (
    <MaterialTable
      columns={columns}
      data={tdata}
      actions={[
        {
          hidden: !forwardButton,
          icon: "forward",
          tooltip: "Forward to Other station",
          iconProps: { color: "primary" },
          onClick: (event, rowData) => forwardToStation(rowData),
        },
        {
          hidden: disableActions,
          icon: "edit",
          tooltip: "Edit",
          iconProps: { color: "primary" },
          onClick: (event, rowData) => onEditClick(rowData),
        },
        // (rowData) => ({
        //   icon: "delete",
        //   tooltip: "Delete",
        //   iconProps: { color: "error" },
        //   onClick: (event, rowData) => onDeleteClick(rowData.Id),
        // }),
        {
          hidden: disableActions,
          icon: "refresh",
          tooltip: "Refresh Data",
          isFreeAction: true,
          onClick: () => onRefresh(),
        },
      ]}
      options={{
        // actionsColumnIndex: -1,
        exportButton: true,
        ...options,
        pageSize: customPage == 0 ? 10 : customPage,
        // filtering: true,
      }}
      title={title}
      localization={{
        body: {
          editRow: {
            deleteText: `Are you sure you want to delete this from ${title}`,
          },
        },
      }}
      editable={{
        hidden: disableActions,
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
      }}
    />
  );
};

export default TableGenerator;
