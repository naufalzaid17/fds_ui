import dynamic from 'next/dynamic'
const Image = dynamic(() => import('next/image'),{ssr:true});
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const Link = dynamic(() => import('next/link'),{ssr:true});
import {submenu} from '@/submenu'
import {useState} from 'react'

const Sidebar = () => {

    const [monitoringOpen, setmonitoringOpen] = useState(false);
    const [listOpen, setlistOpen] = useState(false);
    const [scenarioOpen, setscenarioOpen] = useState(false);
    const [dictionariesOpen, setdictionariesOpen] = useState(false);
    const [notificationOpen, setnotificationOpen] = useState(false);
    const [sefisOpen, setsefisOpen] = useState(false);
    const [userOpen, setuserOpen] = useState(false);


    const {monitoring, list, scenario, dictionaries, notification, sefis, user,} = submenu;

    return (
            <div className='flex flex-col gap-16 h-full bg-white w-[250px]'>
                <div className='flex items-center pt-5 pl-[1.1rem]'>
                    <Image src="/images/fix.png" width={43} height={43} alt=''/>
                    <div className='flex items-center'>
                            <span
                                className='font-poppins text-xl md:text-2xl  text-primary font-extrabold'>SOLVE EASE</span>
                    </div>
                </div>
                <div className='h-full overflow-x-hidden'>
                    <Link href="/Dashboard">
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg ">
                                        <g clipPath="url(#clip0_182_2071)">
                                            <path d="M5 12H3L12 3L21 12H19" stroke="black" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path
                                                d="M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_2071">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>Dashboard</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <button onClick={() => {
                        setmonitoringOpen(!monitoringOpen)
                    }} className='active:bg-secondary active:text-white mt-4 '>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="27" viewBox="0 0 24 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_4023)">
                                            <path
                                                d="M20 4.0708H4C3.44772 4.0708 3 4.51852 3 5.0708V15.0708C3 15.6231 3.44772 16.0708 4 16.0708H20C20.5523 16.0708 21 15.6231 21 15.0708V5.0708C21 4.51852 20.5523 4.0708 20 4.0708Z"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M7 20.0708H17" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path d="M9 16.0708V20.0708" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path d="M15 16.0708V20.0708" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path d="M8 12.0708L11 9.0708L13 11.0708L16 8.0708" stroke="#0A0A0A"
                                                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_4023">
                                                <rect width="24" height="24" fill="white"
                                                      transform="translate(0 0.0708008)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>Monitoring</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${monitoringOpen ? 'active' : 'inactive'}`}>
                        {monitoring.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => {
                        setlistOpen(!listOpen)
                    }} className='active:bg-secondary active:text-white mt-4'>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2  w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_2790)">
                                            <path
                                                d="M16 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20C17.4696 20 16.9609 19.7893 16.5858 19.4142C16.2107 19.0391 16 18.5304 16 18V5C16 4.73478 15.8946 4.48043 15.7071 4.29289C15.5196 4.10536 15.2652 4 15 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V17C4 17.7956 4.31607 18.5587 4.87868 19.1213C5.44129 19.6839 6.20435 20 7 20H18"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M8 8H12" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M8 12H12" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path d="M8 16H12" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_2790">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>List
                                        Management</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${listOpen ? 'active' : 'inactive'}`}>
                        {list.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>


                    <button onClick={() => {
                        setscenarioOpen(!scenarioOpen)
                    }} className='mt-4 active:bg-secondary active:text-white'>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="26" viewBox="0 0 24 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_5621)">
                                            <path d="M6 9.0708H12" stroke="black" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path d="M4 5.0708H8" stroke="black" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path
                                                d="M6 5.0708V16.0708C6 16.336 6.10536 16.5904 6.29289 16.7779C6.48043 16.9654 6.73478 17.0708 7 17.0708H12"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M19 7.0708H13C12.4477 7.0708 12 7.51852 12 8.0708V10.0708C12 10.6231 12.4477 11.0708 13 11.0708H19C19.5523 11.0708 20 10.6231 20 10.0708V8.0708C20 7.51852 19.5523 7.0708 19 7.0708Z"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M19 15.0708H13C12.4477 15.0708 12 15.5185 12 16.0708V18.0708C12 18.6231 12.4477 19.0708 13 19.0708H19C19.5523 19.0708 20 18.6231 20 18.0708V16.0708C20 15.5185 19.5523 15.0708 19 15.0708Z"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_5621">
                                                <rect width="24" height="24" fill="white"
                                                      transform="translate(0 0.0708008)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>Scenario
                                        Builder</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${scenarioOpen ? 'active' : 'inactive'}`}>
                        {scenario.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>


                    <button onClick={() => {
                        setdictionariesOpen(!dictionariesOpen)
                    }} className='mt-4 active:bg-secondary active:text-white'>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="27" viewBox="0 0 24 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_4727)">
                                            <path
                                                d="M19 4.0708H5C3.89543 4.0708 3 4.96623 3 6.0708C3 7.17537 3.89543 8.0708 5 8.0708H19C20.1046 8.0708 21 7.17537 21 6.0708C21 4.96623 20.1046 4.0708 19 4.0708Z"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M5 8.0708V18.0708C5 18.6012 5.21071 19.1099 5.58579 19.485C5.96086 19.8601 6.46957 20.0708 7 20.0708H17C17.5304 20.0708 18.0391 19.8601 18.4142 19.485C18.7893 19.1099 19 18.6012 19 18.0708V8.0708"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M10 12.0708H14" stroke="black" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_4727">
                                                <rect width="24" height="24" fill="white"
                                                      transform="translate(0 0.0708008)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>Dictionaries</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${dictionariesOpen ? 'active' : 'inactive'}`}>
                        {dictionaries.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => {
                        setnotificationOpen(!notificationOpen)
                    }} className='mt-4 active:bg-secondary active:text-white'>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_6543)">
                                            <path
                                                d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M21 6.727C20.3441 5.30025 19.3916 4.02969 18.206 3"
                                                  stroke="black" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M3 6.727C3.65535 5.30044 4.60715 4.0299 5.792 3"
                                                  stroke="black"
                                                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_6543">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>Notification</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${notificationOpen ? 'active' : 'inactive'}`}>
                        {notification.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>


                    <button onClick={() => {
                        setsefisOpen(!sefisOpen)
                    }} className='mt-4 active:bg-secondary active:text-white'>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="27" viewBox="0 0 24 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_2511)">
                                            <path
                                                d="M12 9.0708C16.4183 9.0708 20 7.72765 20 6.0708C20 4.41395 16.4183 3.0708 12 3.0708C7.58172 3.0708 4 4.41395 4 6.0708C4 7.72765 7.58172 9.0708 12 9.0708Z"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M9.009 14.8538C9.933 14.9938 10.942 15.0708 12 15.0708C16.418 15.0708 20 13.7278 20 12.0708V6.0708M4 6.0708V14.0708V6.0708Z"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M6 16.0708L9 19.0708L6 22.0708M11.252 21.0578C11.498 21.0668 11.748 21.0708 12 21.0708C16.418 21.0708 20 19.7278 20 18.0708V12.0708L11.252 21.0578ZM2 19.0708H9H2Z"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_2511">
                                                <rect width="24" height="24" fill="white"
                                                      transform="translate(0 0.0708008)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>SEFIS
                                        Internal Data</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${sefisOpen ? 'active' : 'inactive'}`}>
                        {sefis.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>


                    <Link href="/Report">
                        <div className='mt-4'>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_182_2702)">
                                            <path
                                                d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
                                                stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M9 7H10" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path d="M9 13H15" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                            <path d="M13 17H15" stroke="#0A0A0A" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_2702">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 group-hover:text-white'>Report</span>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <button onClick={() => {
                        setuserOpen(!userOpen)
                    }} className='mt-4 active:bg-secondary active:text-white'>
                        <div className=''>
                            <div
                                className='flex justify-between rounded-lg group hover:bg-secondary py-2 px-2 w-[12rem] md:w-[14rem] ml-3'>
                                <div className='flex items-center'>
                                    <svg width="26" height="27" viewBox="0 0 24 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" onClick={() => setisOpen(true)}>
                                        <g clipPath="url(#clip0_182_5725)">
                                            <path
                                                d="M9 11.0708C11.2091 11.0708 13 9.27994 13 7.0708C13 4.86166 11.2091 3.0708 9 3.0708C6.79086 3.0708 5 4.86166 5 7.0708C5 9.27994 6.79086 11.0708 9 11.0708Z"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M3 21.0708V19.0708C3 18.0099 3.42143 16.9925 4.17157 16.2424C4.92172 15.4922 5.93913 15.0708 7 15.0708H11C12.0609 15.0708 13.0783 15.4922 13.8284 16.2424C14.5786 16.9925 15 18.0099 15 19.0708V21.0708"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M16 3.20068C16.8604 3.42098 17.623 3.92138 18.1676 4.62299C18.7122 5.3246 19.0078 6.18751 19.0078 7.07568C19.0078 7.96385 18.7122 8.82676 18.1676 9.52837C17.623 10.23 16.8604 10.7304 16 10.9507"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                            <path
                                                d="M21 21.0708V19.0708C20.9949 18.188 20.6979 17.3316 20.1553 16.6352C19.6126 15.9388 18.8548 15.4415 18 15.2208"
                                                stroke="black" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className='group-hover:stroke-white'/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_182_5725">
                                                <rect width="24" height="24" fill="white"
                                                      transform="translate(0 0.0708008)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className='font-poppins font-bold text-xs md:text-sm ml-4 text-left group-hover:text-white'>User
                                        Management</span>
                                </div>
                                <div className='flex items-center mr-3'>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className='text-sm md:text-base group-hover:text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className={`coba ${userOpen ? 'active' : 'inactive'}`}>
                        {user.map((items, i) => (
                            <div key={i}>
                                <Link href={items.link}>
                                    <div className='w-full mx-14'>
                                        <span className='font-poppins text-[10px] text-left font-medium inline-block md:text-[11px] md:mb-2'>{items.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
          </div>
)
}

export default Sidebar
