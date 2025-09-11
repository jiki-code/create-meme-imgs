"use client";

import * as React from "react";
import { Button } from "./button";
import { Modal } from "./modal";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { setTemplates } from "@/app/redux/templateSelected";
import { memes } from "@/app/data/meme";
import { ChildProps, ThemeSelect } from "@/app/types/general";

const ThemeSelector = ({ onSelected }: ChildProps) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<ThemeSelect>({
    id: "",
    title: "",
    url: "",
  });

  React.useEffect(() => {
    dispatch(setTemplates(memes));
    if (open) {
      setItem({
        id: "",
        title: "",
        url: "",
      });
    }
  }, [dispatch, open]);

  return (
    <>
      <div className="py-1 px-6">
        <Button onClick={() => setOpen(true)} className="w-full cursor-pointer">
          Template
        </Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="font-semibold text-xl text-center">CHỌN MEME MẪU</h2>

        <div className="p-4 bg-blue-50 rounded-md overflow-y-auto max-h-[80vh] mt-5 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {memes.map((meme, index) => (
              <div key={index} className="rounded-lg flex flex-col">
                <div
                  className={clsx(
                    "relative w-full  flex flex-col cursor-pointer",
                    item?.id === meme.id &&
                      "border-2 rounded-lg border-gray-500 opacity-60"
                  )}
                  onDoubleClick={() => onSelected(meme, setOpen(false))}
                  onClick={() => setItem(meme)}
                >
                  <img
                    src={meme.url}
                    alt={meme.title}
                    className="w-64 h-64 rounded-lg object-cover"
                  />
                </div>
                <div className="p-2 text-center text-md font-medium">
                  {meme.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export { ThemeSelector };
