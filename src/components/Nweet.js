import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "myFirebase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => { // async(비동기) 사용하는 이유는 실제로 DB에서 삭제하는데 시간이 걸리므로
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if(ok) {
      await deleteDoc(doc(db, "nweets", `${nweetObj.id}`))
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);  // 이전의 editing으로 세팅
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "nweets", `${nweetObj.id}`), {
      text: newNweet,
    });
    setEditing(false);    // 더 이상 editing 모드가 아님
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewNweet(value);
  }
  return (
    <div>
      { editing ? (
        <>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange}/>
          <input type="submit" value="Update Nweet"></input>
        </form> 
        <button onClick={toggleEditing}>Cancel</button>
        </>
        
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
      <>
        <button onClick={onDeleteClick}>Delete Nweet</button>
        <button onClick={toggleEditing}>Edit Nweet</button>
      </>
      )}
    </div>
  );
};

export default Nweet;