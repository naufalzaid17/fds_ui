import dynamic from "next/dynamic"
const Header = dynamic(() => import('../Header'), {ssr: true})
const Sidebar = dynamic(() => import('../Sidebar'), {ssr:true})

export default function layout(props) {
    return (
        <div className="flex w-screen h-screen">
            <div className="container-1 h-full">
                <Sidebar/>
            </div>
            <disv className="container-2 h-full overflow-y-hidden">
                <Header/>
                <div className="content-container pt-5 px-5">
                    {props.children}
                </div>
            </disv>
      </div>
)
}
