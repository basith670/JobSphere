import { motion, AnimatePresence } from "framer-motion";

import {
    FaTrashAlt,
    FaTimes,
} from "react-icons/fa";

export default function DeleteModal({

    isOpen,

    title,

    message,

    loading,

    onCancel,

    onConfirm,

}) {

    return (

        <AnimatePresence>

            {

                isOpen && (

                    <motion.div

                        className="modal-overlay"

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                    >

                        <motion.div

                            className="delete-modal"

                            initial={{
                                scale: .85,
                                opacity: 0,
                                y: 40,
                            }}

                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}

                            exit={{
                                scale: .9,
                                opacity: 0,
                            }}

                            transition={{
                                duration: .25,
                            }}

                        >

                            <div className="delete-icon">

                                <FaTrashAlt />

                            </div>

                            <h2>

                                {title}

                            </h2>

                            <p>

                                {message}

                            </p>

                            <div className="modal-actions">

                                <button

                                    className="cancel-btn"

                                    onClick={onCancel}

                                    disabled={loading}

                                >

                                    <FaTimes />

                                    Cancel

                                </button>

                                <button

                                    className="delete-btn"

                                    onClick={onConfirm}

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ?

                                            "Deleting..."

                                            :

                                            "Delete"

                                    }

                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

}