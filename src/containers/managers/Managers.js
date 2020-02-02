import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadManagers } from "../../actions/managers.action";
import { selectFlattenedManagersItems } from "../../selectors/managers.selector";
import { Autocomplete } from "../../components/autocomplete/Autocomplete";
import './Managers.scss';

export const Managers = () => {
  const dispatch = useDispatch();
  const managers = useSelector(selectFlattenedManagersItems);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    dispatch(loadManagers());
  }, [dispatch]);

  return (
    <div className="managers-component">
      <div className="managers-content">
        <label>Manager</label>
        <Autocomplete items={managers} onSelect={(manager) => setManager(manager)} />
        <h5>Selected manager in parent component: {manager ? manager.name : 'Not selected'}</h5>
      </div>
    </div>
  );
};
