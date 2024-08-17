import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./button.module.css";
import Modal from "react-modal";
import { SettingActions } from "../reducers/settingReducer";
import emailjs from 'emailjs-com';

const PaymentButton = (props) => {
  const dispatch = useDispatch();
  const options = [
    {
      text: "Proceed to payment",
      handler: props.actionProvider.handleProceedToPayment,
      id: 1,
    },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCancel, setPaymentCancel] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const cancelModal = () => {
    dispatch(SettingActions.setLoading(true));
    setTimeout(() => {
      dispatch(SettingActions.setLoading(false));
      setPaymentCancel(true);
      setPaymentSuccess(false);
      setModalClosed(false);
      setModalIsOpen(false);
      setTimeout(() => {
        setPaymentCancel(false);
      }, 2000);
    }, 2000);
  };

  function sendEmail(){
  
    emailjs.init("nEOa7brxpEkuoZvpM");
  
  
    emailjs.send("service_dfxu0dm","template_r29dk04")
    .then(() => alert("Thank you. The request is successfully sent."))
    .catch(err => console.error('Failed to send email:', err));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Mock payment processing
    sendEmail();
    dispatch(SettingActions.setLoading(true));
    setTimeout(() => {

      dispatch(SettingActions.setLoading(false));
      setModalClosed(true);
      setPaymentSuccess(true);
      closeModal();
      setTimeout(() => {
        setModalClosed(false);
      }, 2000);
    }, 2000); // Simulate payment processing time
  };

  const buttonsMarkup = options.map((option) => (
    <>
      <button
        key={option.id}
        onClick={openModal}
        className={`text-white border-none px-4 py-2 rounded ${paymentSuccess ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 cursor-pointer'}`}
        disabled={paymentSuccess}
      >
        {option.text}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Form"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <h2>Payment Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Amount: </label>
            <input type="text" disabled value={"RM 50,000"} />
          </div>
          <div>
            <label>Credit/Debit Card Number</label>
            <input
              type="text"
              id="CardNumber"
              name="CardNumber"
              required
              autoComplete="on"
              value={"****-****-****-****"}
            />
          </div>
          <div>
            <label>Expiry Date</label>
            <input
              type="text"
              id="ExpiryDate"
              name="ExpiryDate"
              required
              autoComplete="on"
              value={"09/29"}
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              required
              autoComplete="on"
              value={"***"}
            />
          </div>
          <button type="submit">Submit Payment</button>
          <button
            type="button"
            onClick={cancelModal}
            className="close-button my-2"
          >
            Cancel
          </button>
        </form>
      </Modal>
      {modalClosed && (
        <div className="payment-success">Payment Successful!</div>
      )}
      {paymentCancel && (
        <div className="payment-cancel">Payment Failed! Please try again</div>
      )}
    </>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default PaymentButton;
