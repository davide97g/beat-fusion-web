import { Loader } from "@/components/Loader";
import { useFusionFindFusions } from "@/hooks/database/fusions";
import { formatFileName } from "@/services/utils";
import { Copy, Launch } from "@carbon/icons-react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IFusionUser } from "../../../../types/fusion.types";

export function Fusions() {
  const { data: fusions, isFetching } = useFusionFindFusions();
  const navigate = useNavigate();

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "intervals",
      label: "SONGS",
    },
    {
      key: "open",
      label: "OPEN",
    },
  ];

  const renderCell = useCallback(
    (fusion: IFusionUser, columnKey: "id" | "intervals" | "name" | "open") => {
      const cellValue = columnKey !== "open" ? fusion[columnKey] : "Open";

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-row gap-2 items-center">
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "16rem",
                }}
              >
                {cellValue as string}
              </p>
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  navigator.clipboard.writeText(cellValue as string);
                }}
              >
                <Copy />
              </Button>
            </div>
          );
        case "intervals":
          return String(cellValue.length);
        case "name":
          return cellValue as string;
        case "open":
          return (
            <Button
              isIconOnly
              variant="light"
              onClick={() => {
                navigate(`/fusion/${fusion.id}`);
              }}
            >
              <Launch />
            </Button>
          );
      }
    },
    [],
  );

  return (
    <div className="flex flex-col max-w-80 justify-center items-center gap-4">
      <h1>Fusions</h1>
      {isFetching && <Loader />}
      {fusions && (
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={fusions}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as any)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
