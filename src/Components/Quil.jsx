import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { doc, updateDoc, collection, getDoc } from 'firebase/firestore'; // Import Firestore functions
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom'; // Import useParams
import { dbStore } from "../Config/Firebase";

function Quil() {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState("");
  const channelCollection = collection(dbStore, "youtube"); // Reference to your Firestore collection
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const newValue = quillRef.current.firstChild.innerHTML;
        setValue(newValue);
      });
    }
  }, [quill]);

  useEffect(() => {
    if (value) {
      const channeldoc = doc(channelCollection, id); // Use the id from the URL
      updateDoc(channeldoc, { content: value }); // Replace "content" with the actual field name
    }
  }, [value, id]); // Add id to the dependency array

  useEffect(() => {
    const fetchData = async () => {
      const channeldoc = doc(channelCollection, id);
      const docSnap = await getDoc(channeldoc);

      if (docSnap.exists()) {
        const content = docSnap.data().content;
        if (quill && content) {
          quill.clipboard.dangerouslyPasteHTML(content);
        }
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id, quill]);

  return (
    <div style={{ width: "100%", maxWidth: 8000, margin: "auto",height:"50vh" }}> {/* Adjust the width and styling here */}
      <div ref={quillRef} />
    </div>
  );
}

export default Quil;
