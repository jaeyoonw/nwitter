import { useEffect, useState } from "react";
import { db } from "myFirebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "components/Nweet";

// userObj는 App.js에서 넘겨받은 로그인 한 유저의 Object
const Home = ( {userObj} ) => {
  console.log(userObj);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // 이 getNweets는 오래된 방식
  /* const getNweets = async () => {  
    const querySnapshot = await getDocs(collection(db, "nweets"));
    querySnapshot.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObject, ...prev]); 
    })
  }; */ 

  useEffect(() => {
    // getNweets();
    const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const nweetsArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetsArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setNweet("");   // submit하면 다시 빈문자열로 셋팅
    } catch(e) {
      console.error("Error adding document", e);
    }
    console.log(nweet);
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
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;