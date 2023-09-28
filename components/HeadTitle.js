import Head from 'next/head'
import React from 'react'

const HeadTitle = ({title}) => {
  return (
    <Head>
        <title>Solve Ease | {title}</title>
    </Head>
  )
}

export default HeadTitle