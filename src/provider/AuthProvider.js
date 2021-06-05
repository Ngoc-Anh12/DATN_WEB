import React, { useState, createContext, useEffect, useContext } from 'react';
import { auth, database, firestore } from '../firebase';
// kiểm tra đăng nhập 
export const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = (email, password) => {

        return auth.signInWithEmailAndPassword(email, password);
    }
    const logout = () => {
        return auth.signOut();
    }
    const register = (email, password, role) => {
        // return firestore.collection('admin').add({
        //     email: newUser.email,
        //     role,
        //     created_at: new Date()
        // })
        //     .then(async () => {
        //         const newUser = await auth.createUserWithEmailAndPassword(email, password);
        //         await database.ref('users/' + newUser.uid)
        //             .set({
        //                 email,
        //                 created_at: new Date(),
        //                 permision: 3
        //             })
        //     });
        // return database.ref('users')
        // .set({
        //     email,
        //     created_at:new Date(),
        //     permision:3
        // })
        // .then(async ()=>{
        //     const newUser = auth.createUserWithEmailAndPassword(email,password);
        //     await firestore.collection('admin').add({
        //         email:newUser.email,
        //         role,
        //         created_at:new Date()
        //     });
        // })
        return auth.createUserWithEmailAndPassword(email,password)
        .then(async ()=>{
            await database.ref('users/'+auth.currentUser.uid)
            .set({
                email,
                created_at:new Date(),
                permission:3,
                uuid:auth.currentUser.uid,
                name:role
            });
            await firestore.collection('admin').add({
                email,
                role,
                created_at:new Date(),
                name:role
            })
            .then(()=>alert('Dang ky tk thanh cong!'))
            .catch((e)=>alert(e));

        })
    }
    useEffect(() => {
        const un = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
        return un;
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                register
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}
