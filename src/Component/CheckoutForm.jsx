import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/Provider/AuthProvider';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CheckoutForm = ({ price, trainer, classId,slotId }) => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        const getClientSecret = async () => {
            // server request...
            const { data } = await axiosSecure.post('/create-payment-intent', {
                price
            })
            setClientSecret(data?.clientSecret)
        }
        getClientSecret()
    }, [axiosSecure, price])


    const handleSubmit = async event => {
        setProcessing(true)
        // Block native form submission.
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error)
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            setCardError(null)
        }
        // taka pay
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        })

        if (result?.error) {
            setCardError(result?.error?.message)
            return
        }
        if (result?.paymentIntent?.status === 'succeeded') {
            const bookingData = {
                transactionId: result?.paymentIntent?.id,
                userEmail: user?.email,
                paidAt: new Date().toISOString(),
                trainerId: trainer?._id,
                className: trainer?.className,
                trainerName: trainer?.trainerName,
                slotTime: trainer?.slotTime,
                slotName: trainer?.slotName,
                price,
                classId,
                slotId,
            };

            try {
                const { data } = await axiosSecure.post('/order', bookingData);
                if (data?.paymentId || data?.insertedId) {
                    Swal.fire('Success!', 'Order placed successfully!', 'success')
                }
            } catch (err) {
                console.error(err);
            } finally {
                setProcessing(false);
                setCardError(null);
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#424770',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {cardError && <p className='text-red-500 my-2'>{cardError}</p>}
            <button type="submit" disabled={!stripe || processing} className="mt-6 bg-gradient-to-r from-gray-900 to-lime-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
                Pay ${price}
            </button>
        </form>
    );
};



export default CheckoutForm;