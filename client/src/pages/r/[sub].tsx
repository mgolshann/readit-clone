import Head from "next/head"
import { useRouter } from "next/router"
import { ChangeEvent, createRef, Fragment, useEffect, useState } from "react"
import useSWR from "swr"
import PostCard from "../../components/PostCard";
import { Sub } from "../../types"
import Image from 'next/image'
import classNames from 'classnames'
import { useAuthState } from '../../context/auth'
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function SubPage() {
    // Local State
    const [ownSub, setOwnSub] = useState(false)
    //Gloval state
    const { authenticated, user } = useAuthState()
    // Utils
    const router = useRouter()
    const fileInputRef = createRef<HTMLInputElement>()

    const subName = router.query.sub
    const { data: sub, error, revalidate } = useSWR<Sub>(subName ? `/subs/${subName}` : null)
    console.log(sub)
    const openFileInput = (type: string) => {
        if (!ownSub) return
        fileInputRef.current.name = type
        fileInputRef.current.click()
    }

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0]

        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', fileInputRef.current.name)

        try {
            axios.post(`/subs/${sub.name}/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            revalidate()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!sub) return
        setOwnSub(authenticated && user.username === sub.username)
    }, [sub])

    let postMarkup
    if (!sub) {
        postMarkup = <p className="text-lg text center">loading ...</p>
    } else if (sub.posts.length === 0) {
        postMarkup = <p className="text-lg text center">No posts submitted yet</p>
    } else {
        postMarkup = sub.posts.map(post => <PostCard key={post.identifier} post={post} />)
    }
    return (
        <div>
            <Head>{sub?.title}</Head>
            {sub && (
                <Fragment>
                    <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
                    {/* sub info and images */}
                    <div>
                        {/* banner image */}
                        <div
                            className={classNames('bg-blue-500', {
                                'cursor-pointer': ownSub
                            })}
                            onClick={() => openFileInput('banner')}
                        >
                            {sub.bannerUrn ? (
                                <div className="h-56 bg-blue-500"
                                    style={{
                                        backgroundImage: `url(${sub.bannerUrl})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover'
                                    }}
                                />
                            ) : (
                                    <div className="h-20 bg-blue-500" />
                                )}
                        </div>
                    </div>
                    {/* sub meta and detail */}
                    <div className="h-20 bg-white">
                        <div className="container relative flex">
                            <div className="absolute" style={{ top: -15 }}>
                                <Image
                                    src={sub.imageUrl}
                                    alt="Sub"
                                    onClick={() => openFileInput('image')}
                                    className={classNames("rounded-full", { "cursor-pointer": ownSub })}
                                    width={70}
                                    height={70}
                                />
                            </div>
                            <div className="pt-2 pl-24">
                                <div className="flex items-center">
                                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                                </div>
                                <p className="text-sm font-bold text-gray-500"> r/ {sub.name}</p>
                            </div>
                        </div>
                    </div>
                    {/* sub posts */}
                    <div className="container flex pt-5">
                        <div className="w-160">{postMarkup}</div>
                        <Sidebar sub={sub} />
                    </div>
                </Fragment>
            )
            }
        </div>
    )
}