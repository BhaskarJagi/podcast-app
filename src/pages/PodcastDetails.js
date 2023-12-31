import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";
import AudionPlayer from "../components/Podcasts/AudioPlayer";

function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodesData, setEpisodeData] = useState([]);
  const [playingFile, setPlayingFile] = useState();
  const [playingTitle, setPlayingTitle] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
        toast.success("Podcast Found.");
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
      }
    } catch (e) {
      toast.error(e.messgae);
    }
  };

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        // console.log(episodesData);
        setEpisodeData(episodesData);
      },
      (error) => {
        toast.error("Error fetching episodes.");
      }
    );

    return () => {
      unSubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="input-wrapper podcast-page" style={{ marginTop: "2rem", gap: "1rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  style={{ width: "300px" }}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcasts/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <div className="bannerImage-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title">Episodes</h1>
            {episodesData.length > 0 ? (
              <>
                {episodesData.sort((a,b) => a.id - b.id).map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file,title) => {
                        setPlayingFile(file)
                        setPlayingTitle(title)
                      }
                      }
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudionPlayer audioSrc={playingFile} image={podcast.displayImage} title={playingTitle} />
      )}
    </div>
  );
}

export default PodcastDetailsPage;
