import { useState, useEffect } from "react";
import api from "../api";
import Tweet from "../components/Tweet";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State for image URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTweetId, setEditTweetId] = useState(null);

  useEffect(() => {
    getTweets();
  }, []);

  const getTweets = () => {
    api
      .get("/api/tweets/")
      .then((res) => res.data)
      .then((data) => {
        setTweets(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteTweet = (id) => {
    api
      .delete(`/api/tweets/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Tweet deleted!");
        else alert("Failed to delete tweet.");
        getTweets();
      })
      .catch((error) => alert(error));
  };

  const openEditModal = (tweet) => {
    setTitle(tweet.title);
    setContent(tweet.content);
    setImage(null); // Reset image
    setImageUrl(tweet.image); // Set image URL for preview
    setEditTweetId(tweet.id);
    setIsModalOpen(true);
  };

  const createOrUpdateTweet = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    if (editTweetId) {
      api
        .put(`/api/tweets/update/${editTweetId}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) alert("Tweet updated!");
          else alert("Failed to update tweet.");
          getTweets();
          setIsModalOpen(false);
          setEditTweetId(null);
        })
        .catch((err) => alert(err));
    } else {
      api
        .post("/api/tweets/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 201) alert("Tweet created!");
          else alert("Failed to make tweet.");
          getTweets();
          setIsModalOpen(false);
        })
        .catch((err) => alert(err));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file)); // Set image URL for preview
  };

  return (
    <div>
      <Navbar />
      <div className="tweets-section">
        <h2>Tweets</h2>
        {tweets.map((tweet) => (
          <Tweet
            tweet={tweet}
            onDelete={deleteTweet}
            onEdit={openEditModal}
            key={tweet.id}
          />
        ))}
      </div>
      <button
        className="create-tweet-button"
        onClick={() => {
          setTitle("");
          setContent("");
          setImage(null);
          setImageUrl(null); // Reset image URL
          setEditTweetId(null);
          setIsModalOpen(true);
        }}
      >
        Create a New Tweet
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>{editTweetId ? "Edit Tweet" : "Create a Tweet"}</h2>
            <form onSubmit={createOrUpdateTweet}>
              <label htmlFor="title">Title:</label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <label htmlFor="content">Content:</label>
              <br />
              <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <br />
              <label htmlFor="image">Image:</label>
              <br />
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="image-preview" />
              )}
              <br />
              <input type="submit" value="Submit"></input>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
