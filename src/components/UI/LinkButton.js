import "./LinkButton.css";

function LinkButton({ href, children }) {
   return (
      <a href={href} className="btn btn-primary" target="blank">
         {children}
      </a>
   );
}

export default LinkButton;
