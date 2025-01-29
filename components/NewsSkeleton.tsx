import { Skeleton } from "./ui/skeleton"

export default function NewsSkeleton() {
  return (
    <div className="flex flex-col justify-start items-start w-full mb-5 gap-[20px] p-4 rounded-xl">
      <Skeleton className="h-[30px] w-[75vw]"/>
      <Skeleton className="h-[100px] w-[75vw]"/>
      <Skeleton className="h-[30px] w-[75vw]"/>
    </div>
  )
}