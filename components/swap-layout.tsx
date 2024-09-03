"use client";
import { useEffect, ReactNode, useState, useRef } from "react";
import { createSwapy } from "swapy";
import { EditSwitch } from "./edit-switch";

// this is the initial order of the layout of the swap layout.
const DEFAULT = {
  "1": "top" as SectionKey,
  "2": "center_left" as SectionKey,
  "3": "center_right" as SectionKey,
  "4": "bottom" as SectionKey,
};

// this is the type of the sections of the swap layout.
type SectionKey = "top" | "center_left" | "center_right" | "bottom";

interface SwapLayoutProps {
  sections: {
    [key in SectionKey]: ReactNode;
  };
  sectionSlotClassNames: {
    [key in keyof typeof DEFAULT]: string;
  };
  defaultEditing: boolean;
}

// SwapLayout is the main component of the swap layout.
export default function SwapLayout({
  sections,
  defaultEditing,
  sectionSlotClassNames,
  ...rest
}: SwapLayoutProps & React.HTMLProps<HTMLDivElement>) {
  // load the layout from local storage if it exists, otherwise use the default layout.
  const slotItems: Record<string, SectionKey> = JSON.parse(
    localStorage.getItem("dashSlotItems") || JSON.stringify(DEFAULT)
  );

  // this is the function that is called when the layout items are swapped.
  const onSwap = (object: Record<string, string | null>) => {
    localStorage.setItem("dashSlotItems", JSON.stringify(object));
  };

  const [isEditing, setIsEditing] = useState(defaultEditing);

  return (
    <>
      <EditSwitch
        defaultEditing={defaultEditing}
        onCheckedChange={setIsEditing}
      />
      <Container id="swap-layout" enable={isEditing} onSwap={onSwap} {...rest}>
        {Object.entries(slotItems).map(([slotId, sectionKey]) => {
          const section = sections[sectionKey];

          return (
            <Slot
              key={slotId}
              id={slotId}
              name={slotId}
              className={
                sectionSlotClassNames[
                  slotId as keyof typeof sectionSlotClassNames
                ]
              }
            >
              <Item name={sectionKey} className="h-full">
                {isEditing ? (
                  <Handle className="bg-slate-200  flex items-center box-border p-1 rounded-sm cursor-move flex-grow absolute z-10">
                    <svg
                      y="0px"
                      viewBox="0 0 511.987 511.987"
                      width="16"
                      height="16"
                    >
                      <path d="M507.595,245.391l-66.97-66.97c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213L460.778,241H270.991  V51.214l41.366,41.366c5.857,5.858,15.356,5.858,21.213,0c5.858-5.858,5.858-15.355,0-21.213L266.598,4.394  c-5.857-5.858-15.355-5.858-21.213,0l-66.973,66.973c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.858,15.355,5.858,21.213,0  l41.366-41.366V241H51.204l41.366-41.366c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0l-66.97,66.97  c-0.351,0.35-0.682,0.719-0.997,1.103c-4.901,5.963-4.405,14.716,0.997,20.115l66.97,66.97c5.857,5.858,15.356,5.858,21.213,0  c5.858-5.858,5.858-15.355,0-21.213L51.204,271h189.787v189.787l-41.366-41.366c-5.857-5.858-15.355-5.858-21.213,0  c-5.858,5.858-5.858,15.355,0,21.213l66.97,66.97c5.757,5.761,15.296,5.926,21.218,0l66.97-66.97c5.858-5.858,5.858-15.355,0-21.213  c-5.857-5.858-15.355-5.858-21.213,0l-41.366,41.366V271h189.787l-41.366,41.366c-5.858,5.858-5.858,15.355,0,21.213  c5.857,5.858,15.356,5.858,21.213,0l66.97-66.97C513.375,260.834,513.514,251.306,507.595,245.391z"></path>
                    </svg>
                  </Handle>
                ) : null}
                {section}
              </Item>
            </Slot>
          );
        })}
      </Container>
    </>
  );
}

interface ContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  enable?: boolean;
  onSwap?: (record: Record<string, string | null>) => void;
  config?: object;
}

// Container is the main container of the swap layout.
export const Container = ({
  id,
  enable = true,
  onSwap = () => {},
  config = undefined,
  children,
  ...rest
}: ContainerProps & React.HTMLProps<HTMLDivElement>) => {
  const swapy = useRef<ReturnType<typeof createSwapy>>();

  useEffect(() => {
    swapy.current = createSwapy(document.querySelector(`#${id}`), config);
    swapy.current.enable(enable);
    swapy.current.onSwap((event) => {
      onSwap(event.data.object);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    swapy.current?.enable(enable);
  }, [enable]);

  useEffect(() => {
    swapy.current?.onSwap((event) => {
      onSwap(event.data.object);
    });
  }, [onSwap]);

  return (
    <div id={id} {...rest}>
      {children}
    </div>
  );
};

interface SlotProps {
  id: number | string;
  className?: string;
  name?: string;
  children?: React.ReactNode;
}

// Slots are used to wrap the items of the swap layout.
export const Slot = ({
  id,
  name,
  children,
  ...rest
}: SlotProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div data-swapy-slot={name ?? `slot-${id}`} {...rest}>
      {children}
    </div>
  );
};

interface ItemProps {
  className?: string;
  name: string;
  children?: React.ReactNode;
}

// Item is the item inside the slot of the swap layout.
export const Item = ({
  name,
  children,
  ...rest
}: ItemProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div data-swapy-item={name} {...rest}>
      {children}
    </div>
  );
};

export const Handle = ({
  children,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <span data-swapy-handle {...rest}>
      {children}
    </span>
  );
};
