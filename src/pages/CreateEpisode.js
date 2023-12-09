import React, { useState } from "react";
import Header from "../components/common/Header";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/common/Input";
import FileInput from "../components/common/Input/FileInput";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import ButtonLoader from "../components/common/ButtonLoader";


function CreateEpisodePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAudioFile = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (title && description && audioFile) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
 
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: description,
          audioFile: audioURL,
          id: Date.now(),
        };

        await addDoc(
          collection(db, "podcasts", id, "episodes"),
          episodeData
        );

        toast.success("Episode created successfully.")
        setLoading(false)
        navigate(`/podcasts/${id}`)
        setTitle("")
        setDescription("")
        setAudioFile("")

      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All fields required.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
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
          accept={"audio/*"}
          id={"audio-file-input"}
          text={"Upload Audio File"}
          handleFileFnc={handleAudioFile}
        />
        <Button
          text={loading ? <ButtonLoader/> : "Create"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateEpisodePage;
