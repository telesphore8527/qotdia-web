import "./ErrorState.css";
import { FaExclamation, FaExclamationTriangle } from "react-icons/fa";


export function ErrorCard({
  showCard,
  icon,
  title,
  subTitle,
  buttonValue,
  onClick,
}) {


  return (
    <section className="errorcard-section">
      <section className={showCard ? "errorcard showcard" : "errorcard"}>
        <div className="errorcard-logo">{icon}</div>
        <h2 className="errorcard-title">{title}</h2>
        <p className="errorcard-subtitle">{subTitle}</p>
        <button className="errorcard-button" onClick={onClick}>
          {buttonValue}
        </button>
      </section>
    </section>
  );
}

export function HomeError({ onClick }) {


  return (
    <section className="homeerror">
      <header>Daily quote</header>
      <ErrorCard
        showCard
        icon={<FaExclamation />}
        title="Quote unavailable !!"
        subTitle="Check your network connection to load the daily Quote."
        buttonValue="Retry"
        onClick={() => onClick()}
      />
    </section>
  );
}

export function ExploreError({ onClick, search, message }) {



  return (
    <section className="exploreerror">
      <header className="exploreerror-search">{search} </header>

      <ErrorCard
        icon={<FaExclamationTriangle />}
        title="Error while fetching quotes !!"
        subTitle={message ? message :"An error occured at server side."}
        buttonValue="Retry"
        onClick={() => onClick()}
      />
    </section>
  );
}
