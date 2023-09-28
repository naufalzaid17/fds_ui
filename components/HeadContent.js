export default function HeadContent({pageTitle, caption}) {
  return (
    <>
         <h1 className="text-primary font-bold text-xl font-poppins ">{pageTitle}</h1>
         <p className="font-normal text-black text-opacity-50 text-sm">{caption}</p>
    </>
  )
}
