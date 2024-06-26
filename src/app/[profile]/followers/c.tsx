"use client";
import UserCardFollower from '@/components/profile/follower/UserCard';
import { Separator } from '@/components/ui/separator'
import { setFollowersUsers } from '@/redux/slice/users';
import { UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions';
import { RootState } from '@/redux/store';
import { User } from '@/types';
import { useSession } from 'next-auth/react';
import {useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PageFollower = ({ data,profileId }: { data: User[],profileId:string }) => {
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
        dispatch(setFollowersUsers({
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
        followingUserId: profile.id,
        followerUserId: user.id,
        isProfile: isProfile as boolean,
        type: "followers",
        userId: user.id
      }) as any)
      /// remove from list
    }
  }

  const handleActionFollow = (user: User) => {
    if (profile?.id) {
      dispatch(UserFollowingApi({
        followingUserId: user.id,
        followingUsername:user.username,
        followerUserId: profile.id,
        followerUsername: profile.username,
        isProfile: isProfile as boolean,
        type: "followers",
        userId: user.id
    }) as any)
    }
  }

  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followers</h1>
        <Separator />
        <div className='h-5' />
        {users.profileData.fetchFollow.followers.map((user, i) => <UserCardFollower
          pageRedirect={pageRedirect}
          key={i} user={user}
          isProfile={isProfile}
          handleActionFollow={handleActionFollow}
          itself={profile?.id === user.id}
          handleActionUnFollow={handleActionUnFollow} />)}
      </div>
    </div>
  )
}

export default PageFollower


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
         
//           <SkyAvatar url={user.profilePicture || "/user.jpg"} className='h-10 w-10 mx-auto' />
//           <div>
//             <div className='font-semibold text-base'>
//               {user.username}
//             </div>
//             <div className='text-sm'>
//               {user.email}
//             </div>
//           </div>
//         </div>
//         <div className='flex items-center space-x-2'>
//           {!itself && <>
//             {!user.isFollowing &&
//               <Button variant={"default"}
//                 className="rounded-xl" onClick={() => handleActionFollow(user)}>
//                 Follow
//               </Button>}
//           </>}
//           {isProfile && <Button variant={"secondary"}
//             disabled={user.removeFollower}
//             className="rounded-xl" onClick={() => handleActionUnFollow(user)}>
//             Remove
//           </Button>}
//         </div>
//       </div>
//     </>
//   )
// }
