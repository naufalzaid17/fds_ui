import React from 'react'
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useState} from 'react';
const Breadcrumb = dynamic(() => import('antd').then(module => ({ default: module.Breadcrumb })), {ssr: true});
import {HomeOutlined} from "@ant-design/icons";

const Header = () => {
    const router = useRouter();
    const {pathname} = router;
    const [open, setOpen] = useState(false);
    const pathParts = pathname.split('/').filter((part) => part !== '');
    const breadcrumbItems = [
        {
            title: <HomeOutlined />,
        }
    ]

    pathParts.forEach(v1 => {
        breadcrumbItems.push({
            title: v1
        })
    })

    return (
        <div className='h-[51px] bg-secondary flex justify-between items-center text-white px-[.8rem]'>
            <div className='flex gap-2 items-center font-semibold'>
                <Breadcrumb items={breadcrumbItems}/>
            </div>

            <div className=''>
                <div className='flex items-center cursor-pointer' onClick={() => {
                    setOpen(!open)
                }}>
                    <Image src="/images/profile.jpg" width={35} height={35} alt='' className='rounded-full'/>
                </div>
                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <div className='flex border-b-[1px] border-secondary gap-2 pb-2 '>
                        <div className='flex items-center'>
                            <Image src="/images/profile.jpg" width={35} height={35} alt='' className='rounded-full'/>
                        </div>
                        <div className='text-left font-medium'>
                            <span className='text-secondary font-poppins text-sm '>profile</span>
                            <span className='text-[10px] text-black text-opacity-50 block'>Super Admin</span>
                        </div>
                    </div>
                    <ul className='mt-2 font-poppins font-medium text-xs'>
                        <li className='mb-1 text-black'>User Setting</li>
                        <li className='text-black'>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header