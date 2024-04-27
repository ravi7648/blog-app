import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function HoverTable({
  columns,
  dataSource,
}: {
  columns: string[];
  dataSource: any[];
}) {
  const navigate = useNavigate();

  function onRowClick(row: any) {
    if (columns[0] === "id") navigate(APP_ROUTES.USER(row["id"]));
  }

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
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row) => (
            <tr
              className="cursor-pointer"
              key={row[columns[0]]}
              onClick={() => onRowClick && onRowClick(row)}
            >
              <th scope="row">{row[columns[0]]}</th>
              {columns.slice(1).map((column, index) => (
                <td key={index}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
