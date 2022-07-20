import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentFormContainer, FormContainer } from './payment-form.styles'
import Button from '../button/button.component'

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return
    }


    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment: </h2>
                <CardElement />
            </FormContainer>
            <Button buttonType='inverted'>Pay now!!</Button>
        </PaymentFormContainer>
    )
}

export default PaymentForm