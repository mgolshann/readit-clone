import Head from 'next/head'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PostCard from '../components/PostCard'
import React, { Fragment } from 'react'
import useSWR from 'swr'
import { Sub } from '../types'
import Link from 'next/link'
import Image from 'next/image'

dayjs.extend(relativeTime)

export default function Home() {
  // const [posts, setPosts] = useState<Post[]>([])
  // useEffect(() => {
  //   axios.get('/posts')
  //     .then(res => setPosts(res.data))
  //     .catch(err => console.log(err))
  // }, [])

  const { data: posts } = useSWR('/posts')
  const { data: topSubs } = useSWR('/misc/top-subs')

  return (
    <Fragment>
      <Head>
        <title>Reddit: the front page to the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Post feeds */}
        <div className="w-160">
          {posts?.map(post => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>


        {/* Sidebar */}
        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
                </p>
            </div>
            <div>
              {topSubs?.map((sub: Sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <Image
                      className="rounded-full cursor-pointer"
                      src={sub.imageUrl}
                      alt="Sub"
                      width={(6 * 16) / 4}
                      height={(6 * 16) / 4}
                    />
                  </Link>

                  <Link href={`/r/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-med">{sub.postCount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}