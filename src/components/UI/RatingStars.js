import './RatingStars.css';

function StarRating({
   count = 5,
   value = 0,
   inactiveColor = "#ddd",
   size = 24,
   activeColor = "#ff8000",
}) {
   // short trick
   const stars = Array.from({ length: count }, () => "🟊");

   return (
      <div className="stars-container">
         {stars.map((s, index) => {
            let style = inactiveColor;
            if (index < value) {
               style = activeColor;
            }
            return (
               <span
                  className={"star"}
                  key={index}
                  style={{
                     color: style,
                     width: size,
                     height: size,
                     fontSize: size,
                  }}
               >
                  {s}
               </span>
            );
         })}
         {value}
      </div>
   );
}
export default StarRating;
