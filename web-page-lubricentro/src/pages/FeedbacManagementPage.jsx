import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { useParams } from 'react-router-dom';

function FeedbackManagementPage() {
    const { feedbackId } = useParams();

    return (
        <div>
            <h1>{feedbackId ? "Editar Feedback" : "Agregar Feedback"}</h1>
            <FeedbackForm feedbackId={feedbackId} />
        </div>
    );
}

export default FeedbackManagementPage;
