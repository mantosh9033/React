import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import GetAppIcon from '@material-ui/icons/GetApp';
// import AddI  con from '@material-ui/icons/Add';

function App() {
  const [tableData, setTableData] = useState([
    { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
    { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
  ])
  const columns = [
    { title: "Name", field: "name",cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
    { title: "Email", field: "email"},
    { title: "Phone Number", field: "phone", align: "center"},
    { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
    { title: "City", field: "city"},
    { title: "School Fee", field: "fee", type: "currency", currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
    cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
  ]
  return (
    <div className="App">
      <div className="header">
        <img className='spotimage' src="download.png"/>
        <span >
      <h1 className="topmargin" align="left">YOUR SPOTTABL TEAM</h1>
      <p className="nomargin" align="left">Spottabl supports all throughout </p>
      </span>
      </div>
      <MaterialTable columns={columns} data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve(), 1000)

          })
        }}
        actions={[
          {
            icon: () => <button className="buttoncsm">Add CSM</button>,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            isFreeAction:true
          }
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "left" , searchFieldVariant: "outlined",
          paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: false,                       exportAllData: true, exportFileName: "TableData", actionsColumnIndex: -1, selection: true,
          showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
            disabled: rowData.age == null,
            // color:"primary"
          }),
          // grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336",color:"#fff"}
        }}
        title="Customer Success Managers"
        // icons={{ Add: () => <AddIcon /> }} 
        />
        </div>
  );
}

export default App;
