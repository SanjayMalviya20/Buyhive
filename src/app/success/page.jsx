"use client"
import Link from 'next/link';
import check from "../../../public/check.png"
import React ,{useState,useEffect} from 'react';
import Image from 'next/image';

const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const storedOrderId = localStorage?.getItem('orderId');
    const storedAmount = localStorage?.getItem('amount');
    setOrderId(storedOrderId);
    setAmount(storedAmount);
  }, []);
  return (
    <div className="payment-success h-[100vh] flex flex-col items-center justify-center text-black text-xl">
      <Image src={check} alt="check" width={150} height={150} />
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your order has been processed successfully.</p>
      <p>
        Order Details:
        <ul>
          <li>Order ID: { orderId}</li>
          <li>Amount: { amount}</li>
        </ul>
      </p>
      <Link href="/">Return to Home</Link>
    </div>
  );
};

export default PaymentSuccess;