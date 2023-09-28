import dynamic from 'next/dynamic'; 
const HeadTitle = dynamic(() => import('../components/HeadTitle'),{csr: true})
const Layout  = dynamic(() => import('../components/layout/Layout'),{csr: true})

const BarChart = dynamic(() => import('../components/BarChart'), { csr: true });
const LineChart = dynamic(() => import('../components/LineChart'), { csr: true });
const Heatmap = dynamic(() => import('../components/Heatmap'), { csr: true });

const Dashboard = () => {

  return (
        <Layout>
            <HeadTitle title="Dashboard"/>
            <div className='w-full'>
                <div className="w-full flex flex-col gap-[.8rem]">
                    <div className="flex flex-wrap w-full ">

                        <div class="w-full max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div
                                class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                                <div class="flex-auto p-4">
                                    <div class="flex flex-row -mx-3">
                                        <div class="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase">Todays
                                                    Money</p>
                                                <h5 class="mb-2 font-bold ">$53,000</h5>
                                                <p class="mb-0">
                                                    <span
                                                        class="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                                                    since yesterday
                                                </p>
                                            </div>
                                        </div>
                                        <div class="px-3 text-right basis-1/3">
                                            <div
                                                class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                                                <i class="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="w-full max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div
                                class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                                <div class="flex-auto p-4">
                                    <div class="flex flex-row -mx-3">
                                        <div class="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase">Todays
                                                    Users</p>
                                                <h5 class="mb-2 font-bold">2,300</h5>
                                                <p class="mb-0 dark:opacity-60">
                                                    <span
                                                        class="text-sm font-bold leading-normal text-emerald-500">+3%</span>
                                                    since last week
                                                </p>
                                            </div>
                                        </div>
                                        <div class="px-3 text-right basis-1/3">
                                            <div
                                                class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-red-600 to-orange-600">
                                                <i class="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="w-full max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div
                                class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                                <div class="flex-auto p-4">
                                    <div class="flex flex-row -mx-3">
                                        <div class="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase">New
                                                    Clients</p>
                                                <h5 class="mb-2 font-bold">+3,462</h5>
                                                <p class="mb-0">
                                                    <span
                                                        class="text-sm font-bold leading-normal text-red-600">-2%</span>
                                                    since last quarter
                                                </p>
                                            </div>
                                        </div>
                                        <div class="px-3 text-right basis-1/3">
                                            <div
                                                class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-emerald-500 to-teal-400">
                                                <i class="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="w-full max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/4">
                            <div
                                class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                                <div class="flex-auto p-4">
                                    <div class="flex flex-row -mx-3">
                                        <div class="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase">Sales</p>
                                                <h5 class="mb-2 font-bold">$103,430</h5>
                                                <p class="mb-0">
                                                    <span
                                                        class="text-sm font-bold leading-normal text-emerald-500">+5%</span>
                                                    than last month
                                                </p>
                                            </div>
                                        </div>
                                        <div class="px-3 text-right basis-1/3">
                                            <div
                                                class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-orange-500 to-yellow-500">
                                                <i class="ni leading-none ni-cart text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">

                    <div className="bg-white shadow-xl rounded-2xl bg-clip-border px-5 py-5 w-1/2">
                        <LineChart/>
                    </div>
                    <div className="bg-white shadow-xl rounded-2xl bg-clip-border px-5 py-5 w-1/2">
                        <BarChart/>
                    </div>
                    </div>
                    <div className="bg-white shadow-xl rounded-2xl bg-clip-border px-2 py-2">
                        <Heatmap/>
                    </div>
                </div>
            </div>
      </Layout>
  )
}
export default Dashboard
