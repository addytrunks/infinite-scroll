'use client'

import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {

  const [dataSource,setDataSource] = useState([])
  const [page,setPage] = useState(1)

  const fetchData = async () => {
    const res = await fetch(`https://randomuser.me/api/?page=${page}&results=30&seed=abc`)
    const data = await res.json()
    setDataSource(dataSource.concat(data.results))
    setPage(page+1)
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="text-center mt-4">
        <InfiniteScroll dataLength={dataSource.length} hasMore={true} next={fetchData} loader={<p>Loading....</p>} endMessage='End'>
            {dataSource.map(data => (
              <p>{data.name.first}</p>
            ))}
        </InfiniteScroll>
        
    </div>
  )
}
