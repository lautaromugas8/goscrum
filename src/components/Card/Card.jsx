import { useState } from "react";

export const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const datetime = new Date(createdAt).toLocaleString() + " hs.";

  const limitString = (string) => {
    if (string.length > 370) {
      return { string: string.slice(0.367).concat("..."), addButton: true };
    }
    return { string, addButton: false };
  };

  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(_id)}>
        X
      </div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{userName}</h5>
      <button
        className={status.toLowerCase()}
        type="button"
        onClick={() => editCardStatus(data)}
      >
        {status.toLowerCase()}
      </button>
      <button className={importance.toLowerCase()} type="button">
        {importance.toLowerCase()}
      </button>
      {!showMore && <p>{limitString(description).string}</p>}
      {showMore && (
        <>
          <p>{description}</p>
          <button type="button" onChange={() => setShowMore(false)}>
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button type="button" onChange={() => setShowMore(true)}>
          Ver más
        </button>
      )}
    </div>
  );
};
