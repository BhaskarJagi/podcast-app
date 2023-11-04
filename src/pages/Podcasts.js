import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/PodcastSlice";
import { db } from "../firebase";
import PodcastCard from "../components/Podcasts/PodcastsCard";
import InputComponent from "../components/common/Input";

function PodcastPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        // console.log(podcastsData)
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts", error)``;
      }
    );

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  let filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Discover Podcasts</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search by Title"
          type="text"
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcats not found!" : "No Podcasts."}</p>
        )}
      </div>
    </div>
  );
}

export default PodcastPage;
