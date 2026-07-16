export default function AnswerBox({

    answer,

    setAnswer,

}) {

    return (

        <div className="resume-card">

            <h2>

                Your Answer

            </h2>

            <textarea

                rows="8"

                className="resume-textarea"

                placeholder="Type your answer here..."

                value={answer}

                onChange={(e)=>
                    setAnswer(
                        e.target.value
                    )
                }

            />

        </div>

    );

}