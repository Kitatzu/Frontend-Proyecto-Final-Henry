// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { TextField, Button } from '@mui/material';
// import { saveReview } from '../../../Redux/Thunks/reviews';

// const ReviewForm = ({ productId }) => {
//   const [review, setReview] = useState('');
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
 
//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(saveReview(productId, review, rating));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         multiline
//         rows={4}
//         variant="outlined"
//         value={review}
//         onChange={e => setReview(e.target.value)}
//       />
//       <TextField
//         type="number"
//         variant="outlined"
//         value={rating}
//         onChange={e => setRating(e.target.value)}
//       />
      
//       <Button type="submit" variant="contained" color="primary">
//         Submit Review
//       </Button>
//     </form>
//   );
// };

//  export default ReviewForm;

import React from 'react';
import { useDispatch } from 'react-redux';
import { saveReview } from '../../../Redux/Thunks/reviews';
import { TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewForm = ({ productId, averageRating }) => {
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(saveReview(productId, review, rating));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        value={review}
        onChange={e => setReview(e.target.value)}
      />
      <div>
        {Array.from({ length: 5 }, (_, i) => {
          if (i + 0.5 < averageRating) {
            return (
              <StarIcon
                key={i}
                style={{ color: '#ff9800' }}
                onClick={() => setRating(i + 1)}
              />
            );
          } else if (i < averageRating) {
            return (
              <StarHalfIcon
                key={i}
                style={{ color: '#ff9800' }}
                onClick={() => setRating(i + 0.5)}
              />
            );
          } else {
            return (
              <StarBorderIcon
                key={i}
                style={{ color: 'gray' }}
                onClick={() => setRating(i + 1)}
              />
            );
          }
        })}
       </div>
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm; 
