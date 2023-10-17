import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";
 

function App() {
  const [images, setImages] = useState([]);
  const [modelImages, ModelSetImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const apiKey = 'rMixwfwt67LowcJq3tiGMG-5f733KEam4LQr7fd_kdk';
  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Unsplash API key

    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          count: 30, // Number of images you want
        },
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      })
      .then((response) => {
        const imageArray = response.data.map((item) => ({
          id: item.id,
          src: item.urls.raw,
          thumbnail: item.urls.thumb,
          thumbnailWidth: item.width, // Adjust these dimensions as needed
          thumbnailHeight: item.height,
          likes: item.likes,
          username: item.user.name || item.user.username,
          caption: item.description || item.alt_description,
          alt: item.description || item.alt_description,

        }));
        setImages(imageArray);
        ModelSetImages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchQuery === '') {
        alert("type something...")
        return;
      }
      axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchQuery.trim()}`, {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      })
        .then((res) => {
          // setImages(res.data.results)
          const imageArray = res.data.results.map((item) => ({
            id: item.id,
            src: item.urls.raw,
            thumbnail: item.urls.thumb,
            thumbnailWidth: item.width, // Adjust these dimensions as needed
            thumbnailHeight: item.height,
            likes: item.likes,
            username: item.user.name || item.user.username,
            caption: item.description || item.alt_description,
            alt: item.description || item.alt_description,

          }));
          setImages(imageArray);
          ModelSetImages(res.data.results)
          // console.log(res)
        })
        .catch((err) => console.log(err))
      setSearchQuery("");
    }

  }

  const openImagePopup = (image) => setSelectedImage(image);
  const closeImagePopup = () => setSelectedImage();

  const setModel = (image) => {
    let ci = modelImages.find((i) => i.id === image.id);

    openImagePopup(ci);
  }
   
  return (
    <div>
      <div className="bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center my-8">
            <input
              type="text"
              placeholder="Search for images"
              className="w-96 p-2 rounded-full border border-gray-300
               focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"> */}
          <div className="">

            <Gallery
              enableImageSelection={false}
              images={images}
              onClick={(index, item, e) => { setModel(item) }}
               

            />

            {/* The Popup Modal */}
            {selectedImage && (
              <div className="fixed modal-bg inset-0 flex overflow-scroll items-center justify-center z-50">
                <div className=" fixed  bg-black opacity-50" onClick={closeImagePopup}></div>
                <div className="modal-content bg-white rounded-lg shadow-lg p-4">
                  <img
                    src={selectedImage.urls.raw} // Use regular-sized image
                    alt={selectedImage.alt_description || selectedImage.description}
                    height={selectedImage.height}
                    width={selectedImage.width}
                    className="rounded-lg w-full h-auto"
                  />
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mt-4">{selectedImage.user.name}</h3>
                    <p className="text-blue-600 mt-4">Likes: {selectedImage.likes}</p>
                  </div>
                  <div className="text-lg ">{selectedImage.description || selectedImage.alt_description}</div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <img
                        src={selectedImage.user.profile_image.small}
                        alt={selectedImage.user.name}
                        className="rounded-full w-16 h-16 "
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{selectedImage.user.name}</h3>
                        <p className="text-gray-600">Uploaded by {selectedImage.user.username}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeImagePopup}
                    className="block mx-auto mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div >
  );
}

export default App;
