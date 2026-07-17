import { useState } from "react";

export default function InterviewModal({

    open,

    onClose,

    onSave,

}) {

    const [date, setDate] = useState("");

    const [time, setTime] = useState("");

    const [notes, setNotes] = useState("");

    if (!open) return null;

    const handleSubmit = () => {

        if (!date || !time) {

            return;

        }

        onSave({

            interview_date: `${date}T${time}`,

            recruiter_notes: notes,

        });

    };

    return (

        <div className="modal-overlay">

            <div className="interview-modal">

                <h2>

                    Schedule Interview

                </h2>

                <div className="form-group">

                    <label>

                        Interview Date

                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>

                        Interview Time

                    </label>

                    <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                            setTime(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>

                        Recruiter Notes

                    </label>

                    <textarea
                        rows="4"
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                    />

                </div>

                <div className="modal-actions">

                    <button
                        className="secondary-btn"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        className="create-job-btn"
                        onClick={handleSubmit}
                    >

                        Schedule

                    </button>

                </div>

            </div>

        </div>

    );

}