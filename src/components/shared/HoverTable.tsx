import { CustomColumnType } from "../../types/customColumn";

export default function HoverTable({
  columns,
  customColumns,
  dataSource,
}: {
  columns: string[];
  customColumns?: CustomColumnType<boolean>[];
  dataSource: any[];
}) {
  return (
    <div className="border-cover">
      <table className="table table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="text-uppercase">
                {column}
              </th>
            ))}
            {customColumns &&
              customColumns.length > 0 &&
              customColumns.map((customColumn, index) => (
                <th key={index} scope="col" className="text-uppercase">
                  {customColumn.column}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row) => (
            <tr key={row[columns[0]]}>
              <th scope="row">{row[columns[0]]}</th>
              {columns.slice(1).map((column, index) => (
                <td key={index}>{row[column]}</td>
              ))}
              {customColumns &&
                customColumns.length > 0 &&
                customColumns.map((customColumn, index) => (
                  <td
                    key={index}
                    onClick={() =>
                      customColumn.clickHandler &&
                      customColumn.clickHandler({ id: row["id"] })
                    }
                  >
                    {customColumn.html(
                      `${customColumn.column}-${row["id"]}`,
                      `${customColumn.column}-${row["id"]}`,
                      row[customColumn.column]
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
