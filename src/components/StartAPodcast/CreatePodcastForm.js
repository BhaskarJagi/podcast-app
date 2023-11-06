import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/Input";
import { toast } from "react-toastify";
import Button from "../common/Button";
import FileInput from "../common/Input/FileInput";
import { auth, db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (title && description && displayImage && bannerImage) {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageURL = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageURL = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: description,
          bannerImage: bannerImageURL,
          displayImage: displayImageURL,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        toast.success("Podcast created successfully.");
        setLoading(false);
        setTitle("");
        setDescription("");
        setDisplayImage(null);
        setBannerImage(null);
        navigate("/podcasts");
      } else {
        toast.error("All fields are required.");
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  const handleDispalyImage = (file) => {
    setDisplayImage(file);
  };
  const handleBannerImage = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={description}
        setState={setDescription}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id={"display-image-input"}
        text={"Select Display Image"}
        handleFileFnc={handleDispalyImage}
      />
      <FileInput
        accept={"image/*"}
        id={"banner-image-input"}
        text={"Select Banner Image"}
        handleFileFnc={handleBannerImage}
      />
      <Button
        text={loading ? "Loading..." : "Create"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreatePodcastForm;
