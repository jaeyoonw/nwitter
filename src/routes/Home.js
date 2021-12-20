import { useEffect, useState } from "react";
import { db } from "myFirebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(db, "nweets"));
    querySnapshot.forEach((doc) => {
      setNweets((prev) => [doc.data(), ...prev]); // set에 값대신 함수를 전달
    })
  };
  useEffect(() => {
    getNweets();
  }, []);
  console.log(nweets);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "nweets"), {
        nweets: nweet,
        createdAt: Date.now()
      });
      setNweet("");   // submit하면 다시 빈문자열로 셋팅
    } catch(e) {
      console.error("Error adding document", e);
    }
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNweet(value); 
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" /> 
      </form>
    </div>
  );
};
export default Home;