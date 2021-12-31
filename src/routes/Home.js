import { useEffect, useState } from "react";
import { db, storageService } from "myFirebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "components/Nweet";
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


// userObj는 App.js에서 넘겨받은 로그인 한 유저의 Object
const Home = ( {userObj} ) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [fileData, setfileData] = useState();

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
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, fileData, "data_url");
    console.log(response);
    /* try {    // 트윗을 Firebase에 저장
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
    */
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNweet(value); 
  };
  const onFileChange = (event) => {
    // const files = event.target.files; 와 동일 
    const {
      target: {files},
    } = event;
  
    const myFile = files[0];    // 딱 하나의 파일만 받도록
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {   // 파일을 읽어오는 것이 끝나면
      const {
        currentTarget: { result },
      } = finishedEvent;
      setfileData(result);
    }
    reader.readAsDataURL(myFile);
  };
  const onClearFileData = () => setfileData(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange}></input>
        <input type="submit" value="Nweet" /> 
        {fileData &&  (
          <div>
            <img src={fileData} width="50px" height="50px" /> 
            <button onClick={onClearFileData}>Clear</button>          
          </div>
        )} 
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