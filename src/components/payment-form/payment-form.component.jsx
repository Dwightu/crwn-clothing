import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentFormContainer, FormContainer } from './payment-form.styles'
import Button from '../button/button.component'
import { useSelector } from 'react-redux'
import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { useState } from 'react'

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return
        setIsProcessingPayment(true)
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json())
        const clientSecret = response.paymentIntent.client_secret
        console.log(clientSecret)

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details:
                {
                    name: currentUser ? currentUser.displayname : 'Guest'
                }
            }
        })
        setIsProcessingPayment(false)
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('payment Successful!!!')
            }
        }
    }


    return (
        <PaymentFormContainer >
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <br></br>
                <br></br>
                <Button disabled={isProcessingPayment} buttonType='inverted'>Pay now!!</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm