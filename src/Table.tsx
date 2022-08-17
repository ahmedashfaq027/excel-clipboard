import React from "react";
import "./Table.scss";

interface Cell {
  row: number;
  col: number;
}

interface TableProps {
  rows: number;
  cols: number;
  mat: Array<Array<string>>;
  cell: Cell;
  setCell: Function;
}

function Table(props: React.PropsWithChildren<TableProps>) {
  const { rows, cols, mat, cell, setCell } = props;

  const cellClick = (row: number, col: number) => {
    setCell({ row: row, col: col });
  };

  return (
    <div className="Table">
      <table className="table table-bordered">
        <thead>
          {mat.length > 1 && (
            <tr>
              {mat[0].map((c, idx) => (
                <th key={idx} style={{ textAlign: "center" }}>
                  {String.fromCharCode(65 + idx)}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {mat.map((row, index) => (
            <tr key={index}>
              {row.map((col, idx) => (
                <td
                  key={idx}
                  onClick={(e) => cellClick(index, idx)}
                  className={
                    cell.row === index && cell.col === idx ? "selectedCell" : ""
                  }
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
