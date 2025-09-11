import * as React from "react"
import { ImageItem } from "../../app/types/general";

interface MemeListProps {
   memes: ImageItem[];
}

const MemeList: React.FC<MemeListProps> = ({ memes }) => {
  return (
    <div>
         <div className="flex flex-col items-center gap-4">
        {memes.map((meme) => (
         <div key={meme.id} className="flex flex-col items-center w-64">
            <img src={meme.fullUrl} alt={meme.fullUrl} className="object-cover w-full h-48 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

export { MemeList };
