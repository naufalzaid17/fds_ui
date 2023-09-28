import Image from "next/image"

function filter() {
  return (
    <div className="">
              <div className="flex p-2 rounded-lg border-[1px] bg-white md:w-full w-36 border-secondary">
                <div className="flex">
                <Image src="/actions/filter.svg" width={15} height={15} alt="" />
                <h1 className="font-poppins text-xs pl-3 font-semibold text-primary">Filter By Value</h1>
                </div>
              </div>
    </div>
  )
}

export default filter