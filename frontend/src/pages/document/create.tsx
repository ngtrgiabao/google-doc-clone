import useAuth from "../../hooks/useAuth";
import useWindowSize from "../../hooks/useWindowSize"

const Create = () => {
  const {heightStr} = useWindowSize();
  const {userId} = useAuth();

  
}

export default Create