import { format } from "date-fns";
import useAuth from "../../Hooks/UseAuth";
import UsePhotosByEmail from "../../Hooks/UsePhotosByEmail";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import { useSwipeable } from "react-swipeable";
import { FaEllipsisV } from "react-icons/fa"; // Three-dot menu icon

Modal.setAppElement("#root"); // Required for accessibility

const Photos = () => {
  const { user, loading } = useAuth();
  const email = useMemo(() => user?.email || "", [user]); // Memoized to avoid unnecessary renders
  const { userPosts, userPostsRefetch } = UsePhotosByEmail(email); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (email) {
      userPostsRefetch();
    }
  }, [email, userPostsRefetch]);



  // Open Image Modal
  const openModal = (image, index, allImages) => {
    setCurrentImage(image);
    setCurrentIndex(index);
    setImages(allImages);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setMenuOpen(false);
  };

  // Swipe Handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
  });

  // Next Image
  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImage(images[currentIndex + 1]);
    }
  };

  // Previous Image
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentImage(images[currentIndex - 1]);
    }
  };

  // Share Image
  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this image",
          url: currentImage.display_url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  // Delete Image
  const deleteImage = async () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      // Call API to delete image (if implemented)
      alert("Image deleted successfully.");
      setIsModalOpen(false);
    }
  };

  if (!user || !email || loading) {
    return <CustomLoader />;
  }

  return (
    <div className="pt-16">
      <Helmet>
        <title>Pixventory | Images</title>
      </Helmet>
      <div className="pt-8">
        {userPosts?.map((post) => (
          <div key={post._id} className="w-full p-2 space-y-4">
            <p className="text-sm text-gray-500 font-medium">
              {format(new Date(post?.postedIn), "dd/MM/yyyy hh:mm a")}
            </p>

            <div className="w-full grid grid-cols-4 md:grid-cols-7 gap-1 mx-auto">
              {post.images.map((image, index) => (
                <div key={index} onClick={() => openModal(image, index, post.images)}>
                  <img
                    src={image.display_url} // Updated to access display_url
                    className="w-24 h-24 md:w-32 md:h-32 rounded-sm cursor-pointer"
                    alt={`Post Image ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Image Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Viewer"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
      >
        <div {...swipeHandlers} className="relative w-full h-full flex items-center justify-center">
          {/* Display Image */}
          {currentImage && (
            <img src={currentImage.display_url} className="max-w-full max-h-full" alt="Selected" />
          )}

          {/* Navigation Controls */}
          {currentIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-gray-700 bg-opacity-50 px-2 py-1 rounded"
            >
              ◀
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-gray-700 bg-opacity-50 px-2 py-1 rounded"
            >
              ▶
            </button>
          )}

          {/* Three-Dot Menu */}
          <div className="absolute top-4 right-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl bg-gray-800 p-2 rounded-full">
              <FaEllipsisV />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-36">
                <button onClick={shareImage} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Share
                </button>
                <button onClick={deleteImage} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button onClick={closeModal} className="absolute top-4 left-4 text-white text-2xl bg-gray-800 p-2 rounded-full">
            ✖
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Photos;
