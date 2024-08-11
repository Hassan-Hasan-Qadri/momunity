import React, { useState } from "react";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import { createreply } from "../../services/replyCreateService";
import { useNavigate } from "react-router-dom";
import send from '../../img/discussion-forum/send.svg'

const PostReply = ({ id }) => {
  const [data, setData] = useState({ comment: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = {
    comment: Joi.string().required().min(5).label("Comment"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    await doSubmit();
  };

  const handleChange = ({ target: input }) => {
    const updatedData = { ...data };
    updatedData[input.name] = input.value;
    setData(updatedData);

    const errorMessages = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorMessages[input.name] = errorMessage;
    else delete errorMessages[input.name];

    setErrors(errorMessages);
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaField = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaField);
    return error ? error.details[0].message : null;
  };

  const doSubmit = async () => {
    try {
      await createreply(data, id);
      navigate(`/post/${id}`);
      window.location.reload();
    } catch (ex) {
      toast.error("An error occurred while posting the reply.");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="container col-lg-12 shadow-lg p-3 mt-5 bg-body rounded">
        <form onSubmit={handleSubmit}>
          <div className="reply-form">
            {/* <label htmlFor="comment">Post Reply</label> */}
            <div style={{width:'100%'}}>
            {errors.comment && (
              <div className="alert alert-info">{errors.comment}</div>
            )}
            <textarea
              className="reply-text-box"
              value={data.comment}
              onChange={handleChange}
              name="comment"
              id="comment"
            />
            </div>
            <div className="text-center">
                
              <button
                className="reply-send-button-container"
                disabled={validate()}
              >
                <img className="reply-send-button" src={send}/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PostReply;
