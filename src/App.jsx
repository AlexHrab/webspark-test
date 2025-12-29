import { useState, useEffect } from "react";
import css from "./App.module.css";
import getPictureWithValue from "./infrastructure/unsplash";
import { ImageList } from "./components/ImageList/ImageList";
import { Header } from "./components/Header/Header";
import "react-datepicker/dist/react-datepicker.css";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPhotos("");
  }, []);

  useEffect(() => {
    setFilteredPhotos(photos);
  }, [photos]);

  const fetchPhotos = async (query, page = 1, append = false) => {
    setLoading(true);
    try {
      const response = await getPictureWithValue(query, page);
      if (append) {
        setPhotos((prev) => [...prev, ...response.data]);
        setFilteredPhotos((prev) => [...prev, ...response.data]);
      } else {
        setPhotos(response.data);
        setFilteredPhotos(response.data);
      }
    } catch (error) {
      console.error("Error loading photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPhotosByDate = (fromDate, toDate) => {
    if (!fromDate || !toDate) {
      setFilteredPhotos(photos);
      return;
    }
    const filtered = photos.filter((photo) => {
      const created = new Date(photo.created_at);
      return created >= fromDate && created <= toDate;
    });
    setFilteredPhotos(filtered);
  };

  return (
    <>
      <div className={css.appContainer}>
        <Header photos={photos} onFilter={filterPhotosByDate} />

        <div className={css.main}>
          <ImageList photos={filteredPhotos} />

          <button
            className={css.loadMoreBtn}
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchPhotos("", nextPage, true);
            }}
          >
            Load More
          </button>
        </div>
      </div>

      {loading && (
        <div className={css.overlay}>
          <RotatingLines strokeColor="green" />
        </div>
      )}
    </>
  );
}

export default App;
