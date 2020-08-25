import MaterialTable from "material-table";
import React, { useEffect } from "react";
export default function MaterialTableDemo({
  title,
  columns,
  data,
  add,
  update,
  remove,
}) {
  const [state, setState] = React.useState({
    columns,
    data,
  });

  useEffect(() => {
    setState({
      ...state,
      data,
      columns,
    });
  }, [data, columns]);

  return (
    <MaterialTable
      title={title}
      options={{
        headerStyle: {
          background: "#FA6400",
          color: "#FFF",
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: "bold",
          zIndex: 1,
        },
      }}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });

              // Add Here
              add(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });

                update(newData);
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
              remove(oldData);
            }, 600);
          }),
      }}
    />
  );
}
