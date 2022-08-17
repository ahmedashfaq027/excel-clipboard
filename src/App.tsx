import React, { useRef, useState } from "react";
import "./App.scss";
import Table from "./Table";

function App() {
  const rowRef = useRef(null);
  const colRef = useRef(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(5);
  const [mat, setMat] = useState<string[][]>([]);
  const [cell, setCell] = useState({ row: 0, col: 0 });

  const apply = (event: any) => {
    const rowt = rowRef.current!["value"];
    const colt = colRef.current!["value"];
    const str = createGrid(rowt, colt);

    setMat(str);
    setRows(rowt);
    setCols(colt);
  };

  const paste = async (event: any) => {
    const text = await navigator.clipboard.readText();

    let pasteMat: any[] = [];
    text.split("\r\n").forEach((row, idx) => {
      let temp: any[] = [];
      row.split("\t").forEach((col) => {
        temp.push(col);
      });
      pasteMat.push(temp);
    });

    let mergeMat: any[] = JSON.parse(JSON.stringify(mat));
    let r = cell.row,
      c = cell.col;
    let x = pasteMat.length,
      y = pasteMat[0].length;

    if (r + x > mergeMat.length || c + y > mergeMat[0].length) {
      mergeMat = createGrid(r + x, c + y);
    }

    // Copy existing content
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[0].length; j++) {
        mergeMat[i][j] = mat[i][j];
      }
    }

    // Copy new content
    for (let i = r, l = 0; l < pasteMat.length; i++, l++) {
      for (let j = c, m = 0; m < pasteMat[0].length; j++, m++) {
        mergeMat[i][j] = pasteMat[l][m];
        console.log(pasteMat[l][m]);
      }
    }

    console.log(mergeMat);
    setMat(mergeMat);
  };

  const clear = (event: any) => {
    const str = createGrid(rows, cols);
    setMat(str);
  };

  const createGrid = (n: any, m: any) => {
    let ret = [];

    for (let i = 0; i < n; i++) {
      let temp = [];
      for (let j = 0; j < m; j++) {
        temp.push("");
      }
      ret.push(temp);
    }

    return ret;
  };

  return (
    <div className="App">
      <header>Excel Clipboard</header>

      <section>
        <div className="section-top">
          <div className="configure-rows-cols">
            <label htmlFor="row-number">R: </label>
            <input
              type="number"
              name="rows"
              id="row-number"
              defaultValue={rows}
              ref={rowRef}
            />

            <label htmlFor="col-number">C: </label>
            <input
              type="number"
              name="cols"
              id="col-number"
              defaultValue={cols}
              ref={colRef}
            />

            <button className="btn btn-success" onClick={apply}>
              Apply
            </button>
          </div>

          <div className="buttons">
            <button className="btn btn-primary" onClick={paste}>
              Click me to paste
            </button>
            <button className="btn btn-danger" onClick={clear}>
              Clear
            </button>
          </div>
        </div>

        <Table
          rows={rows}
          cols={cols}
          mat={mat}
          cell={cell}
          setCell={setCell}
        />
      </section>
    </div>
  );
}

export default App;
