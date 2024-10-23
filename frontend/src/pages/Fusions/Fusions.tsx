import { Loader } from "@/components/Loader";
import {
  useFusionDeleteFusion,
  useFusionFindFusions,
} from "@/hooks/database/fusions";
import { Copy, Launch, TrashCan } from "@carbon/icons-react";
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
  const { data: fusions, isFetching, refetch } = useFusionFindFusions();
  const { mutateAsync: deleteFusion, isPending: isLoadingDeleteFusion } =
    useFusionDeleteFusion();
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
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = useCallback(
    (
      fusion: IFusionUser,
      columnKey: "id" | "intervals" | "name" | "actions",
    ) => {
      const cellValue = columnKey !== "actions" ? fusion[columnKey] : "actions";

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
        case "actions":
          return (
            <div className="flex flex-row gap-2">
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  navigate(`/fusion/${fusion.id}`);
                }}
              >
                <Launch />
              </Button>
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => {
                  deleteFusion(fusion.id).then(() => refetch());
                }}
              >
                <TrashCan />
              </Button>
            </div>
          );
      }
    },
    [],
  );

  return (
    <div className="flex flex-col max-w-80 justify-center items-center gap-4">
      <h1>Fusions</h1>
      {(isFetching || isLoadingDeleteFusion) && <Loader />}
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
