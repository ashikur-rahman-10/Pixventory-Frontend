import { Helmet } from "react-helmet";
import UsePhotosByEmail from "../../Hooks/UsePhotosByEmail";
import useAuth from "../../Hooks/UseAuth";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";

const Photos = () => {
  const { user, loading } = useAuth()
  const email = user?.email
  const { userPosts, userPostsRefetch } = UsePhotosByEmail(email);
  console.log(userPosts)

  if(!user || loading)
  {
    return <CustomLoader/>
  }


  return (
    <div className="pt-16">
      <Helmet>
        <title>Pixventory | Images</title>
      </Helmet>
      <p>Photos</p>
    </div>
  );
};

export default Photos;
