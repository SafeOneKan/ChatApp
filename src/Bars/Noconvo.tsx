import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Noconvo = () => {
  return (
    <div className="nocnv">
      <div className="context">
        <div className="icon">
          <FontAwesomeIcon icon={faComment} bounce />
        </div>
        <div className="txt">
          start a Convo ya lklb . ach katsna ndirha lik ana ?
        </div>
      </div>
    </div>
  );
};

export default Noconvo;
