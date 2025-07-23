import React from "react";
import {auth, app} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {getNickName} from "../../utils";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";

const useFirebaseAuth = () => {
    const [isAuth, setIsAuthed] = React.useState<boolean>(false);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    React.useEffect(() => {
        auth && signInWithEmailAndPassword('email@email.email', 'email@email.email');
    }, [auth]);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthed(true);
                localStorage.setItem('user', getNickName(user.email));
            } else {
                setIsAuthed(false);
            }
        });
    }, []);

    return app;
};

export default useFirebaseAuth;
