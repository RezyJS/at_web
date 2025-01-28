import { Skeleton } from "./ui/skeleton"

export default function ClaimsSkeleton() {
  return (
    <div className="flex flex-col justify-start items-start w-full mb-5 gap-[20px] border-neutral-300 border-[1px] p-4 rounded-xl">
      <Skeleton className="h-[30px] w-full"/>
      <Skeleton className="h-[100px] w-full"/>
      <Skeleton className="h-[30px] w-full"/>
    </div>
  );
}