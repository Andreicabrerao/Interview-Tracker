import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import { useLocation } from 'react-router-dom';

const modalTitle = {
  add: 'Add new step',
  edit: 'Edit step',
};

const ModalStep = ({
  setShowModalStep,
  action,
  currentStep,
  appId,
  setUpdateState,
}) => {
  const [date, setDate] = useState(currentStep.date || '');
  const [step_type, setStepType] = useState(currentStep.step_type || '');
  const [contact_name, setContactName] = useState(
    currentStep.contact_name || ''
  );
  const [contact_role, setContractRole] = useState(
    currentStep.contact_role || ''
  );
  const [contact, setContact] = useState(currentStep.contact || '');
  const [notes, setNote] = useState(currentStep.notes || '');

  const context = useContext(UserContext);
  console.log('appID', appId);

  const addStep = (body) => {
    fetch(`/user/${context.user.id}/application/${appId}/step`, {
      method: 'POST',

      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        data.json();
        console.log('new step added');
        setShowModalStep({ action: null, id: null });
        setUpdateState(true); // add from Lee
      })
      .catch((err) => console.log('addStep ERROR: ', err));
  };

  const editStep = (body) => {
    fetch(
      `/user/${context.user.id}/application/${appId}/step/${currentStep.id}`,
      {
        method: 'PUT',

        headers: {
          'content-type': 'application/JSON',
        },
        body: JSON.stringify(body),
      }
    ).then((data) => {
      data.json();
      console.log(`step updated`);
      setShowModalStep({ action: null, id: null });
      setUpdateState(true); // add from Lee
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      appId,
      date,
      step_type,
      contact_name,
      contact_role,
      contact,
      notes,
    };

    if (action === 'edit') {
      editStep(body);
    } else {
      addStep(body);
    }
  };

  return (
    <div id="div3" className="modalWrapper">
      <div className="modalBackground">
        <h2>{modalTitle[action]}</h2>
        <form id="list" className="modalForm">
          <label>
            Date
            <input
              type="date"
              id="date"
              value={date.slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Step Type
            <input
              type="text"
              placeholder="step_type"
              id="step_type"
              value={step_type}
              onChange={(e) => setStepType(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Information
            <input
              type="text"
              placeholder="contact information"
              id="contact_name"
              value={contact_name}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Role
            <input
              type="text"
              placeholder="contact role"
              id="contact_role"
              value={contact_role}
              onChange={(e) => setContractRole(e.target.value)}
              required
            />
          </label>
          <label>
            Contact
            <input
              type="text"
              placeholder="contact"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </label>
          <label>
            Notes
            <input
              type="text"
              placeholder="notes"
              id="notes"
              value={notes}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </label>
          <div className="modalButtonWrapper">
            <button
              className="modalButton"
              onClick={() => setShowModalStep({ action: null, id: null })}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modalButton"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalStep;
