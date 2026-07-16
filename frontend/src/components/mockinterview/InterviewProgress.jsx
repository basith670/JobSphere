export default function InterviewProgress({

    current,
    total,

}) {

    const progress =
        (current / total) * 100;

    return (

        <div
            className="progress-wrapper"
        >

            <div
                className="progress-header"
            >

                <h3>

                    Question {current}

                </h3>

                <span>

                    {current}/{total}

                </span>

            </div>

            <div
                className="progress-bar-bg"
            >

                <div
                    className="progress-bar-fill"
                    style={{
                        width:`${progress}%`
                    }}
                />

            </div>

        </div>

    );

}