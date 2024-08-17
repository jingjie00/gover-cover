const Buttons = (props) => {
  return (
    <div className="btn-container my-3">
      {props.buttonList.map((button, index) => {
        return <button type="button" className={button.btnClass} key={index} onClick={(e) => {button.action()}} style={{fontWeight: "bold", fontSize: "20px"}}>
          {button.text}
        </button>;
      })}
    </div>
  );
};

export default Buttons;
