import Image from "next/image"

export default function search() {
  return (
    <>
            <div className="rounded-xl relative">
              <div className="absolute top-1/2 -translate-y-1/2 pl-2">
                <Image src="/actions/search.svg" width={20} height={20} alt=""  />
              </div>
                <input className="rounded-lg py-1 border-[1px] border-secondary font-semibold pl-9 w-36 md:w-full focus:outline-none" type="search" placeholder="Search..." />
            </div>
    </>
  )
}
