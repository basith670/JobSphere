import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import RecruiterJobForm from "../../components/recruiter/RecruiterJobForm";

import {
    createJob,
    updateJob,
    getJob,
} from "../../services/jobService";

export default function CreateJob() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = !!id;

    const [loading, setLoading] = useState(false);

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {

        if (!isEdit) return;

        fetchJob();

    }, [id]);

    const fetchJob = async () => {

        try {

            const data = await getJob(id);

            setInitialData(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load job.");

        }

    };

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);

            if (isEdit) {

                await updateJob(id, formData);

                toast.success("Job updated successfully.");

            }

            else {

                await createJob(formData);

                toast.success("Job created successfully.");

            }

            navigate("/recruiter/jobs");

        }

        catch (error) {

            console.error(error);

            console.log(error.response?.data);

            toast.error("Something went wrong.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="recruiter-page">

            <div className="recruiter-card">

                <div className="page-header">

                    <h1>

                        {isEdit ? "Edit Job" : "Create New Job"}

                    </h1>

                    <p>

                        {isEdit
                            ? "Update the job information."
                            : "Fill in the details below to publish a new job posting."}

                    </p>

                </div>

                <RecruiterJobForm
                    initialData={initialData || {}}
                    loading={loading}
                    onSubmit={handleSubmit}
                />

            </div>

        </div>

    );

}