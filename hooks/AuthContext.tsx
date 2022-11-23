import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { getAuth, updateProfile } from "firebase/auth";

import { useRouter } from 'next/router'
import { auth } from '../lib/firebase/firebase'
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { db } from './../lib/firebase/firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (newUser: any) => Promise<void>
  updateUserPreferences: (uid: any, newUser: any) => Promise<void>
  error: string | null
  loading: boolean
}

// authentication context
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  logout: async () => { },
  updateUser: async () => { },
  updateUserPreferences: async () => { },
  error: null,
  loading: false,
})

export function AuthContextProvider({ children }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          setLoading(false)
        } else {
          setUser(null)
          setLoading(false)
        }
        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user)
        router.push('/')
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        toast.error(`Something went wrong !!!! ${err}`)
      })
      .finally(() => {
        setLoading(false)
        toast.success(`Signed in successfully`)
      })
  }
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user)
        router.push('/')
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        toast.error(`Something went wrong ${err}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const logout = async () => {
    setLoading(true)
    await signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((err) => {
        setError(err)
        toast.error(`Something went wrong ${err}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateUser = async (newUser: any) => {
    const user_: any = user;
    updateProfile(user_, newUser).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  };

  const [list, setList] = useState<[] | DocumentData[]>([])

  const updateUserPreferences = async (uid: any, newUser: any) => {
    const user_: any = user;
    updateProfile(user_, newUser).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

    if (!uid) return

    onSnapshot(
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
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      logout,
      updateUser,
      updateUserPreferences,
      error,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
