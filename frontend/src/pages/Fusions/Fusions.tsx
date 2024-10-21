import { Loader } from "@/components/Loader";
import { useFusionFindFusions } from "@/hooks/database/fusions";
import { Accordion, AccordionItem } from "@nextui-org/react";

export function Fusions() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const { data: fusions, isFetching } = useFusionFindFusions({});

  return (
    <div className="flex max-w-80">
      <h1>Fusions</h1>
      {isFetching && <Loader />}
      {fusions && (
        <Accordion selectionMode="multiple">
          {fusions?.map((fusion) => (
            <AccordionItem
              key={fusion.id}
              aria-label="Chung Miller"
              startContent={
                <img
                  alt="Chung Miller"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  style={{ borderRadius: "50%" }}
                />
              }
              subtitle="4 unread messages"
              title="Chung Miller"
            >
              {defaultContent}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
