import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUp";
import PodcastPage from "./pages/Podcasts";
import ProfilePage from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreatePodcastPage from "./pages/CreatePodcast";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateEpisodePage from "./pages/CreateEpisode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();

              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error on fetching");
          }
        );
        return () => {
          unSubscribeSnapshot();
        };
      }
    });

    return () => {
      unSubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/podcasts" element={<PodcastPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-a-podcast" element={<CreatePodcastPage />} />
            <Route path="/podcasts/:id" element={<PodcastDetailsPage />} />
            <Route path="/podcasts/:id/create-episode" element={<CreateEpisodePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
