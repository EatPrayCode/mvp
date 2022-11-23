import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase/firebase'

const useList = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([])

  useEffect(() => {
    if (!uid) return

    return onSnapshot(
      collection(db, 'users', uid, 'myList'),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, uid])

  return list
}

export default useList
