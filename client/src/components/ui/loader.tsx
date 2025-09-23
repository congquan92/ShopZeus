import { LoaderIcon } from "lucide-react";
export default function Loader( {text, subtext } : {text: string, subtext?: string} ) {
  return (
      <div className="text-center py-10 text-gray-500 flex flex-col items-center">
          <LoaderIcon className="animate-spin " />
               {text}
          <img src="/cat.gif" alt="" className="w-32 h-32 mt-6" />
          {subtext && <div className="mt-6 text-sm text-gray-400">{subtext}</div>}
      </div>
  );
}