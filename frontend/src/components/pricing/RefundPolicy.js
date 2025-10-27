import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function RefundPolicy() {
    
    const location = useLocation()

    const state = location.state


  return (
    <div className='refund-policy'>
        <h2>Refund policy</h2>
        <p>Thank you for choosing our services. We strive to provide you with high-quality learning experiences and are committed to your satisfaction. This refund policy outlines the terms and conditions under which you may be eligible for a refund.</p>
        <h4>5 days money-back  guarantee, no question asked:</h4>
        <ol>
            <li>
                Enjoy the confidence of risk-free experience with our 5-Day Money Back Guarantee!
                If you're not completely satisfied within the first five days of your purchase,
                we'll refund your money—no questions asked. 
                Shop stress-free and experience the peace of mind you deserve. Your satisfaction is our priority!
            </li>
        </ol>
        <h4>Non-Eligibility for Refunds:</h4>
        <ol>
            <li>If you have completed more than 15 days of a plan or have successfully finished a plan, you are not eligible to request a refund.</li>
            <li>If you have generated the plan and not utilized it, we can consider it unsuitable for a refund.</li>
        </ol>
        <h4>Refund Process:</h4>
        <ol>
            <li>To request a refund, go to you profile, to configure payment plan and provide a reason</li>
            <li>Our customer support team will review your request and determine if you meet the eligibility criteria.</li>
            <li>If your refund request is approved, the refund will be issued using the same payment method used for the original purchase. Please allow a reasonable processing time for the refund to be completed.</li>
        </ol>
        <h4>Exceptions:</h4>
        <ol>
            <li>Refunds will not be granted if we find evidence of misuse, abuse, or violation of our terms of service during the plan completion.</li>
            <li>We reserve the right to refuse a refund request if we believe it to be fraudulent or if we suspect that a customer is attempting to exploit our refund policy.</li>
        </ol>
        <h4>Modifications:</h4>
        <ol>
            <li>We reserve the right to modify or update this refund policy at any time without prior notice. Any changes will be effective immediately upon posting the revised policy on our website.
            Please read and understand our refund policy before enrolling in any of our plans. If you have any questions or concerns, please contact our customer support team for further assistance.</li>
        </ol>

        {(state === '/dashboard' || state === "/categories") && <Link to = "/dashboard">Back to dashboard</Link>}

    </div>
  )
}
