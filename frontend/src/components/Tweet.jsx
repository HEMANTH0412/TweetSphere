import PropTypes from "prop-types";
import "../styles/Tweet.css";

function Tweet({ tweet, onDelete, onEdit }) {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString("en-US");

  return (
    <div className="tweet-container">
      <div className="tweet-header">
        <h3 className="tweet-title">{tweet.title}</h3>
        <p className="tweet-date">{formattedDate}</p>
      </div>
      <p className="tweet-content">{tweet.content}</p>
      {tweet.image && (
        <img src={tweet.image} alt="Tweet" className="tweet-image" />
      )}
      <div className="tweet-actions">
        <button className="edit-button" onClick={() => onEdit(tweet)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(tweet.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Tweet;
