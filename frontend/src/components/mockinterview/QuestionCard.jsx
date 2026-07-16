export default function QuestionCard({

    question,

}) {

    return (

        <div
            className="question-display"
        >

            <h2>

                Interview Question

            </h2>

            <p>

                {question}

            </p>

        </div>

    );

}