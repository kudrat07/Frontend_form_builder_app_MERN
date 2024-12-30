import React, { useState, useEffect } from "react";
import styles from "./response.module.css";
import useTheme from "../../contexts/Theme";
import { PieChart } from "react-minimal-pie-chart";

const Response = () => {
  const { themeMode } = useTheme();

  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await simulateFetch();
      setColumns(Object.keys(data[0]));
      setTableData(data);
    };

    fetchData();
  }, []);

  const simulateFetch = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { Name: "John", Age: 30, Country: "USA", Mobile: 11223344 },
          { Name: "Emma", Age: 25, Country: "UK" },
          { Name: "Liam", Age: 35, Country: "Canada" },
          { Name: "Liam", Age: 35, Country: "Canada" },
          { Name: "Liam", Age: 35, Country: "Canada" },
        ]);
      }, 1000);
    });
  };

  // Data for piechart
  const data = [
    { title: "One", value: 30, color: "#3B82F6" },
    { title: "Two", value: 50, color: "#909090" },
  ];

  return (
    <>
      <div className={`${styles.container} ${styles[themeMode]}`}>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={`${styles.stats} ${styles[themeMode]}`}>
              <p className={`${styles.title} ${styles[themeMode]}`}>Views</p>
              <p className={`${styles.number} ${styles[themeMode]}`}>100</p>
            </div>
            <div className={`${styles.stats} ${styles[themeMode]}`}>
              <p className={`${styles.title} ${styles[themeMode]}`}>Starts</p>
              <p className={`${styles.number} ${styles[themeMode]}`}>100</p>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <div className={styles.scrollTable}>
              <table>
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <td
                          className={"${styles.tableData} ${styles[themeMode]"}
                          key={colIndex}
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.pieTextWrapper}>
            <div className={styles.piechart}>
              <PieChart
                className={styles.pie}
                data={data}
                lineWidth={20}
                animate
              />
            </div>
            <span className={styles.completionWrapper}>
                  <p className={`${styles.completed} ${styles[themeMode]}`}>Completed</p>
                  <p 
                  className={`${styles.completed} ${styles.textCenter} ${styles[themeMode]}`}
                  >
                  33
                  </p>
            </span>
          </div>

          <div className={`${styles.percentage} ${styles[themeMode]}`}>
                <p className={`${styles.rate} ${styles[themeMode]}`}>Completion rate</p>
                <p className={`${styles.rate} ${styles[themeMode]}`}>33%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Response;
