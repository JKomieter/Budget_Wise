const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } = require("firebase/auth");
const {
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    setDoc
} = require("firebase/firestore");
const { db, auth } = require("../firebase/config");


const sign_up = async (request, response) => {
    const { email, password, username } = request.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // save user info to database
        const usersCollectionRef = collection(db, "users");
        await addDoc(usersCollectionRef, {
            email: user.email,
            username: username,
            uid: user.uid,
        });

        return response.status(200).json({ message: "Successfully signed up", username, email, userId: user.uid });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Failed to sign up" });
    }
};

const sign_in = async (request, response) => {
    const { email, password } = request.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user) return response.status(500).json({ message: "Failed to sign in" });

        // get user info from database using email
        const usersCollectionRef = collection(db, "users");
        const queryUser = await getDocs(query(usersCollectionRef, where("email", "==", email)));

        if (queryUser.empty) return response.status(500).json({ message: "Failed to sign in" });

        const userInfo = queryUser.docs[0].data();

        return response.status(200).json({ message: "Successfully signed in", userInfo: userInfo });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to sign in" });
    }
}


const sign_out = async (request, response) => {
    try {
        await signOut(auth);
        return response.status(200).json({ message: "Successfully signed out" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to sign out" });
    }
}


const get_user_info = async (request, response) => {
    const { userId } = request.body;
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userInfo = userSnap.data();
            return response.status(200).json({ message: "Successfully got user info", userInfo });
        } else {
            return response.status(500).json({ message: "Failed to get user info" });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to get user info" });
    }
}

const check_auth_state = async (request, response) => {
    try {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return response.status(200).json({ message: "User is signed in", isAuthenticated: true });
            } else {
                return response.status(500).json({ message: "User is not signed in", isAuthenticated: false });
            }
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to check auth state", isAuthenticated: false });
    }
}


module.exports = { sign_up, sign_in, sign_out, get_user_info, check_auth_state };