import createElement from "../render/HtmlElement.js";

const feedback = createElement('div', {classes: ['feedback-message', 'hidden']});

export default () => {
    clearFeedback()
    return feedback;
}

export const setFeedbackMessage = message => {
    feedback.classList.remove('hidden');
    feedback.textContent = message;
    feedback.scrollIntoView({block: "end", behavior: "smooth"});
}

export const clearFeedback = () => {
    feedback.classList.add('hidden');
    feedback.textContent = '';
}