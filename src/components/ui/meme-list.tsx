import * as React from "react";
import { ImageItem } from "../../app/types/general";
import clsx from "clsx";
import _ from "lodash";
interface MemeListProps {
  memes: ImageItem[];
  onSelected?: (item: ImageItem) => void;
}

const MemeList: React.FC<MemeListProps> = ({ memes, onSelected }) => {
  const [memeList, setMemeList] = React.useState<ImageItem[]>(memes);

  // first load
  React.useEffect(() => {
    if (memes.length > 0) {
      const data = _.cloneDeep(memes);
      data.map((it, index) => {
        if (index === memes.length - 1) {
          it.isActive = true;
        } else {
          it.isActive = false;
        }

        return it;
      });

      setMemeList(data);
    }
  }, [memes]);

  const selectImages = (item: ImageItem) => {
    setMemeList((prev) => {
      const dataClone = _.cloneDeep(prev);
      dataClone.forEach((it) => {
        it.isActive = it.id === item.id;
      });
      return dataClone;
    });
  };

  return (
    <div>
      <div className="flex lg:flex-col flex-row items-center gap-3">
        {memeList.map((meme) => (
          <div key={meme.id} className="flex flex-col  items-center w-48 sm:w-[295px]">
            <img
              onDoubleClick={() => {
                selectImages(meme);
                if (onSelected) {
                  onSelected(meme);
                }
              }}
              src={meme.fullUrl}
              alt={meme.fullUrl}
              className={clsx(
                "object-cover w-full h-48 rounded-sm hover:border-2 hover:cursor-pointer",
                meme.isActive && "border-2 rounded-lg border-red-600 opacity-80"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { MemeList };
