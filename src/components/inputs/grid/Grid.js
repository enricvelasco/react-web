import React, { Component } from 'react';
const ReactDataGrid = require('react-data-grid');

export class Grid extends Component {
  constructor(props, context) {
    super(props, context);
    //this.createRows();
    console.log("PROPS GRID", props);
    this.state = {selectedIndexes:[]};
    if(this.props.minHeight == undefined){
      this.minHeight = 500
    }else{
      this.minHeight = this.props.minHeight
    }
    if(this.props.minWidth == undefined){
      this.minWidth = null //auto
    }else{
      this.minWidth = this.props.minWidth
    }
  }

 rowGetter = (i) => {
   //return this._rows[i];
   console.log("ROW GETTER", this.props.rows[i]);
   if(this.props.rows[i].selected){
     this.state.selectedIndexes.push(i)
   }

   return this.props.rows[i]
 };

 _getRowSelectionOptions=()=>{
   if(this.props.selectableRow){
     return(
       {
           showCheckbox: true,
           enableShiftSelect: false,
           onRowsSelected: this.onRowsSelected,
           onRowsDeselected: this.onRowsDeselected,
           selectBy: {
             indexes: this.state.selectedIndexes
           }
         }
     )
   }else{
     return null
   }
 }

 onRowsSelected = (rows) => {
   console.log("ROW SELECT", rows);
   this.setState({
     selectedIndexes: this.state.selectedIndexes.concat(
       rows.map(r=> r.rowIdx)
     )
   });
   console.log("ROW SELECT *****", this.state);
   var rowsResp = []
   rows.forEach((doc) =>{
     doc.row.selected = true
     rowsResp.push(doc.row)
   })
   this.props.onSelect(rowsResp)
 }

 onRowsDeselected = (rows) => {
   console.log("ROW DESELECT", rows);
   let rowIndexes = rows.map(r => r.rowIdx);
   this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
   var rowsResp = []
   rows.forEach((doc) =>{
     doc.row.selected = false
     rowsResp.push(doc.row)
   })
   this.props.onSelect(rowsResp)
 }

 render() {
   return  (
     <div>
      {this.props.titleGrid}
       <ReactDataGrid
         columns={this.props.columns}
         rowGetter={this.rowGetter}
         rowsCount={this.props.rows.length}
         enableCellSelect={this.props.selectableCell}
         rowSelection={this._getRowSelectionOptions()}
         minHeight={this.minHeight}
         minWidth={this.minWidth}  />

      </div>
     );

 }
}
