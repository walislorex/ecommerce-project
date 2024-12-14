import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { user, clearCart, getTotalPrice } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      paymentMethod: "cod",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    clearCart();
    navigate("/confirmation");
  };

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="section-title">Checkout</h1>
        <p className="text-center text-gray-500">
          Your cart is empty. Please add items to your cart before checking out.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{marginTop:"40px"}}>
      <h1 className="section-title">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                {...register("fullName", { required: "Full name is required", minLength: 2 })}
                placeholder="John Doe"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                {...register("address", { required: "Address is required", minLength: 5 })}
                placeholder="123 Main St"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">City</label>
                <input
                  {...register("city", { required: "City is required", minLength: 2 })}
                  placeholder="New York"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Zip Code</label>
                <input
                  {...register("zipCode", { required: "Zip code is required", minLength: 5 })}
                  placeholder="10001"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Payment Method</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="credit"
                    {...register("paymentMethod")}
                    checked={paymentMethod === "credit"}
                    onChange={() => setPaymentMethod("credit")}
                    className="mr-2"
                  />
                  <span>Credit Card</span>
                </label>
              </div>
            </div>
            {paymentMethod === "credit" && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Card Number</label>
                  <input
                    {...register("cardNumber", { required: "Card number is required" })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Expiry Date</label>
                    <input
                      {...register("cardExpiry", { required: "Expiry date is required" })}
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry.message}</p>}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">CVC</label>
                    <input
                      {...register("cardCvc", { required: "CVC is required" })}
                      placeholder="123"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.cardCvc && <p className="text-red-500 text-sm">{errors.cardCvc.message}</p>}
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full">
              Place Order
            </button>
          </form>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {user.cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

