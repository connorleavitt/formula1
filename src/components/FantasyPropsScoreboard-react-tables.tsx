import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import tw from "twin.macro";

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-green-500
p-5
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-300
  hover:bg-green-200
  transition-colors
`;

export function FantasyPropsScoreboardReactTables() {
  const [constructorStandings, setConstructorStandings] = useState([]);

  const getConstructorStandings = async () => {
    const response = await axios
      .get("http://ergast.com/api/f1/2023/constructorStandings.json")
      .catch((err) => console.log(err));

    if (response) {
      const constructorStandings =
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      console.log("Constructor Standings:", constructorStandings);
      setConstructorStandings(constructorStandings);
    }
  };

  const data = useMemo(
    () => [
      {
        position: "1",
        positionText: "1",
        points: "43",
        wins: "1",
        Constructor: {
          constructorId: "red_bull",
          url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
          name: "Red Bull",
          nationality: "Austrian",
        },
      },
      {
        position: "2",
        positionText: "2",
        points: "23",
        wins: "0",
        Constructor: {
          constructorId: "aston_martin",
          url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
          name: "Aston Martin",
          nationality: "British",
        },
      },
      {
        position: "3",
        positionText: "3",
        points: "16",
        wins: "0",
        Constructor: {
          constructorId: "mercedes",
          url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
          name: "Mercedes",
          nationality: "German",
        },
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "position",
        accessor: "position",
      },
      {
        Header: "points",
        accessor: "points",
      },
    ],
    []
  );
  // can have multiple header groups if multiple arrays in columns var

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    getConstructorStandings();
  }, []);

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          return row.cells.map((cell, index) => (
            <TableData {...cell.getCellProps()}>
              {cell.render("Cell")}
            </TableData>
          ));
        })}
      </TableBody>
    </Table>
  );
}
