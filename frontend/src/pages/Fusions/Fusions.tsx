import { Accordion, AccordionItem } from "@nextui-org/react";

export function Fusions() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem
        key="1"
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
      <AccordionItem
        key="2"
        aria-label="Janelle Lenard"
        startContent={
          <img
            alt="Janelle Lenard"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            style={{ borderRadius: "50%" }}
          />
        }
        subtitle="3 incompleted steps"
        title="Janelle Lenard"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Zoey Lang"
        startContent={
          <img
            alt="Zoey Lang"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            style={{ borderRadius: "50%" }}
          />
        }
        subtitle={
          <p className="flex">
            2 issues to<span className="text-primary ml-1">fix now</span>
          </p>
        }
        title="Zoey Lang"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
