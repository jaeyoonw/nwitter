import { useEffect, useState } from "react";
import { db } from "myFirebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

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
      console.log(nweetsArr);
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
            <div key={nweet.id}> 
              <h4>{nweet.nweets}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;