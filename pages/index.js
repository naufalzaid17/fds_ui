import dynamic from "next/dynamic";
const HeadTitle = dynamic(() => import('../components/HeadTitle'),{csr: true});
import Image from "next/image"
import { Input, message} from 'antd';
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const Index = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username,
        password
      };
      console.log(data);
      const response = await axios.post('http://192.168.0.109:8181/user/login', data);
    //   console.log(response);
      if (response.status === 200) {
        router.push('/Dashboard');
        message.open({
            content: 'Welcome to Solve Ease',
            type: 'success',
            duration: 3
        });
      } else {
        message.open({
            content: 'Credentials Error',
            type: 'error',
            duration: 3
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
<section>
    <HeadTitle title='Login'/>
        <div className='lg:flex lg:justify-between items-center lg:px-44 max-h-screen bg-white'>
            <div className='hidden lg:flex lg:flex-col lg:items-center w-1/2'>
                <div className='flex justify-center'>
                <Image src="/images/fix.png" width={220} height={220} alt="" />
                </div>
                <Image src="/images/login.png" width={400} height={400} alt="" />
            </div>
            <div className='flex justify-center items-center min-h-screen w-1/2'>
                <div>
                    <div className='flex justify-center'>
                    <h1 className='text-secondary font-poppins font-bold text-xl'>Log in to your account</h1>
                    </div>
                    <div>
                        <form action="">
                            <label className='text-secondary font-poppins font-bold block mt-14'>
                                Email
                            </label>
                            <input type="text" placeholder='Enter your email' className='border-[1px] border-secondary h-[42px] w-[310px] px-5 text-xs mt-4 rounded-[16px]  focus:outline-1 focus:outline-secondary' value={username
                            } onChange={(e) => setUsername(e.target.value)}/>
                            <label className='text-secondary font-poppins font-bold block mt-2'>
                                Password
                            </label>
                            <input type="password" placeholder='Enter your password' className='border-[1px] border-secondary h-[42px] w-[310px] px-5 text-xs mt-4 rounded-[16px]  focus:outline-1 focus:outline-secondary' value={password} onChange={(e) => setPassword(e.target.value)}/>

                            <div className='mt-5 flex justify-between'>
                                <div className='flex justify-center items-center'>
                                    <input type="checkbox" />
                                    <label className='font-poppins font-medium text-[11px] ml-2'>Remember me?</label>
                                </div>
                                <div>
                                    <a href="" className='font-poppins font-medium text-[11px] hover:text-secondary'>Forgot password?</a>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <button className='w-full py-2 bg-secondary text-white font-poppins font-bold rounded-[16px] hover:bg-opacity-80' type="submit" onClick={handleLogin}>Login</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </section>
  )
}

export default Index