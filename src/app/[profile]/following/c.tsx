'use client'
import UserCardFollowing from '@/components/profile/following/UserCard'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { setFollowingsUsers } from '@/redux/slice/users'
import {  UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
import { RootState } from '@/redux/store'
import { User } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PageFollowing = ({ data,profileId }: { data: User[],profileId:string }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const users = useSelector((state: RootState) => state.users)
  const profile = useSession().data?.user
  const isProfile = useMemo(() => profile?.username === profileId, [profile?.username, profileId])
  const loadedRef = useRef(false)

const pageRedirect = (user: User) => {
  router.push(`/${user?.username}`)
}

useEffect(() => {
  if (!loadedRef.current) {
      dispatch(setFollowingsUsers({
          Users: data,
          skip: 0,
          size: 12
      }) as any)
      loadedRef.current = true;
  }
}, [data, dispatch]);



  const handleActionUnFollow = async (user: User) => {
    if (profile?.id) {
      await dispatch(UserUnFollowingApi({
        followingUserId: user.id,
        followerUserId: profile.id,
        isProfile: isProfile as boolean,
        type: "following",
        userId: user.id
      }) as any)

    }
  }
  const handleActionFollow = async (user: User) => {
    if (profile?.id) {
      await dispatch(UserFollowingApi({
        followingUserId: user.id,
        followingUsername: user.username,
        followerUserId: profile.id,
        followerUsername: profile.username,

        isProfile: isProfile as boolean,
        type: "following",
        userId: user.id
      }) as any)

    }
  }
  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followings</h1>
        <Separator />
        <div className='h-5' />
        {users.profileData.fetchFollow.followings.map((user, i) => <UserCardFollowing
          key={i} user={user}
          isProfile={isProfile}
          itself={profile?.id === user.id}
          pageRedirect={pageRedirect}
          handleActionFollow={handleActionFollow}
          handleActionUnFollow={handleActionUnFollow} />)}
        {users.profileData.fetchFollow.loading ? <>{Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}</> : <></>}

      </div>
    </div>
  )
}

export default PageFollowing


// const UserCard = ({
//   user,
//   pageRedirect,
//   handleActionUnFollow,
//   isProfile,
//   itself,
//   handleActionFollow
// }: {
//   user: User
//   pageRedirect: (user: User) => void
//   handleActionUnFollow: (user: User) => void
//   isProfile?: boolean
//   itself?: boolean
//   handleActionFollow: (user: User) => void
// }) => {
//   if (!user) return null
//   return (
//     <>
//       <div className='flex justify-between px-2 my-4'>
//         <div className='flex space-x-2 items-center cursor-pointer' onClick={() => pageRedirect(user)}>
//           {/* <Avatar className='h-10 w-10 mx-auto'>
//             <AvatarImage src={user.profilePicture || "/user.jpg"}
//               alt="@sky" className='rounded-full' />
//           </Avatar> */}
//           <SkyAvatar url={user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto ' />
//           <div>
//             <div className='font-semibold text-base'>
//               {user.username}
//             </div>
//             <div className='text-sm'>
//               {user.email}
//             </div>
//           </div>
//         </div>
//         <div className='flex items-center'>
//           {!itself && <>
//             {user.isFollowing ?
//               <Button variant={"secondary"} className=" rounded-xl" onClick={() => handleActionUnFollow(user)}>
//                 Unfollow
//               </Button> :
//               <Button variant={"default"}
//                 className="rounded-xl" onClick={() => handleActionFollow(user)}>
//                 Follow
//               </Button>}
//           </>}
//         </div>
//       </div>
//     </>
//   )
// }


const SkeletonUserCard = () => {

  return (
    <>
      <div className='flex justify-between px-2 my-4'>
        <div className='flex space-x-2 items-center'>
          <Skeleton className='h-12 w-12 mx-auto rounded-full' />
          <div className='space-y-1'>
            <div className='font-semibold text-base'>
              <Skeleton className='w-28 h-4' />
            </div>
            <div className='text-sm'>
              <Skeleton className='w-16 h-3' />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <Skeleton className='w-20 h-9 rounded-xl' />
        </div>
      </div>
    </>
  )
}