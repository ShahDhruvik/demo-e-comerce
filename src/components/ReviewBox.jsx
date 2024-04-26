import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { ReactComponent as Star } from "../assets/svg/star.svg";
import { ReactComponent as FilledStar } from "../assets/svg/fstar.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewBox = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  // const [reviews, setReviews] = useState([]);
  const [showNotification] = useState(false);

  // useEffect(() => {
  //   fetchReviews();
  // }, []);

  // const fetchReviews = async () => {
  //   try {
  //     const res = await axiosInstance.get("reviews");
  //     setReviews(res.data);
  //   } catch (error) {
  //     console.log("Error fetching reviews:", error);
  //   }
  // };

  const handlePostReview = async () => {
    //   const localStorageData = JSON.parse(localStorage.getItem("token"));
    // const {  username } = localStorageData.user;
    try {
      const reviewData = {
        message: message,
        rating: rating,
        // username
      };
      await axiosInstance.post("reviews", reviewData);
      // showPostReviewNotification();
      // console.log("before");
      // setMessage("");
      // setRating(0);
      // console.log("after");
      // fetchReviews();
    } catch (error) {
      console.log("Error posting review:", error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 my-10">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Enter your review message..."
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex items-center mb-4">
          <span className="mr-2">Rating:</span>
          {/* Render star icons based on the rating */}
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              onClick={() => setRating(value)}
              style={{ cursor: "pointer" }}
            >
              {value <= rating ? (
                <FilledStar className="w-10 h-10 fill-current text-yellow-500" />
              ) : (
                <Star className="w-10 h-10 fill-current text-gray-500" />
              )}
            </span>
          ))}
        </div>
        <button
          onClick={handlePostReview}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Post Review
        </button>
        {showNotification && (
          <>
            <button
              id="toast-simple"
              className="fixed top-5 right-0 z-50 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-blue-600 dark:text-blue-500"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
                ></path>
              </svg>
              <div className="pl-4 text-sm font-normal">
                Thank you for Review😊😊😊
              </div>
            </button>
          </>
        )}
      </div>
      {/* <div className="mt-28">
      <h2 className="text-2xl font-bold mb-4">Ratings And Reviews</h2>
      <Slider {...sliderSettings} >
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-lg p-4 mb-4 text-center space-y-4    "
        >
            <p className="text-lg font-bold mb-2 pl-5">{review.username}</p>
         
          <div className="flex  w-full justify-center ">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className="w-4 h-4 mr-6 pb-10  fill-current text-yellow-500  "
              >
                {value <= review.rating ? (
                <FilledStar/>
                ) : (
                  <Star/> 
                )}
              </span>
            ))}
          </div>
          <p className="text-lg italic mb-2 ">{review.message}</p>
        </div>
      ))}
      </Slider>
    </div> */}
    </>
  );
};

export default ReviewBox;
